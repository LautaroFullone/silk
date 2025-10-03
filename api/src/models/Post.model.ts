import { z } from 'zod'

// Schema para crear un post
export const postCreateSchema = z.object({
   title: z
      .string()
      .trim()
      .min(1, 'El título es obligatorio')
      .max(100, 'El título no puede superar los 100 caracteres'),

   author: z
      .string()
      .trim()
      .min(1, 'El autor es obligatorio')
      .max(50, 'El autor no puede superar los 50 caracteres')
      .regex(
         /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/,
         'El autor solo puede contener letras y espacios'
      ),

   date: z.string().trim().min(1, 'La fecha es obligatoria'),

   description: z
      .string()
      .trim()
      .min(1, 'La descripción es obligatoria')
      .max(300, 'La descripción no puede superar los 300 caracteres'),

   category: z
      .string()
      .trim()
      .min(1, 'La categoría es obligatoria')
      .max(50, 'La categoría no puede superar los 50 caracteres'),

   content: z.array(z.any()).min(1, 'El contenido es obligatorio'),

   isActive: z
      .union([z.boolean(), z.string()])
      .transform((val) => {
         if (typeof val === 'boolean') return val
         return val === 'true'
      })
      .default(false),
})

// Schema para actualizar un post (todos los campos opcionales excepto validaciones)
export const postUpdateSchema = z.object({
   title: z
      .string()
      .trim()
      .min(1, 'El título es obligatorio')
      .max(100, 'El título no puede superar los 100 caracteres')
      .optional(),

   author: z
      .string()
      .trim()
      .min(1, 'El autor es obligatorio')
      .max(50, 'El autor no puede superar los 50 caracteres')
      .regex(
         /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/,
         'El autor solo puede contener letras y espacios'
      )
      .optional(),

   date: z.string().trim().min(1, 'La fecha es obligatoria').optional(),

   description: z
      .string()
      .trim()
      .min(1, 'La descripción es obligatoria')
      .max(300, 'La descripción no puede superar los 300 caracteres')
      .optional(),

   category: z
      .string()
      .trim()
      .min(1, 'La categoría es obligatoria')
      .max(50, 'La categoría no puede superar los 50 caracteres')
      .optional(),

   content: z.array(z.any()).optional(),

   isActive: z
      .union([z.boolean(), z.string()])
      .transform((val) => {
         if (typeof val === 'boolean') return val
         return val === 'true'
      })
      .optional(),
})

export type PostCreateData = z.infer<typeof postCreateSchema>
export type PostUpdateData = z.infer<typeof postUpdateSchema>
