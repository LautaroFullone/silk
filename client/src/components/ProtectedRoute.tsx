import { routesConfig } from '@config/routesConfig'
import useAppStore from '@stores/app.store'
import { Navigate } from 'react-router-dom'
import { ReactNode } from 'react'

interface ProtectedRouteProps {
   children: ReactNode
}

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
   const user = useAppStore((state) => state.user)

   // Redirigir al login si no está autenticado
   if (!user) {
      return <Navigate to={routesConfig.ADMIN_LOGIN} replace />
   }

   return <>{children}</>
}

export default ProtectedRoute
