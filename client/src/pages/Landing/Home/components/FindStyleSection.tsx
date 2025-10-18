import { routesConfig } from '@config/routesConfig'
import { useNavigate } from 'react-router-dom'
import { ChevronRight } from 'lucide-react'
import { Button } from '@shadcn'

const FindStyleSection = () => {
   const navigate = useNavigate()

   return (
      <section className="bg-[url('/find-images/cloud-image.png')] bg-cover bg-center">
         <div className="container py-15 md:py-20 ">
            <div className="flex items-center justify-center my-4">
               <div className="text-silk-secondary bg-silk-secondary border border-silk-secondary rounded-lg shadow-2xl hover:scale-105 transition-all duration-300 overflow-hidden">
                  <div className="w-full flex items-center px-2 py-2 ">
                     <div className="flex space-x-1.5 mr-3">
                        <span className="block w-2 h-2 bg-gray-400 rounded-full" />
                        <span className="block w-2 h-2 bg-gray-400 rounded-full" />
                        <span className="block w-2 h-2 bg-gray-400 rounded-full" />
                     </div>
                  </div>

                  <div className="bg-silk-tertiary">
                     <div className="flex justify-between items-center w-full text-xs font-semibold p-3 font-classy-vogue border-b border-silk-primary/10">
                        <span className="tracking-wider">ESTUDIOSILK</span>
                        <span className="tracking-wider">EVERYDAY LUXURY</span>
                     </div>

                     <div className="flex flex-col items-center justify-center px-4 sm:px-8 lg:px-12 py-6 sm:py-8  w-full">
                        <div className="text-center mb-4">
                           <h1 className="font-very-vogue text-4xl sm:text-5xl tracking-wide text-center mb-3 sm:mb-4">
                              ¿Todavía no <br />
                              encontraste tu estilo?
                           </h1>

                           <p className="text-center text-base md:text-lg leading-relaxed max-w-md mx-auto">
                              Descubrí tu estilo ideal con nuestro{' '}
                              <span className="font-bold text-silk-primary">
                                 quiz personalizado
                              </span>
                              . Es rápido, práctico y el primer paso para transformar tu
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
         </div>
      </section>
   )
}

export default FindStyleSection
