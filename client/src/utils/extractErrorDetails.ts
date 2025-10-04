import { AxiosError } from 'axios'

export interface ApiErrorResponse {
   message: string
   code: string
   details?: unknown
}

export function extractErrorData(error: unknown): ApiErrorResponse {
   if (error instanceof AxiosError) {
      // Si hay una respuesta del servidor con data estructurada
      if (error.response?.data && typeof error.response.data === 'object') {
         const { message, code, details } = error.response.data as ApiErrorResponse
         if (message && code) {
            return { message, code, details }
         }
      }

      // Fallback para errores HTTP comunes
      if (error.response?.status) {
         const statusMessages: Record<number, string> = {
            400: 'Solicitud incorrecta',
            401: 'No autorizado',
            403: 'Acceso denegado',
            404: 'Recurso no encontrado',
            500: 'Error interno del servidor',
            502: 'Error de puerta de enlace',
            503: 'Servicio no disponible',
         }

         const message =
            statusMessages[error.response.status] || `Error HTTP ${error.response.status}`
         return {
            message,
            code: `HTTP_${error.response.status}`,
         }
      }

      // Error de red o sin respuesta
      if (error.code === 'ERR_NETWORK' || error.message === 'Network Error') {
         return {
            message: 'Error de conexión. Verifica tu conexión a internet.',
            code: 'NETWORK_ERROR',
         }
      }

      // Timeout
      if (error.code === 'ECONNABORTED') {
         return {
            message: 'La solicitud tardó demasiado tiempo. Intenta nuevamente.',
            code: 'TIMEOUT_ERROR',
         }
      }
   }

   return {
      message: error instanceof Error ? error.message : 'Error desconocido',
      code: 'UNKNOWN_ERROR',
   }
}
