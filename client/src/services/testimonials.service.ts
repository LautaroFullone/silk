import { TestimonialFormData } from '@models/Testimonial.model'
import { ResponseApi } from './ResponseApi'
import { api } from '@lib/axios'

/**
 * Obtener todos los testimonios del sistema
 * @returns Mensaje de éxito y datos de los testimonios
 */
export async function getTestimonials(onlyActive: boolean) {
   type Response = Pick<ResponseApi, 'testimonials'>
   const { data } = await api.get<Response>(`/testimonials`, {
      params: {
         onlyActive,
      },
   })
   return data
}

/**
 * Obtener un testimonio por ID
 * @param testimonialId ID del testimonio a obtener
 * @returns Datos del testimonio
 */
export async function getTestimonialById(testimonialId: string) {
   type Response = Pick<ResponseApi, 'message' | 'testimonial'>
   const { data } = await api.get<Response>(`/testimonials/${testimonialId}`)
   return data
}

/**
 * Crear un nuevo testimonio
 * @param testimonialData Datos del testimonio a crear
 * @returns Mensaje de éxito y datos del testimonio creado
 */
export async function createTestimonial(testimonialData: TestimonialFormData) {
   type Response = Pick<ResponseApi, 'message' | 'testimonial'>
   const form = new FormData()
   form.append('personName', testimonialData.personName)
   form.append('personRole', testimonialData.personRole)
   form.append('description', testimonialData.description)
   form.append('isHighlight', String(testimonialData.isHighlight))
   form.append('isActive', String(testimonialData.isActive))

   if (testimonialData.avatarFile) form.append('avatarFile', testimonialData.avatarFile) // 👈 nombre que espera multer

   const { data } = await api.post<Response>(`/testimonials`, form)
   return data
}

/**
 * Actualizar un testimonio existente
 * @param testimonialId ID del testimonio a actualizar
 * @param testimonialData Datos del testimonio a actualizar
 * @returns Mensaje de éxito y datos del testimonio actualizado
 */
export async function updateTestimonial({
   testimonialId,
   testimonialData,
}: {
   testimonialId: string
   testimonialData: Partial<TestimonialFormData>
}) {
   type Response = Pick<ResponseApi, 'message' | 'testimonial'>

   const form = new FormData()

   // Solo agregar campos que realmente tienen un valor para actualizar
   if (testimonialData.personName !== undefined) {
      form.append('personName', testimonialData.personName)
   }
   if (testimonialData.personRole !== undefined) {
      form.append('personRole', testimonialData.personRole)
   }
   if (testimonialData.description !== undefined) {
      form.append('description', testimonialData.description)
   }
   // Para booleanos, verificar que la propiedad exista en el objeto (no solo que no sea undefined)
   if (testimonialData.isHighlight !== undefined) {
      form.append('isHighlight', String(testimonialData.isHighlight))
   }
   if (testimonialData.isActive !== undefined) {
      form.append('isActive', String(testimonialData.isActive))
   }
   if (testimonialData.avatarFile) {
      form.append('avatarFile', testimonialData.avatarFile)
   }

   const { data } = await api.patch<Response>(`/testimonials/${testimonialId}`, form)
   return data
}

/**
 * Eliminar un testimonio del sistema
 * @param testimonialId ID del testimonio a eliminar
 * @returns Mensaje de éxito y datos del testimonio eliminado
 */
export async function deleteTestimonial(testimonialId: string) {
   type Response = Pick<ResponseApi, 'message' | 'testimonial'>
   const { data } = await api.delete<Response>(`/testimonials/${testimonialId}`)
   return data
}
