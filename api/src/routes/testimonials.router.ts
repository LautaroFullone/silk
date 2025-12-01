import { BadRequestError, ConflictError } from '../errors/ApiError'
import { supabaseBucket, supabaseClient } from '../lib/supabase'
import { handleRouteError } from '../errors/handleRouteError'
import { Router, type Request, type Response } from 'express'
import { hasRealChanges } from '../utils/hasRealChanges'
import { uploadImage } from '../middlewares/uploadImage'
import requireAuth from '../middlewares/auth.middleware'
import { optimizeImage } from '../utils/optimizeImage'
import prismaClient from '../prisma/prismaClient'
import {
   testimonialCreateSchema,
   testimonialUpdateSchema,
} from '../models/Testimonial.model'

const testimonialsRouter = Router()

// GET -> listar testimonios
testimonialsRouter.get('/', async (req: Request, res: Response) => {
   try {
      const { onlyActive, count } = req.query

      const testimonials = await prismaClient.testimonial.findMany({
         where: onlyActive === 'true' ? { isActive: true } : {},
         orderBy: { createdAt: 'desc' },
         take: count ? Number(count) : undefined,
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
   requireAuth(),
   uploadImage.single('avatarFile'),
   async (req: Request, res: Response) => {
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

         // Validar límite de testimonios activos (máximo 6)
         if (body.isActive) {
            const activeTestimonialsCount = await prismaClient.testimonial.count({
               where: { isActive: true },
            })

            if (activeTestimonialsCount >= 6) {
               throw new ConflictError(
                  'Solo se pueden mostrar máximo 6 testimonios activos en el sitio web. Desactivá algún testimonio existente antes de activar este.',
                  {
                     maxActiveTestimonials: 6,
                     currentActiveCount: activeTestimonialsCount,
                  }
               )
            }
         }

         const createdTestimonial = await prismaClient.testimonial.create({
            data: body,
         })

         let avatarImagePath = null

         // 4) Si vino archivo, optimizar y subir a Supabase Storage
         const file = req.file
         if (file) {
            const timestamp = Date.now()

            // Optimizar imagen antes de subir
            const { buffer: optimizedBuffer, extension } = await optimizeImage(
               file.buffer,
               {
                  maxWidth: 400,
                  maxHeight: 400,
               }
            )

            const path = `testimonials/${createdTestimonial.id}-avatar-${timestamp}.${extension}`

            const { error: uploadError } = await supabaseClient.storage
               .from(supabaseBucket)
               .upload(path, optimizedBuffer, {
                  upsert: true,
                  contentType: `image/${extension}`,
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
testimonialsRouter.get(
   '/:testimonialId',
   requireAuth(),
   async (req: Request, res: Response) => {
      const { testimonialId } = req.params

      try {
         const testimonial = await prismaClient.testimonial.findFirstOrThrow({
            where: { id: testimonialId },
            omit: { createdAt: true },
         })

         return res.status(200).send({
            testimonial,
         })
      } catch (error) {
         return handleRouteError(res, error)
      }
   }
)

// PATCH -> actualizar testimonio
testimonialsRouter.patch(
   '/:testimonialId',
   requireAuth(),
   uploadImage.single('avatarFile'),
   async (req: Request, res: Response) => {
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

         // 5) Validar límite de testimonios activos si se está activando
         if (body.isActive && !currentTestimonial.isActive) {
            const activeTestimonialsCount = await prismaClient.testimonial.count({
               where: { isActive: true },
            })

            if (activeTestimonialsCount >= 6) {
               throw new ConflictError(
                  'Solo se pueden mostrar máximo 6 testimonios activos en el sitio web. Desactivá algún testimonio existente antes de activar este.',
                  {
                     maxActiveTestimonials: 6,
                     currentActiveCount: activeTestimonialsCount,
                  }
               )
            }
         }

         let newAvatarImagePath = currentTestimonial.avatarImagePath

         // 5) Si hay nueva imagen, procesarla
         if (file) {
            const timestamp = Date.now()

            // Optimizar imagen antes de subir
            const { buffer: optimizedBuffer, extension } = await optimizeImage(
               file.buffer,
               {
                  maxWidth: 400,
                  maxHeight: 400,
               }
            )

            const path = `testimonials/${testimonialId}-avatar-${timestamp}.${extension}`

            console.warn('# Intentando actualizar archivo:', {
               path,
               originalSize: file.size,
               optimizedSize: optimizedBuffer.length,
               format: extension,
            })

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
testimonialsRouter.delete(
   '/:testimonialId',
   requireAuth(),
   async (req: Request, res: Response) => {
      const { testimonialId } = req.params

      try {
         const testimonialDeleted = await prismaClient.testimonial.delete({
            where: { id: testimonialId },
         })

         if (testimonialDeleted.avatarImagePath) {
            const { error: deleteImageError } = await supabaseClient.storage
               .from(supabaseBucket)
               .remove([testimonialDeleted.avatarImagePath])

            if (deleteImageError) {
               console.warn('Error al eliminar imagen de Storage:', deleteImageError)
            }
         }

         return res.status(200).send({
            message: 'Testimonio eliminado',
            testimonial: testimonialDeleted,
         })
      } catch (error) {
         return handleRouteError(res, error)
      }
   }
)

export default testimonialsRouter
