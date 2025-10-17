import { routesConfig } from '@config/routesConfig'
import { Clock, ChevronRight } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { Button } from '@shadcn'
import { PageTitleLanding } from '@shared'

const Quiz = () => {
   const navigate = useNavigate()

   return (
      <div className="container py-15 md:py-20 space-y-10">
         <PageTitleLanding
            title={
               <>
                  ¡Estamos creando algo <br />{' '}
                  <span className="italic font-light">increíble</span> para vos!
               </>
            }
            description="Nuestro quiz personalizado de estilo está en desarrollo. Muy pronto
                  podrás descubrir tu estilo único de manera interactiva y divertida."
         />

         {/* Estado de progreso */}
         <div className="flex justify-center">
            <div className="bg-white/15 backdrop-blur-sm rounded-2xl p-6 border border-silk-secondary/20 w-xl">
               <div className="flex items-center justify-center gap-3 mb-4">
                  <Clock className="w-5 h-5 text-silk-secondary" />
                  <span className="font-semibold text-silk-secondary uppercase tracking-wide text-sm">
                     En Desarrollo
                  </span>
               </div>

               {/* Barra de progreso */}
               <div className="w-full bg-silk-secondary/20 rounded-full h-2 mb-3">
                  <div className="bg-gradient-to-r from-silk-secondary to-silk-primary h-2 rounded-full w-3/4 animate-pulse"></div>
               </div>

               <p className="text-sm text-silk-secondary/70">
                  Lanzamiento estimado: Próximamente
               </p>
            </div>
         </div>

         <div className="flex flex-col items-center">
            <Button
               onClick={() => navigate(routesConfig.CLIENT_SERVICES)}
               variant="primary"
               size="xl"
               className="mb-4 group relative overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300"
            >
               <span className="relative z-10 flex items-center">
                  VER NUESTROS SERVICIOS
                  <ChevronRight
                     className="ml-2 group-hover:translate-x-1 transition-transform duration-200"
                     size={19}
                  />
               </span>
               <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
            </Button>
            <p className="text-sm text-silk-secondary/60">
               Mientras tanto, conocé todos los servicios disponibles
            </p>
         </div>
      </div>
   )
}

export default Quiz
