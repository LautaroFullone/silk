import { Request } from 'express'

/**
 * Interfaz extendida de Request que incluye la información del usuario autenticado
 */
export interface AuthenticatedRequest extends Request {
   user: {
      id: string
      email?: string
      role?: string
   }
}

/**
 * Helper para verificar si un request tiene usuario autenticado
 */
export const isAuthenticated = (req: Request): req is AuthenticatedRequest => {
   return req.user !== undefined
}

/**
 * Helper para obtener el ID del usuario autenticado de forma segura
 */
export const getUserId = (req: Request): string | null => {
   return isAuthenticated(req) ? req.user.id : null
}

/**
 * Helper para obtener el email del usuario autenticado de forma segura
 */
export const getUserEmail = (req: Request): string | null => {
   return isAuthenticated(req) ? req.user.email || null : null
}

export default AuthenticatedRequest
