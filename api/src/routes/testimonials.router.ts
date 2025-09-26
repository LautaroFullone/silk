import { Router, type Request, type Response } from 'express'
import { handleRouteError } from '../errors/handleRouteError'
import { hasRealChanges } from '../utils/hasRealChanges'
import { ConflictError } from '../errors/ApiError'
import prismaClient from '../prisma/prismaClient'
import { sleep } from '../utils/sleep'
import {
   testimonialCreateSchema,
   testimonialUpdateSchema,
} from '../models/Testimonial.model'
import { uploadImage } from '../middlewares/uploadImage'
import { supabaseBucket, supabaseClient } from '../lib/supabase'
import getImageExt from '../utils/getImageExtension'

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
   uploadImage.single('avatar'),
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
            const ext = getImageExt(file.mimetype)
            const path = `testimonials/${createdTestimonial.id}/avatar.${ext}`

            const { error: uploadError } = await supabaseClient.storage
               .from(supabaseBucket)
               .upload(path, file.buffer, {
                  upsert: true,
                  contentType: file.mimetype,
                  cacheControl: '3600',
               })

            if (uploadError) {
               console.error('Error al subir imagen a Supabase:', uploadError)
               // rollback del registro si querés mantener consistencia estricta
               await prismaClient.testimonial.delete({
                  where: { id: createdTestimonial.id },
               })

               return res.status(500).send({ error: 'No se pudo subir la imagen' })
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
testimonialsRouter.patch('/:testimonialId', async (req: Request, res: Response) => {
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
      if (!hasRealChanges(currentTestimonial, body)) {
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
               id: { not: testimonialId }, // excluir el testimonio actual
            },
         })

         if (existingTestimonial) {
            throw new ConflictError('Ya existe un testimonio de esta persona', {
               testimonialId: existingTestimonial.id,
            })
         }
      }

      // 5) actualizar testimonio
      const updatedTestimonial = await prismaClient.testimonial.update({
         where: { id: testimonialId },
         data: body,
      })

      return res.status(200).send({
         message: 'Testimonio actualizado',
         testimonial: updatedTestimonial,
      })
   } catch (error) {
      return handleRouteError(res, error)
   }
})

// DELETE -> eliminar testimonio
testimonialsRouter.delete('/:testimonialId', async (req: Request, res: Response) => {
   await sleep(3000)
   const { testimonialId } = req.params

   try {
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
