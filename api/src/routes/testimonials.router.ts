import { BadRequestError, ConflictError } from '../errors/ApiError'
import { supabaseBucket, supabaseClient } from '../lib/supabase'
import { handleRouteError } from '../errors/handleRouteError'
import { Router, type Request, type Response } from 'express'
import { hasRealChanges } from '../utils/hasRealChanges'
import { uploadImage } from '../middlewares/uploadImage'
import getImageExt from '../utils/getImageExtension'
import prismaClient from '../prisma/prismaClient'
import { sleep } from '../utils/sleep'
import {
   testimonialCreateSchema,
   testimonialUpdateSchema,
} from '../models/Testimonial.model'

const testimonialsRouter = Router()

// GET -> listar testimonios
testimonialsRouter.get('/', async (req: Request, res: Response) => {
   await sleep(3000)
   try {
      const testimonials = await prismaClient.testimonial.findMany({
         orderBy: { createdAt: 'desc' },
         omit: { createdAt: true },
      })

      return res.status(200).send({
         testimonials,
      })
   } catch (error) {
      return handleRouteError(res, error)
   }
})

// POST -> crear testimonio
testimonialsRouter.post(
   '/',
   uploadImage.single('avatarFile'),
   async (req: Request, res: Response) => {
      await sleep(3000)
      try {
         const body = testimonialCreateSchema.parse(req.body)

         const existingTestimonial = await prismaClient.testimonial.findFirst({
            where: { personName: body.personName },
         })

         if (existingTestimonial) {
            throw new ConflictError('Ya existe un testimonio de esta persona', {
               testimonialId: existingTestimonial.id,
            })
         }

         const createdTestimonial = await prismaClient.testimonial.create({
            data: body,
         })

         let avatarImagePath = null

         // 4) Si vino archivo, subir a Supabase Storage
         const file = req.file
         if (file) {
            const timestamp = Date.now()
            const ext = getImageExt(file.mimetype)
            const path = `testimonials/${createdTestimonial.id}-avatar-${timestamp}.${ext}`

            const { error: uploadError } = await supabaseClient.storage
               .from(supabaseBucket)
               .upload(path, file.buffer, {
                  upsert: true,
                  contentType: file.mimetype,
                  cacheControl: '3600',
               })

            if (uploadError) {
               // rollback del registro para mantener la consistencia
               await prismaClient.testimonial.delete({
                  where: { id: createdTestimonial.id },
               })

               throw new BadRequestError('Hubo un error al subir la imagen')
            }

            avatarImagePath = path

            await prismaClient.testimonial.update({
               where: { id: createdTestimonial.id },
               data: { avatarImagePath },
            })
         }

         return res.status(201).send({
            message: 'Testimonio creado',
            testimonial: {
               ...createdTestimonial,
               avatarImagePath,
            },
         })
      } catch (error) {
         return handleRouteError(res, error)
      }
   }
)

// GET -> obtener testimonio por id
testimonialsRouter.get('/:testimonialId', async (req: Request, res: Response) => {
   await sleep(3000)
   const { testimonialId } = req.params

   try {
      const testimonial = await prismaClient.testimonial.findFirstOrThrow({
         where: { id: testimonialId },
         omit: { createdAt: true },
      })

      return res.status(200).send({
         message: 'Testimonio obtenido',
         testimonial,
      })
   } catch (error) {
      return handleRouteError(res, error)
   }
})

