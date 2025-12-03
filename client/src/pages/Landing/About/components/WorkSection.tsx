import { routesConfig } from '@config/routesConfig'
import { useNavigate } from 'react-router-dom'
import { ChevronRight } from 'lucide-react'
import { Container } from '@shared'
import { Button } from '@shadcn'

const WorkSection = () => {
   const navigate = useNavigate()
   return (
      <>
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
                  Ya conocés quiénes somos, nuestros valores y cómo trabajamos. Ahora es
                  tu turno: explorá nuestros servicios o descubrí tu estilo ideal con
                  nuestro quiz personalizado.
               </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
               <Button
                  onClick={() => navigate(routesConfig.CLIENT_SERVICES)}
                  variant="primary"
                  size="xl"
                  className="group relative overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300"
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

               <Button
                  onClick={() => navigate(routesConfig.CLIENT_QUIZ)}
                  variant="secondary"
                  size="xl"
                  className="bg-white/80 backdrop-blur-sm border-silk-secondary/30 text-silk-secondary hover:bg-white/90"
               >
                  HACER EL QUIZ DE ESTILO
               </Button>
            </div>

            <p className="text-center text-silk-secondary/60 text-sm mt-4">
               Comenzá tu transformación hoy • Te acompañaremos en cada paso • Resultados
               garantizados
            </p>
         </Container>
      </>
   )
}

export default WorkSection
