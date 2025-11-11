import { routesConfig } from '@config/routesConfig'
import { Clock, ChevronRight } from 'lucide-react'
import { PageTitleLanding, Seo } from '@shared'
import { useNavigate } from 'react-router-dom'
import { Button } from '@shadcn'

const Quiz = () => {
   const navigate = useNavigate()

   const quizJsonLd = {
      '@context': 'https://schema.org',
      '@type': 'WebPage',
      name: 'Quiz de Estilo Personal - Estudio Silk',
      description:
         'Descubre tu estilo único con nuestro quiz personalizado. Próximamente disponible para ayudarte a encontrar tu estilo personal ideal.',
      url: 'https://estudiosilk.com/quiz',
      isPartOf: {
         '@type': 'WebSite',
         name: 'Estudio Silk',
         url: 'https://estudiosilk.com',
      },
      about: {
         '@type': 'Thing',
         name: 'Quiz de Estilo Personal',
         description: 'Herramienta interactiva para descubrir tu estilo personal único',
      },
   }

   return (
      <>
         <Seo
            title="Quiz de Estilo Personal - Descubre tu Estilo Único"
            description="¿No sabes cuál es tu estilo? Nuestro quiz personalizado te ayudará a descubrir tu estilo único. Próximamente disponible en Estudio Silk."
            url="https://estudiosilk.com/quiz"
            keywords={[
               'quiz estilo personal',
               'descubrir mi estilo',
               'test de estilo',
               'quiz moda argentina',
               'encontrar estilo personal',
               'quiz colorimetría',
               'estilo único',
               'personalidad estilo',
            ]}
            jsonLd={quizJsonLd}
         />
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
                        Próximamente disponible
                     </span>
                  </div>

                  {/* Barra de progreso */}
                  <div className="w-full bg-silk-secondary/20 rounded-full h-2 mb-3">
                     <div className="bg-gradient-to-r from-silk-secondary to-silk-primary h-2 rounded-full w-3/4 animate-pulse"></div>
                  </div>
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
      </>
   )
}

export default Quiz
