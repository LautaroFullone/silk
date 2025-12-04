import { routesConfig } from '@config/routesConfig'
import { Container, LandingButton } from '@shared'
import { useNavigate } from 'react-router-dom'

const WorkSection = () => {
   const navigate = useNavigate()

   return (
      <Container
         as="section"
         backgroundColor="bg-silk-tertiary"
         childrenClassName="space-y-10"
         topBorder
      >
         <div className="text-center">
            <h3 className="font-very-vogue text-4xl md:text-5xl text-silk-secondary mb-4">
               ¡Vamos a trabajar juntos!
            </h3>

            <p className="text-silk-secondary/80 text-lg leading-relaxed max-w-2xl mx-auto">
               Ya conocés quiénes somos, nuestros valores y cómo trabajamos. Ahora es tu
               turno: explorá nuestros servicios o descubrí tu estilo ideal con nuestro
               quiz personalizado.
            </p>
         </div>

         <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <LandingButton
               label="VER NUESTROS SERVICIOS"
               onClick={() => navigate(routesConfig.CLIENT_SERVICES)}
               variant="primary"
            />

            <LandingButton
               label="HACER EL QUIZ DE ESTILO"
               onClick={() => navigate(routesConfig.CLIENT_QUIZ)}
               variant="secondary"
            />
         </div>

         <p className="text-center text-silk-secondary/60 text-sm mt-4">
            Comenzá tu transformación hoy • Te acompañaremos en cada paso • Resultados
            garantizados
         </p>
      </Container>
   )
}

export default WorkSection
