import { AuthError } from '@supabase/supabase-js'
import { supabase } from '@lib/supabase'
import useAppStore from '@stores/app.store'
import { useState } from 'react'
import { toast } from 'sonner'

interface LoginCredentials {
   email: string
   password: string
}

export const useAuth = () => {
   const [isLoading, setIsLoading] = useState(false)
   const { dispatchUser } = useAppStore((state) => state.actions)

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

         // Guardar usuario en el store global
         dispatchUser(data.user)
         //console.log('Logged in user:', data.user)

         // Toast de éxito
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

         // Toast de error
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

         // Limpiar usuario del store
         dispatchUser(null)

         return { success: true }
      } catch (error) {
         console.error('Error during logout:', error)

         // Limpiar el estado de todos modos
         dispatchUser(null)

         return { success: false }
      } finally {
         setIsLoading(false)
      }
   }

   return {
      login,
      logout,
      isLoading,
   }
}
