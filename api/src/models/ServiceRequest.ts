import { z } from 'zod'

export const serviceRequestCreateSchema = z.object({
   name: z
      .string()
      .trim()
      .min(1, 'El nombre es obligatorio')
      .max(50, 'El nombre no puede superar los 50 caracteres'),
   email: z
      .email('El email no es válido')
      .trim()
      .min(1, 'El email es obligatorio')
      .max(100, 'El email no puede superar los 100 caracteres'),
   age: z
      .number()
      .min(0, 'La edad debe ser un número positivo')
      .max(120, 'La edad no puede superar los 120 años'),
   ubication: z
      .string()
      .trim()
      .min(1, 'La ubicación es obligatoria')
      .max(100, 'La ubicación no puede superar los 100 caracteres'),
   phone: z
      .string()
      .trim()
      .min(1, 'El teléfono es obligatorio')
      .max(20, 'El teléfono no puede superar los 20 caracteres'),
   services: z
      .array(z.string().min(1, 'El servicio no puede estar vacío'))
      .min(1, 'Debe seleccionar al menos un servicio'),
   budget: z
      .string()
      .trim()
      .min(1, 'El presupuesto es obligatorio')
      .max(100, 'El presupuesto no puede superar los 100 caracteres'),
   startMoment: z.string().trim().min(1, 'El momento de inicio es obligatorio'),
})

export const serviceRequestUpdateSchema = z.object({
   status: z.enum(
      ['PENDING', 'CONTACTED', 'CONTRACTED', 'CANCELLED'],
      'El nuevo estado es inválido'
   ),
})
