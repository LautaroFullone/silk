import { useAuth } from '@hooks/useAuth'
import { useEffect } from 'react'
import { Toaster } from 'sonner'
import Router from './Router'

const App = () => {
   const { initializeAuth } = useAuth()

   // Inicializar autenticación al montar la app
   useEffect(() => {
      initializeAuth()
   }, []) // eslint-disable-line

   return (
      <>
         <Router />
         <Toaster position="bottom-right" richColors />
      </>
   )
}
export default App
