import { routesConfig } from '@config/routesConfig'
import useAuthStore from '@stores/useAuth.store'
import { Navigate } from 'react-router-dom'
import { ReactNode } from 'react'

interface ProtectedRouteProps {
   children: ReactNode
}

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
   const isAuthenticated = useAuthStore((state) => state.isInitialized)

   // Redirigir al login si no está autenticado
   if (!isAuthenticated) {
      return <Navigate to={routesConfig.ADMIN_LOGIN} replace />
   }

   return <>{children}</>
}

export default ProtectedRoute
