import { routesConfig } from '@config/routesConfig'
import { useNavigate } from 'react-router-dom'
import { ChevronRight } from 'lucide-react'
import { Button } from '@shadcn'

const items = [
   {
      image: 'closet-image.jpg',
      title: 'DIGITALIZAMOS TU CLOSET',
      description:
         'Accede a tu guardarropa desde cualquier lugar con nuestro sistema digital.',
   },
   {
      image: 'style-up-image.jpg',
      title: 'ELEVAMOS TU ESTILO',
      description:
         'De la mano de tu estilista personal, creamos looks que reflejan quién sos y potencian tu mejor versión.',
   },
   {
      image: 'empower-image.jpg',
      title: 'EMPODERAMOS TU IMAGEN',
      description:
         'Te ayudamos a proyectar confianza y seguridad a través de un estilo auténtico y único.',
   },
   {
      image: 'recomendation-image.png',
      title: 'RECOMENDACIÓN DEV',
      description:
         'Agregando una imagen más en esa seccion, la grilla se ve mejor cuando hay 2 columnas (pantalla más chica) ',
   },
]

const ConfidenceSection = () => {
   const navigate = useNavigate()

   return (
      <section className="bg-silk-secondary py-20">
         <div className="max-w-xs sm:max-w-xl lg:max-w-5xl mx-auto px-4 pb-4">
            <h2 className="font-very-vogue text-4xl md:text-5xl lg:text-6xl text-center mb-16 leading-tight">
               En <span className="font-classy-vogue">SILK</span> creamos más que looks:
               <br />
               <span className="italic font-light">construimos confianza</span>
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 justify-items-center">
               {items.map((item, index) => (
                  <div
                     key={`confidence-image-${index}`}
                     className="w-full flex flex-col items-start group"
                  >
                     <div className="w-full aspect-[4/5] rounded-md overflow-hidden mb-6 relative">
                        <img
                           src={`/confidence-images/${item.image}`}
                           alt={item.title}
                           className="w-full h-full object-cover object-center transition-transform duration-500 group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-silk-secondary/0 group-hover:bg-silk-secondary/10 transition-colors duration-300"></div>
                     </div>

                     <h3 className="text-xl font-bold mb-3 tracking-wide uppercase">
                        {item.title}
                     </h3>

                     <p className="leading-relaxed">{item.description}</p>
                  </div>
               ))}
            </div>

            {/* Separador estético */}
            <div className="flex items-center justify-center my-10">
               <div className="w-128 h-px bg-silk-tertiary/20"></div>
            </div>

            {/* CTA Section */}
            <div className="text-center">
               <p className="text-tertiary/80 text-lg mb-6 max-w-md mx-auto leading-relaxed">
                  ¿Te interesa transformar tu imagen y ganar confianza?
               </p>

               <Button
                  onClick={() => navigate(routesConfig.CLIENT_SERVICES)}
                  variant="tertiary"
                  size="lg"
                  className=" group relative overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300"
               >
                  <span className="relative z-10 flex items-center">
                     CONOCÉ NUESTROS SERVICIOS
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
