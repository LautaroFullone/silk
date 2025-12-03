import { ChevronRight } from 'lucide-react'
import ServicesModal from './ServicesModal'
import { Container } from '@shared'
import { useState } from 'react'
import { Button } from '@shadcn'

const ContactSection = () => {
   const [isModalOpen, setIsModalOpen] = useState(false)

   return (
      <>
         <Container
            as="section"
            className="bg-gradient-to-r from-silk-primary via-emerald-800 to-silk-primary"
            childrenClassName="space-y-10"
         >
            <div className="text-center">
               <h3 className="font-very-vogue text-4xl md:text-5xl text-silk-tertiary mb-4">
                  ¿Cuál de estos servicios es{' '}
                  <span className="italic font-light">perfecto</span> para vos?
               </h3>

               <p className="text-silk-tertiary/80 text-lg leading-relaxed max-w-2xl mx-auto">
                  Si no estás seguro cuál elegir o necesitás una consulta personalizada,
                  contactanos y te ayudamos a encontrar la opción ideal según tus
                  objetivos y estilo de vida.
               </p>
            </div>

            <div className="flex justify-center">
               <Button
                  onClick={() => setIsModalOpen(true)}
                  variant="tertiary"
                  size="xl"
                  className="group relative overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300"
               >
                  <span className="relative z-10 flex items-center">
                     QUIERO CONTACTARME
                     <ChevronRight
                        className="ml-2 group-hover:translate-x-1 transition-transform duration-200"
                        size={19}
                     />
                  </span>
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
               </Button>
            </div>
         </Container>

         <ServicesModal isModalOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
      </>
   )
}
export default ContactSection
