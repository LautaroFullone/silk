import { z } from 'zod'

export const testimonialCreateSchema = z.object({
   personName: z
      .string()
      .trim()
      .min(1, 'El nombre es requerido')
      .max(50, 'El nombre no puede superar los 50 caracteres'),
   personRole: z
      .string()
      .trim()
      .min(1, 'El rol es requerido')
      .max(50, 'El rol no puede superar los 50 caracteres'),
   description: z
      .string()
      .trim()
      .min(1, 'El testimonio es requerido')
      .max(500, 'El testimonio no puede superar los 500 caracteres'),
   isHighlight: z.coerce.boolean().default(false),
   isActive: z.coerce.boolean().default(true),
   // image: z
   //    .string()
   //    .url('Debe ser una URL válida')
   //    .regex(/\.(jpg|jpeg|png|webp|gif)(\?.*)?$/i, 'La imagen debe ser JPG, PNG, WebP o GIF')
   //    .optional(),
})

export const testimonialUpdateSchema = testimonialCreateSchema.partial()
