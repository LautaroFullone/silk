import { routesConfig } from '@config/routesConfig'
import useAuthStore from '@stores/useAuth.store'
import { Navigate } from 'react-router-dom'
import { ReactNode } from 'react'
import { useAuth } from '@hooks/useAuth'

interface ProtectedRouteProps {
   children: ReactNode
}

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
   const isAuthenticated = useAuthStore((state) => state.isAuthenticated)
   const isInitialized = useAuthStore((state) => state.isInitialized)

   console.log('ProtectedRoute - isAuthenticated:', isAuthenticated)
   console.log('ProtectedRoute - isInitialized:', isInitialized)
   // Inicializar autenticación si no se ha hecho

   // Mostrar loading mientras se inicializa
   if (!isInitialized) {
      return (
         <div className="flex items-center justify-center min-h-screen">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
         </div>
      )
   }

   // Redirigir al login si no está autenticado
   if (!isAuthenticated) {
      return <Navigate to={routesConfig.ADMIN_LOGIN} replace />
   }

   return <>{children}</>
}

export default ProtectedRoute
