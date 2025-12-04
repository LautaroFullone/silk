import { Container, LandingButton, PageTitleLanding } from '@shared'
import { routesConfig } from '@config/routesConfig'
import { useNavigate } from 'react-router-dom'

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
      image: 'dresses-image.webp',
      title: 'TRANSFORMAMOS TU EXPERIENCIA',
      description:
         'Cada consulta es personalizada, diseñada para adaptarse a tu estilo de vida y necesidades únicas.',
   },
]

const ConfidenceSection = () => {
   const navigate = useNavigate()

   return (
      <Container backgroundColor="bg-silk-secondary" childrenClassName="space-y-10">
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

         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
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

         <div className="h-px bg-silk-tertiary/20"></div>

         <div className="text-center">
            <p className="text-tertiary/80 text-lg mb-6 max-w-md mx-auto leading-relaxed">
               ¿Querés conocernos mejor y descubrir cómo podemos ayudarte?
            </p>

            <LandingButton
               label="CONOCÉ SOBRE NOSOTROS"
               onClick={() => navigate(routesConfig.CLIENT_ABOUT)}
               variant="tertiary"
            />
         </div>
      </Container>
   )
}

export default ConfidenceSection
