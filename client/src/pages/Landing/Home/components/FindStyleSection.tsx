import { routesConfig } from '@config/routesConfig'
import { useNavigate } from 'react-router-dom'
import { ChevronRight } from 'lucide-react'
import { Button } from '@shadcn'

const FindStyleSection = () => {
   const navigate = useNavigate()

   return (
      <div className="min-h-[70dvh] bg-[url('/find-images/cloud-image.png')] bg-cover bg-center flex items-center justify-center py-12 md:py-20 text-silk-secondary relative">
         <div className="absolute inset-0 bg-silk-primary/20"></div>

         <div className="relative z-10 overflow-hidden bg-silk-secondary border border-silk-secondary rounded-lg shadow-2xl w-full max-w-xs sm:max-w-md lg:max-w-xl mx-4 flex flex-col items-center transform hover:scale-105 transition-transform duration-300">
            <div className="w-full flex items-center px-2 py-2 ">
               <div className="flex space-x-1.5 mr-3">
                  <span className="block w-2 h-2 bg-gray-400 rounded-full" />
                  <span className="block w-2 h-2 bg-gray-400 rounded-full" />
                  <span className="block w-2 h-2 bg-gray-400 rounded-full" />
               </div>
            </div>

            <div className="bg-silk-tertiary w-full">
               <div className="flex justify-between items-center w-full text-xs font-semibold p-3 font-classy-vogue border-b border-silk-primary/10">
                  <span className="tracking-wider">ESTUDIOSILK</span>
                  <span className="tracking-wider">EVERYDAY LUXURY</span>
               </div>
               <div className="flex flex-col items-center justify-center px-4 sm:px-8 lg:px-12 py-6 sm:py-8  w-full">
                  <div className="text-center mb-4">
                     <h1 className="font-bold text-2xl sm:text-3xl lg:text-4xl text-center mb-3 sm:mb-4 leading-tight">
                        ¿Todavía no <br />
                        encontraste tu estilo?
                     </h1>

                     <p className="text-center text-sm sm:text-lg lg:text-x leading-relaxed max-w-md mx-auto">
                        Descubrí tu estilo ideal con nuestro{' '}
                        <span className="font-bold text-silk-primary">
                           quiz personalizado
                        </span>
                        .
                        <br className="hidden sm:block" />
                        Es rápido, práctico y el primer paso para transformar tu
                        guardarropa.
                     </p>
                  </div>

                  <div className="flex flex-wrap justify-center gap-3 mb-4 text-xs sm:text-sm">
                     <div className="flex items-center gap-2 bg-silk-primary/10 px-3 py-1 rounded-full">
                        <span>⚡</span>
                        <span>2 minutos</span>
                     </div>
                     <div className="flex items-center gap-2 bg-silk-primary/10 px-3 py-1 rounded-full">
                        <span>🎯</span>
                        <span>Resultados precisos</span>
                     </div>
                     <div className="flex items-center gap-2 bg-silk-primary/10 px-3 py-1 rounded-full">
                        <span>✨</span>
                        <span>100% gratis</span>
                     </div>
                  </div>

                  <Button
                     onClick={() => navigate(routesConfig.CLIENT_QUIZ)}
                     variant="primary"
                     size="xl"
                     className="group relative overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300"
                  >
                     <span className="relative z-10 flex items-center">
                        HACER EL QUIZ
                        <ChevronRight
                           className="ml-2 group-hover:translate-x-1 transition-transform duration-200"
                           size={19}
                        />
                     </span>
                     <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
                  </Button>

                  <p className="text-xs text-silk-primary/60 mt-3 text-center">
                     Sin registro • Sin spam • Resultados inmediatos
                  </p>
               </div>
            </div>
         </div>
      </div>
   )
}

export default FindStyleSection
