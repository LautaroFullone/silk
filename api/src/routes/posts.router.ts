import { postCreateSchema, postUpdateSchema } from '../models/Post.model'
import { BadRequestError, ConflictError } from '../errors/ApiError'
import { supabaseBucket, supabaseClient } from '../lib/supabase'
import { handleRouteError } from '../errors/handleRouteError'
import { Router, type Request, type Response } from 'express'
import { hasRealChanges } from '../utils/hasRealChanges'
import { uploadImage } from '../middlewares/uploadImage'
import { optimizeImage } from '../utils/optimizeImage'
import prismaClient from '../prisma/prismaClient'
import { sleep } from '../utils/sleep'

const postsRouter = Router()

// GET -> listar posts
postsRouter.get('/', async (req: Request, res: Response) => {
   await sleep(3000)
   try {
      const posts = await prismaClient.post.findMany({
         orderBy: { createdAt: 'desc' },
         omit: { createdAt: true },
      })

      return res.status(200).send({
         posts,
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
      await sleep(3000)
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
               category: body.category,
               isActive: body.isActive,
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

            const path = `posts/${createdPost.title}/banner-image/${timestamp}.${extension}`

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
            message: 'Post creado exitosamente',
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

// GET -> obtener post por id
postsRouter.get('/:postId', async (req: Request, res: Response) => {
   await sleep(3000)
   const { postId } = req.params

   try {
      const post = await prismaClient.post.findFirstOrThrow({
         where: { id: postId },
         omit: { createdAt: true },
      })

      return res.status(200).send({
         message: 'Post obtenido',
         post,
      })
   } catch (error) {
      return handleRouteError(res, error)
   }
})

// PATCH -> actualizar post
postsRouter.patch(
   '/:postId',
   uploadImage.single('imageFile'),
   async (req: Request, res: Response) => {
      await sleep(3000)
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

         let newImageFilePath = currentPost.imageFilePath

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

            const path = `posts/${currentPost.title}/banner-image/${timestamp}.${extension}`

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

         // actualizar post
         const updatedPost = await prismaClient.post.update({
            where: { id: postId },
            data: {
               ...body,
               imageFilePath: newImageFilePath,
            },
         })

         return res.status(200).send({
            message: 'Post actualizado exitosamente',
            post: updatedPost,
         })
      } catch (error) {
         return handleRouteError(res, error)
      }
   }
)

// DELETE -> eliminar post
postsRouter.delete('/:postId', async (req: Request, res: Response) => {
   await sleep(3000)
   const { postId } = req.params

   try {
      // Buscar el post para obtener la ruta de la imagen
      const postToDelete = await prismaClient.post.findUniqueOrThrow({
         where: { id: postId },
      })

      // Eliminar la imagen de Supabase Storage si existe
      if (postToDelete.imageFilePath) {
         const { error: deleteImageError } = await supabaseClient.storage
            .from(supabaseBucket)
            .remove([postToDelete.imageFilePath])

         if (deleteImageError) {
            console.warn('Error al eliminar imagen de Storage:', deleteImageError)
         }
      }

      // Eliminar el post de la base de datos
      const postDeleted = await prismaClient.post.delete({
         where: { id: postId },
      })

      return res.status(200).send({
         message: 'Post eliminado exitosamente',
         post: postDeleted,
      })
   } catch (error) {
      return handleRouteError(res, error)
   }
})

export default postsRouter
