import { postCreateSchema, postUpdateSchema } from '../models/Post.model'
import { generateCategoriesMap } from '../utils/generateCategoriesMap'
import { BadRequestError, ConflictError } from '../errors/ApiError'
import { supabaseBucket, supabaseClient } from '../lib/supabase'
import { generateFolderName } from '../utils/generateFolderName'
import { handleRouteError } from '../errors/handleRouteError'
import { Router, type Request, type Response } from 'express'
import { hasRealChanges } from '../utils/hasRealChanges'
import { uploadImage } from '../middlewares/uploadImage'
import { optimizeImage } from '../utils/optimizeImage'
import prismaClient from '../prisma/prismaClient'


const postsRouter = Router()

// GET -> listar posts
postsRouter.get('/', async (req: Request, res: Response) => {

   try {
      const { onlyActive } = req.query

      const posts = await prismaClient.post.findMany({
         where: onlyActive === 'true' ? { isActive: true } : {},
         orderBy: { createdAt: 'desc' },
         include: { category: true },
         omit: { createdAt: true, categoryId: true },
      })

      const categories = generateCategoriesMap(posts)

      return res.status(200).send({
         posts,
         categories,
      })
   } catch (error) {
      return handleRouteError(res, error)
   }
})

// GET -> obtener post por id
postsRouter.get('/:postId', async (req: Request, res: Response) => {

   const { postId } = req.params

   try {
      const post = await prismaClient.post.findFirstOrThrow({
         where: { id: postId },
         include: { category: true },
         omit: { createdAt: true, categoryId: true },
      })

      return res.status(200).send({
         post,
      })
   } catch (error) {
      return handleRouteError(res, error)
   }
})

// POST -> crear post
postsRouter.post(
   '/',
   uploadImage.single('imageFile'),
   async (req: Request, res: Response) => {

      try {
         // Parsear el contenido JSON si viene como string
         const body = postCreateSchema.parse({
            ...req.body,
            content: req.body.content ? JSON.parse(req.body.content) : [],
         })

         // Validar que no existe un post con el mismo título
         const existingPost = await prismaClient.post.findFirst({
            where: { title: body.title },
         })

         if (existingPost) {
            throw new ConflictError('Ya existe un post con este título', {
               postId: existingPost.id,
            })
         }

         const createdPost = await prismaClient.post.create({
            data: {
               title: body.title,
               author: body.author,
               date: body.date,
               description: body.description,
               content: body.content,
               isActive: body.isActive,
               category: {
                  //si la categoria existe, asigna el ID, sino existe la crea
                  connectOrCreate: {
                     where: { name: body.categoryName }, // requiere @unique en name
                     create: { name: body.categoryName },
                  },
               },
            },
            include: {
               category: true,
            },
         })

         let imageFilePath = null

         // Si vino archivo, optimizar y subir a Supabase Storage
         const file = req.file
         if (file) {
            const timestamp = Date.now()

            // Optimizar imagen antes de subir
            const { buffer: optimizedBuffer, extension } = await optimizeImage(
               file.buffer,
               {
                  maxWidth: 800,
                  maxHeight: 600,
               }
            )

            const safeFolderName = generateFolderName(createdPost.title)
            const path = `posts/${safeFolderName}/banner-image-${timestamp}.${extension}`

            const { error: uploadError } = await supabaseClient.storage
               .from(supabaseBucket)
               .upload(path, optimizedBuffer, {
                  upsert: true,
                  contentType: `image/${extension}`,
                  cacheControl: '3600',
               })

            if (uploadError) {
               // rollback del registro para mantener la consistencia
               await prismaClient.post.delete({
                  where: { id: createdPost.id },
               })

               throw new BadRequestError('Hubo un error al subir la imagen')
            }

            imageFilePath = path

            await prismaClient.post.update({
               where: { id: createdPost.id },
               data: { imageFilePath },
            })
         }

         return res.status(201).send({
            message: 'Post creado',
            post: {
               ...createdPost,
               imageFilePath,
            },
         })
      } catch (error) {
         return handleRouteError(res, error)
      }
   }
)