// PATCH -> actualizar testimonio
testimonialsRouter.patch(
   '/:testimonialId',
   uploadImage.single('avatarFile'),
   async (req: Request, res: Response) => {
      await sleep(3000)
      const { testimonialId } = req.params

      try {
         // 1) validar payload
         const body = testimonialUpdateSchema.parse(req.body)

         // 2) buscar testimonio actual, sino tira excepcion
         const currentTestimonial = await prismaClient.testimonial.findUniqueOrThrow({
            where: { id: testimonialId },
         })

         // 3) preparar update solo con cambios reales
         const file = req.file
         let hasImageChange = Boolean(file)

         if (!hasRealChanges(currentTestimonial, body) && !hasImageChange) {
            return res.send({
               message: 'No hay cambios para aplicar',
               testimonial: currentTestimonial,
            })
         }

         // 4) si el nombre de la persona cambia, verificar que no exista otro testimonio con ese nombre
         if (body.personName && body.personName !== currentTestimonial.personName) {
            const existingTestimonial = await prismaClient.testimonial.findFirst({
               where: {
                  personName: body.personName,
                  id: { not: testimonialId },
               },
            })

            if (existingTestimonial) {
               throw new ConflictError('Ya existe un testimonio de esta persona', {
                  testimonialId: existingTestimonial.id,
               })
            }
         }

         let newAvatarImagePath = currentTestimonial.avatarImagePath

         // 5) Si hay nueva imagen, procesarla
         if (file) {
            const ext = getImageExt(file.mimetype)
            const timestamp = Date.now()
            const path = `testimonials/${testimonialId}-avatar-${timestamp}.${ext}`

            console.warn('# Intentando actualizar archivo:', {
               path,
               mimetype: file.mimetype,
               size: file.size,
            })

            console.log('# Current avatarImagePath:', currentTestimonial.avatarImagePath)
            // Eliminar imagen anterior si existe
            if (currentTestimonial.avatarImagePath) {
               const { error: deleteError } = await supabaseClient.storage
                  .from(supabaseBucket)
                  .remove([currentTestimonial.avatarImagePath])

               if (deleteError) {
                  console.error('# Error al eliminar imagen anterior:', deleteError)
                  // No tiramos error, solo advertencia
               }
            }

            // Subir nueva imagen
            const { error: uploadError } = await supabaseClient.storage
               .from(supabaseBucket)
               .upload(path, file.buffer, {
                  upsert: true,
                  contentType: file.mimetype,
                  cacheControl: '3600',
               })

            if (uploadError) {
               console.error('# Error al subir nueva imagen:', uploadError)
               throw new BadRequestError('Hubo un error al actualizar la imagen')
            }

            newAvatarImagePath = path
         }

         // 6) actualizar testimonio
         const updatedTestimonial = await prismaClient.testimonial.update({
            where: { id: testimonialId },
            data: {
               ...body,
               avatarImagePath: newAvatarImagePath,
            },
         })

         return res.status(200).send({
            message: 'Testimonio actualizado',
            testimonial: updatedTestimonial,
         })
      } catch (error) {
         return handleRouteError(res, error)
      }
   }
)

// DELETE -> eliminar testimonio
testimonialsRouter.delete('/:testimonialId', async (req: Request, res: Response) => {
   await sleep(3000)
   const { testimonialId } = req.params

   try {
      // 1) Buscar el testimonio para obtener la ruta de la imagen
      const testimonialToDelete = await prismaClient.testimonial.findUniqueOrThrow({
         where: { id: testimonialId },
      })

      // 2) Eliminar la imagen de Supabase Storage si existe
      if (testimonialToDelete.avatarImagePath) {
         console.log('Intentando eliminar imagen:', testimonialToDelete.avatarImagePath)

         const { error: deleteImageError } = await supabaseClient.storage
            .from(supabaseBucket)
            .remove([testimonialToDelete.avatarImagePath])

         if (deleteImageError) {
            console.warn('Error al eliminar imagen de Storage:', deleteImageError)
            // No detenemos la eliminación del testimonio si falla la imagen
         }
      }

      // 3) Eliminar el testimonio de la base de datos
      const testimonialDeleted = await prismaClient.testimonial.delete({
         where: { id: testimonialId },
      })

      return res.status(200).send({
         message: 'Testimonio eliminado',
         testimonial: testimonialDeleted,
      })
   } catch (error) {
      return handleRouteError(res, error)
   }
})

export default testimonialsRouter
