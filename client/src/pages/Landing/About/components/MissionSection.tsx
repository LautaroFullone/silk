import { Container, PageTitleLanding } from '@shared'

const MissionSection = () => {
   return (
      <Container
         as="section"
         backgroundColor="bg-silk-secondary"
         childrenClassName="space-y-10"
      >
         <PageTitleLanding
            element="h2"
            textColor="text-silk-tertiary"
            title={
               <>
                  Nuestra <span className="italic font-light">misión</span>
               </>
            }
            description="Creemos que la imagen personal es una herramienta poderosa de autoexpresión y confianza. Queremos acompañarte en el proceso de descubrir tu estilo único y auténtico."
         />

         <div className="grid grid-cols-1 lg:grid-cols-2 grid-rows-2 gap-8">
            <div className="bg-silk-tertiary/10 backdrop-blur-sm rounded-lg p-6 border border-silk-tertiary/20">
               <h3 className="font-very-vogue text-2xl text-silk-tertiary mb-3">
                  ¿Por qué elegimos este camino?
               </h3>
               <p className="text-silk-tertiary/90 leading-relaxed">
                  Después de años trabajando en la industria de la moda, nos dimos cuenta
                  de que muchas personas no sabían cómo expresar su personalidad a través
                  de su imagen. Decidimos crear SILK para cambiar esa realidad.
               </p>
            </div>

            <div className="bg-silk-tertiary/10 backdrop-blur-sm rounded-lg p-6 border border-silk-tertiary/20">
               <h3 className="font-very-vogue text-2xl text-silk-tertiary mb-3">
                  Nuestro enfoque
               </h3>
               <p className="text-silk-tertiary/90 leading-relaxed">
                  Trabajamos desde una perspectiva integral, considerando no solo las
                  tendencias, sino también tu estilo de vida, personalidad y objetivos.
                  Cada consultoría es única y personalizada.
               </p>
            </div>

            <div className="hidden sm:flex items-center justify-center lg:row-span-2 lg:col-start-2 lg:row-start-1">
               <div className="relative">
                  <img
                     src="/team-images/team-mission.webp"
                     alt="Nuestra misión en SILK"
                     className="rounded-lg shadow-lg max-w-full h-auto"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-silk-secondary/20 to-transparent rounded-lg"></div>
               </div>
            </div>
         </div>
      </Container>
   )
}

export default MissionSection
