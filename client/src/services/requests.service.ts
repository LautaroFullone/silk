import { ServiceRequestFormData } from '@models/Request.model'
import { ResponseApi } from './ResponseApi'
import { api } from '@lib/axios'

/**
 * Obtener todas las solicitudes del sistema
 * @returns Mensaje de éxito y datos de las solicitudes
 */
export async function getRequests() {
   type Response = Pick<ResponseApi, 'requests'>
   const { data } = await api.get<Response>(`/service-requests`)
   return data
}

export async function createServiceRequest(createRequestData: ServiceRequestFormData) {
   type Response = Pick<ResponseApi, 'message' | 'request'>
   const { data } = await api.post<Response>(`/service-requests`, createRequestData)
   return data
}

/**
 * Eliminar una solicitud del sistema
 * @param requestId ID de la solicitud a eliminar
 * @returns Mensaje de éxito y datos de la solicitud eliminada
 */
export async function deleteRequest(requestId: string) {
   type Response = Pick<ResponseApi, 'message' | 'request'>
   const { data } = await api.delete<Response>(`/service-requests/${requestId}`)
   return data
}
