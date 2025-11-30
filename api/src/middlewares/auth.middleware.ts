import { Request, Response, NextFunction } from 'express'
import { supabaseClient } from '../lib/supabase'
import { de } from 'zod/v4/locales/index.cjs'

// Extender la interfaz Request para incluir el usuario
declare global {
   namespace Express {
      interface Request {
         user?: {
            id: string
            email?: string
            role?: string
         }
      }
   }
}

/**
 * Middleware de autenticación con Supabase
 * @param options Configuraciones del middleware
 */
const requireAuth = () => {
   return async (req: Request, res: Response, next: NextFunction) => {
      try {
         // Obtener el token del header Authorization
         const authHeader = req.headers.authorization

         if (!authHeader || !authHeader.startsWith('Bearer ')) {
            return res.status(401).json({
               success: false,
               message: 'Token de autorización requerido',
               code: 'MISSING_TOKEN',
            })
         }

         const token = authHeader.split(' ')[1]

         // Verificar el token con Supabase
         const {
            data: { user },
            error,
         } = await supabaseClient.auth.getUser(token)

         if (error || !user) {
            console.error('❌ Error verificando token:', error?.message)
            return res.status(401).json({
               success: false,
               message: 'Token inválido o expirado',
               code: 'INVALID_TOKEN',
            })
         }

         // Agregar usuario al request para uso posterior
         req.user = {
            id: user.id,
            email: user.email,
            role: user.role || 'authenticated',
         }

         console.log(`✅ Usuario autenticado: ${user.email} - ${req.method} ${req.path}`)
         next()
      } catch (error) {
         console.error('❌ Error en middleware de autenticación:', error)
         return res.status(500).json({
            success: false,
            message: 'Error interno del servidor',
            code: 'AUTH_ERROR',
         })
      }
   }
}

export default requireAuth
