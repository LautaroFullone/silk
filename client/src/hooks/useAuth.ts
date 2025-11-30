import { useAuthStore } from '@stores/useAuth.store'
import { AuthError } from '@supabase/supabase-js'
import { useEffect, useState } from 'react'
import { supabase } from '@lib/supabase'
import { toast } from 'sonner'

interface LoginCredentials {
   email: string
   password: string
}

export const useAuth = () => {
   const [isLoading, setIsLoading] = useState(false)

   const isInitialized = useAuthStore((state) => state.isInitialized)
   const authActions = useAuthStore((state) => state.actions)

   // Inicializar la sesión al montar el hook
   useEffect(() => {
      if (isInitialized) return

      const initializeAuth = async () => {
         try {
            // Obtener la sesión actual
            const {
               data: { session },
               error,
            } = await supabase.auth.getSession()

            if (error) {
               console.error('Error obteniendo sesión:', error)
               authActions.setUser(null)
            } else if (session?.user) {
               authActions.setUser(session.user)
               console.log('📱 Sesión restaurada:', session.user.email)
            } else {
               authActions.setUser(null)
               console.log('📱 No hay sesión activa')
            }
         } catch (error) {
            console.error('Error inicializando autenticación:', error)
            authActions.setUser(null)
         } finally {
            authActions.setInitialized(true)
         }
      }

      initializeAuth()

      // Escuchar cambios de estado de autenticación
      const {
         data: { subscription },
      } = supabase.auth.onAuthStateChange(async (event, session) => {
         console.log('🔄 Auth state change:', event, session?.user?.email)

         switch (event) {
            case 'SIGNED_IN':
               console.log('SIGNED_IN')
               if (session?.user) {
                  authActions.setUser(session.user)
               }
               break
            case 'SIGNED_OUT':
               console.log('SIGNED_OUT')
               authActions.setUser(null)
               break
            case 'TOKEN_REFRESHED':
               console.log('TOKEN_REFRESHED')
               if (session?.user) {
                  authActions.setUser(session.user)
               }
               break
         }
      })

      return () => {
         subscription.unsubscribe()
      }
   }, [isInitialized, authActions])

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

         // El listener se encargará de actualizar el store automáticamente
         // EVITAMOS -> authActions.setUser(data.user)
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
         // El listener se encargará de limpiar el store automáticamente
         console.log('👋 Usuario deslogueado')
         toast.success('Sesión cerrada correctamente')
         return { success: true }
      } catch (error) {
         console.error('Error during logout:', error)

         // En caso de error, limpiar el store manualmente
         authActions.resetStore()
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
      isInitialized,
   }
}
