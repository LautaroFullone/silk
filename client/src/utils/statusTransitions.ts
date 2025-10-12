import { RequestStatus } from '@models/Request.model'
import { toast } from 'sonner'

/**
 * Define las transiciones válidas entre estados de solicitud
 * Cada estado puede transicionar solo a ciertos estados específicos
 */
export const statusTransitions: Record<RequestStatus, RequestStatus[]> = {
   // PENDING: Estado inicial - puede ir a contactado o cancelado
   PENDING: ['CONTACTED', 'CANCELLED'],

   // CONTACTED: Ya contactado - puede ser contratado o cancelado
   CONTACTED: ['CONTRACTED', 'CANCELLED'],

   // CONTRACTED: Servicio contratado - solo puede ser cancelado (por incumplimiento, etc.)
   CONTRACTED: ['CANCELLED'],

   // CANCELLED: Estado final - no puede cambiar a ningún otro
   CANCELLED: [],
} as const

/**
 * Verifica si una transición de estado es válida
 * @param currentStatus - Estado actual de la solicitud
 * @param newStatus - Estado al que se quiere cambiar
 * @returns boolean - true si la transición es válida
 */
export function isValidStatusTransition(
   currentStatus: RequestStatus,
   newStatus: RequestStatus
): boolean {
   return statusTransitions[currentStatus].includes(newStatus)
}

/**
 * Obtiene los estados válidos a los que se puede transicionar desde el estado actual
 * @param currentStatus - Estado actual de la solicitud
 * @returns RequestStatus[] - Array de estados válidos
 */
export function getValidTransitions(currentStatus: RequestStatus): RequestStatus[] {
   return statusTransitions[currentStatus]
}

/**
 * Valida una transición de estado y muestra toast de error si es inválida
 * @param currentStatus - Estado actual de la solicitud
 * @param newStatus - Estado al que se quiere cambiar
 * @returns boolean - true si la transición es válida, false si no
 */
export function checkStatusTransition(
   currentStatus: RequestStatus,
   newStatus: RequestStatus
): boolean {
   if (!isValidStatusTransition(currentStatus, newStatus)) {
      toast.error('Cambio de estado no permitido')
      return false
   }
   return true
}
