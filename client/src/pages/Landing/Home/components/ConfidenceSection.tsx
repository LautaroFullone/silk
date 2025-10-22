import { routesConfig } from '@config/routesConfig'
import { useNavigate } from 'react-router-dom'
import { ChevronRight } from 'lucide-react'
import { PageTitleLanding } from '@shared'
import { Button } from '@shadcn'

const items = [
   {
      image: 'closet-image.webp',
      title: 'DIGITALIZAMOS TU CLOSET',
      description:
         'Accede a tu guardarropa desde cualquier lugar con nuestro sistema digital.',
   },
   {
      image: 'style-up-image.webp',
      title: 'ELEVAMOS TU ESTILO',
      description:
         'De la mano de tu estilista personal, creamos looks que reflejan quién sos y potencian tu mejor versión.',
   },
   {
      image: 'empower-image.webp',
      title: 'EMPODERAMOS TU IMAGEN',
      description:
         'Te ayudamos a proyectar confianza y seguridad a través de un estilo auténtico y único.',
   },
   {
      image: 'dressess-image.webp',
      title: 'RECOMENDACIÓN DEV',
      description:
         'Agregando una imagen más en esa seccion, la grilla se ve mejor cuando hay 2 columnas (pantalla más chica) ',
   },
]

const ConfidenceSection = () => {
   const navigate = useNavigate()

   return (
      <section className="bg-silk-secondary">
         {/* <div className="max-w-xs sm:max-w-xl lg:max-w-5xl mx-auto px-4 pb-4"> */}
         <div className="container py-15 md:py-20 space-y-10">
            <PageTitleLanding
               element="h2"
               textColor="text-silk-tertiary"
               title={
                  <>
                     En <span className="font-classy-vogue">SILK</span> creamos más que
                     looks:
                     <br />
                     <span className="italic font-light">construimos confianza</span>
                  </>
               }
            />

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 px-6 sm:px-0">
               {items.map((item, index) => (
                  <div
                     key={`confidence-image-${index}`}
                     className="w-full flex flex-col items-start group"
                  >
                     <div className="w-full aspect-[4/5] rounded-lg overflow-hidden mb-2 relative">
                        <img
                           src={`/confidence-images/${item.image}`}
                           alt={item.title}
                           className="w-full h-full object-cover object-center transition-transform duration-500 group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-silk-secondary/0 group-hover:bg-silk-secondary/20 transition-colors duration-300"></div>
                     </div>

                     <h3 className="font-very-vogue text-3xl tracking-wide mb-1">
                        {item.title}
                     </h3>

                     <p className="leading-relaxed">{item.description}</p>
                  </div>
               ))}
            </div>

            {/* Separador estético */}
            <div className="h-px bg-silk-tertiary/20"></div>

            {/* CTA Section */}
            {/* <div className="text-center">
               <p className="text-tertiary/80 text-lg mb-6 max-w-md mx-auto leading-relaxed">
                  ¿Te interesa transformar tu imagen y ganar confianza?
               </p>

               <Button
                  onClick={() => navigate(routesConfig.CLIENT_SERVICES)}
                  variant="tertiary"
                  size="xl"
                  className="group relative overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300"
               >
                  <span className="relative z-10 flex items-center">
                     NUESTROS SERVICIOS
                     <ChevronRight
                        className="ml-2 group-hover:translate-x-1 transition-transform duration-200"
                        size={19}
                     />
                  </span>
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
               </Button>
            </div> */}

            {/* CTA Section */}
            <div className="text-center">
               <p className="text-tertiary/80 text-lg mb-6 max-w-md mx-auto leading-relaxed">
                  ¿Querés conocernos mejor y descubrir cómo podemos ayudarte?
               </p>

               <Button
                  onClick={() => navigate(routesConfig.CLIENT_ABOUT)}
                  variant="tertiary"
                  size="xl"
                  className="group relative overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300"
               >
                  <span className="relative z-10 flex items-center">
                     CONOCÉ SOBRE NOSOTROS
                     <ChevronRight
                        className="ml-2 group-hover:translate-x-1 transition-transform duration-200"
                        size={19}
                     />
                  </span>
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
               </Button>
            </div>
         </div>
      </section>
   )
}

export default ConfidenceSection
