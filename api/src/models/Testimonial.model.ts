import { z } from 'zod'

export const testimonialCreateSchema = z.object({
   personName: z.string().trim().min(1, 'El nombre es requerido'),
   personRole: z.string().trim().min(1, 'El rol es requerido'),
   description: z.string().trim().min(1, 'El contenido es requerido'),
   image: z.string().trim().min(1, 'La imagen es requerida'),
   isHighlight: z.boolean().optional(),
   isActive: z.boolean().optional(),
})
