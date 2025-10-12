import { ServiceRequestFormData } from '@models/Request.model'
import { ResponseApi } from './ResponseApi'
import { api } from '@lib/axios'

/**
 * Obtener todas las solicitudes del sistema
 * @returns Datos de las solicitudes
 */
export async function getRequests() {
   type Response = Pick<ResponseApi, 'requests'>
   const { data } = await api.get<Response>(`/service-requests`)
   return data
}

/**
 * Obtener los detalles de una solicitud por su ID
 * @param requestId ID de la solicitud a obtener
 * @returns Datos de la solicitud
 */
export async function getRequestDetails(requestId: string) {
   type Response = Pick<ResponseApi, 'request'>
   const { data } = await api.get<Response>(`/service-requests/${requestId}`)
   return data
}

/**
 * Crear una nueva solicitud de servicio
 * @param createRequestData Datos de la solicitud a crear
 * @returns Mensaje de éxito y datos de la solicitud creada
 */
export async function createServiceRequest(createRequestData: ServiceRequestFormData) {
   type Response = Pick<ResponseApi, 'message' | 'request'>
   const { data } = await api.post<Response>(`/service-requests`, createRequestData)
   return data
}

/**
 * Actualizar el estado de una solicitud de servicio
 * @param requestId ID de la solicitud a actualizar
 * @param status Nuevo estado de la solicitud
 * @returns Mensaje de éxito y datos de la solicitud actualizada
 */
export async function updateServiceRequestStatus({
   requestId,
   status,
}: {
   requestId: string
   status: string
}) {
   console.log('Updating request status:', requestId, status)
   type Response = Pick<ResponseApi, 'message' | 'request'>
   const { data } = await api.patch<Response>(`/service-requests/${requestId}/status`, {
      status,
   })
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
