import { TestimonialFormData } from '@models/Testimonial.model'
import { ResponseApi } from './ResponseApi'
import { api } from '@lib/axios'

/**
 * Obtener todos los testimonios del sistema
 * @returns Mensaje de éxito y datos de los testimonios
 */
export async function getTestimonials() {
   type Response = Pick<ResponseApi, 'testimonials'>
   const { data } = await api.get<Response>(`/testimonials`)
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
   const { data } = await api.post<Response>(`/testimonials`, testimonialData)
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
   testimonialData: TestimonialFormData
}) {
   type Response = Pick<ResponseApi, 'message' | 'testimonial'>
   const { data } = await api.patch<Response>(
      `/testimonials/${testimonialId}`,
      testimonialData
   )
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
