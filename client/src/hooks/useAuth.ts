import { AuthError } from '@supabase/supabase-js'
import useAuthStore from '@stores/useAuth.store'
import { supabase } from '@lib/supabase'
import { useState } from 'react'
import { toast } from 'sonner'

interface LoginCredentials {
   email: string
   password: string
}

export const useAuth = () => {
   const [isLoading, setIsLoading] = useState(false)

   const isInitialized = useAuthStore((state) => state.isInitialized)
   const authActions = useAuthStore((state) => state.actions)

   const initializeAuth = async () => {
      if (isInitialized) return // Solo inicializar UNA vez

      try {
         const {
            data: { session },
         } = await supabase.auth.getSession()

         if (session?.user) {
            authActions.setUser(session.user)
         } else {
            authActions.setUser(null)
         }
      } catch {
         authActions.setUser(null)
      } finally {
         authActions.setInitialized(true)
      }
   }

   const login = async ({ email, password }: LoginCredentials) => {
      setIsLoading(true)

      try {
         const { data, error } = await supabase.auth.signInWithPassword({
            email,
            password,
         })

         if (error) {
            throw error
         }

         // Actualizar el store directamente
         authActions.setUser(data.user)

         toast.success(
            `Bienvenidx de nuevo ${data.user?.user_metadata?.display_name || ''}!`
         )

         return { success: true, user: data.user }
      } catch (error) {
         const authError = error as AuthError
         let errorMessage = 'Error al iniciar sesión'

         // Personalizar mensajes de error
         switch (authError.message) {
            case 'Invalid login credentials':
               errorMessage = 'Credenciales incorrectas. Verificá tu email y contraseña.'
               break
            case 'Email not confirmed':
               errorMessage =
                  'Tu email no ha sido confirmado. Revisá tu bandeja de entrada.'
               break
            case 'Too many requests':
               errorMessage = 'Demasiados intentos. Intentá nuevamente en unos minutos.'
               break
            default:
               errorMessage = authError.message || 'Error desconocido al iniciar sesión'
         }

         toast.error('Error de autenticación', {
            description: errorMessage,
            duration: 5000,
         })

         return { success: false, error: errorMessage }
      } finally {
         setIsLoading(false)
      }
   }

   const logout = async () => {
      setIsLoading(true)

      try {
         await supabase.auth.signOut()

         // Limpiar el store directamente
         authActions.setUser(null)

         toast('Hasta la próxima, nos vemos!', { icon: '👋' })
         return { success: true }
      } catch (error) {
         console.error('Error during logout:', error)

         // En caso de error, limpiar de todos modos
         authActions.setUser(null)
         toast.error('Error al cerrar sesión, pero se limpió localmente')
         return { success: false }
      } finally {
         setIsLoading(false)
      }
   }

   return {
      login,
      logout,
      isLoading,
      initializeAuth,
   }
}
