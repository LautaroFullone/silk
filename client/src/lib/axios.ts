import { supabase } from './supabase'
import axios from 'axios'

export const api = axios.create({
   baseURL: import.meta.env.PROD
      ? import.meta.env.VITE_API_BASE_URL
      : 'http://localhost:3031/api',
})

// Interceptor para agregar automáticamente el token de Supabase
api.interceptors.request.use(
   async (config) => {
      try {
         // Obtener la sesión actual
         const {
            data: { session },
         } = await supabase.auth.getSession()

         if (session?.access_token) {
            config.headers.Authorization = `Bearer ${session.access_token}`
         }
      } catch (error) {
         console.error('❌ Error obteniendo token para request:', error)
      }

      return config
   },
   (error) => {
      return Promise.reject(error)
   }
)

// // Interceptor para manejar errores de autenticación
api.interceptors.response.use(
   (response) => response,
   async (error) => {
      if (error.response?.status === 401) {
         console.warn('🔒 Token expirado o inválido, redirigiendo al login...')

         // Opcional: limpiar la sesión local
         await supabase.auth.signOut()

         // Opcional: redirigir al login si estás en una ruta protegida
         if (window.location.pathname.startsWith('/admin')) {
            window.location.href = '/admin/login'
         }
      }

      return Promise.reject(error)
   }
)