// PATCH -> actualizar post
postsRouter.patch(
   '/:postId',
   uploadImage.single('imageFile'),
   async (req: Request, res: Response) => {

      const { postId } = req.params

      try {
         // Parsear el contenido JSON si viene como string
         const body = postUpdateSchema.parse({
            ...req.body,
            content: req.body.content ? JSON.parse(req.body.content) : undefined,
         })

         // buscar post actual, sino tira excepcion
         const currentPost = await prismaClient.post.findUniqueOrThrow({
            where: { id: postId },
            include: { category: true },
         })

         // preparar update solo con cambios reales
         const file = req.file
         let hasImageChange = Boolean(file)

         if (!hasRealChanges(currentPost, body) && !hasImageChange) {
            return res.send({
               message: 'No hay cambios para aplicar',
               post: currentPost,
            })
         }

         // si el título cambia, verificar que no exista otro post con ese título
         if (body.title && body.title !== currentPost.title) {
            const existingPost = await prismaClient.post.findFirst({
               where: {
                  title: body.title,
                  id: { not: postId },
               },
            })

            if (existingPost) {
               throw new ConflictError('Ya existe un post con este título', {
                  postId: existingPost.id,
               })
            }
         }

         // Preparar datos de actualización
         let categoryDeleted = null
         const updateData: any = { ...body }
         const oldCategoryId = currentPost.category.id
         let newImageFilePath = currentPost.imageFilePath

         // Si hay cambio de categoría
         if (body?.categoryName && body.categoryName !== currentPost.category.name) {
            // Usar connectOrCreate para la nueva categoría
            updateData.category = {
               connectOrCreate: {
                  where: { name: body.categoryName },
                  create: { name: body.categoryName },
               },
            }
         }
         // Eliminar categoryName del objeto de actualización para evitar errores
         delete updateData.categoryName //categoryName no existe en el modelo Post, existe category: {id,name}

         // Si hay nueva imagen, procesarla
         if (file) {
            const timestamp = Date.now()

            // Optimizar imagen antes de subir
            const { buffer: optimizedBuffer, extension } = await optimizeImage(
               file.buffer,
               {
                  maxWidth: 800,
                  maxHeight: 600,
               }
            )

            const safeFolderName = generateFolderName(currentPost.title)
            const path = `posts/${safeFolderName}/banner-image-${timestamp}.${extension}`

            // Eliminar imagen anterior si existe
            if (currentPost.imageFilePath) {
               const { error: deleteError } = await supabaseClient.storage
                  .from(supabaseBucket)
                  .remove([currentPost.imageFilePath])

               if (deleteError) {
                  console.error('# Error al eliminar imagen anterior:', deleteError)
               }
            }

            // Subir nueva imagen optimizada
            const { error: uploadError } = await supabaseClient.storage
               .from(supabaseBucket)
               .upload(path, optimizedBuffer, {
                  upsert: true,
                  contentType: `image/${extension}`,
                  cacheControl: '3600',
               })

            if (uploadError) {
               console.error('# Error al subir nueva imagen:', uploadError)
               throw new BadRequestError('Hubo un error al actualizar la imagen')
            }

            newImageFilePath = path
         }

         // Agregar imageFilePath a los datos de actualización
         updateData.imageFilePath = newImageFilePath

         // Actualizar post una sola vez con todos los cambios
         const updatedPost = await prismaClient.post.update({
            where: { id: postId },
            data: updateData,
            include: { category: true },
         })

         // Solo verificar la categoría antigua si cambió
         if (body?.categoryName && updatedPost.category.id !== oldCategoryId) {
            // Verificar si la categoría anterior tiene más posts
            const oldCategoryHasMorePosts = await prismaClient.post.findFirst({
               where: {
                  categoryId: oldCategoryId,
               },
            })

            // Eliminar la categoría anterior si no tiene más posts
            if (!oldCategoryHasMorePosts) {
               categoryDeleted = await prismaClient.postCategory.delete({
                  where: { id: oldCategoryId },
               })
            }
         }

         return res.status(200).send({
            message: categoryDeleted
               ? 'Post actualizado y categoría anterior eliminada'
               : 'Post actualizado',
            post: updatedPost,
         })
      } catch (error) {
         return handleRouteError(res, error)
      }
   }
)

// DELETE -> eliminar post
postsRouter.delete('/:postId', async (req: Request, res: Response) => {

   const { postId } = req.params

   try {
      // Eliminar el post de la base de datos
      const postDeleted = await prismaClient.post.delete({
         where: { id: postId },
         include: { category: { select: { id: true } } },
      })

      // Verificar si la categoría tiene más artículos
      const categoryHasMoreArticles = await prismaClient.post.findFirst({
         where: {
            categoryId: postDeleted.category.id,
            id: { not: postDeleted.id }, // Excluir el que acabamos de eliminar
         },
      })

      // Solo eliminar la categoría si no tiene más artículos
      let categoryDeleted = null

      if (!categoryHasMoreArticles) {
         categoryDeleted = await prismaClient.postCategory.delete({
            where: { id: postDeleted.category.id },
         })
      }

      // Eliminar la imagen de Supabase Storage si existe
      if (postDeleted.imageFilePath) {
         const { error: deleteImageError } = await supabaseClient.storage
            .from(supabaseBucket)
            .remove([postDeleted.imageFilePath])

         if (deleteImageError) {
            console.warn('Error al eliminar imagen de Storage:', deleteImageError)
         }
      }

      return res.status(200).send({
         message: categoryDeleted ? 'Post y categoría eliminados' : 'Post eliminado',
         post: postDeleted,
      })
   } catch (error) {
      return handleRouteError(res, error)
   }
})

export default postsRouter
