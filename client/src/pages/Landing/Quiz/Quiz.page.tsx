import { Clock, ChevronRight } from 'lucide-react'
import { routesConfig } from '@config/routesConfig'
import { useNavigate } from 'react-router-dom'
import { Button } from '@shadcn'

const Quiz = () => {
   const navigate = useNavigate()

   return (
      <div className="bg-silk-tertiary overflow-hidden">
         <div className="min-h-dvh flex flex-col items-center justify-center px-4 ">
            <div className="max-w-2xl mx-auto text-center">
               <h1 className="font-very-vogue text-4xl md:text-5xl lg:text-6xl text-silk-secondary mb-6 leading-tight">
                  ¡Estamos creando algo
                  <br />
                  <span className="italic font-light">increíble</span> para vos!
               </h1>

               <p className="text-lg md:text-xl text-silk-secondary/80 mb-8 leading-relaxed max-w-lg mx-auto">
                  Nuestro quiz personalizado de estilo está en desarrollo. Muy pronto
                  podrás descubrir tu estilo único de manera interactiva y divertida.
               </p>

               {/* Estado de progreso */}
               <div className="bg-white/15 backdrop-blur-sm rounded-2xl p-6 mb-8 border border-silk-secondary/20">
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

               {/* CTAs */}
               <div className="space-y-4">
                  <Button
                     onClick={() => navigate(routesConfig.CLIENT_SERVICES)}
                     variant="primary"
                     size="xl"
                     className=" group relative overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300"
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
                     Mientras tanto, conocé todos nuestros servicios disponibles
                  </p>
               </div>
            </div>
         </div>
      </div>
   )
}

export default Quiz
