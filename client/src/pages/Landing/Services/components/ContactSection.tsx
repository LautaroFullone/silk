import { Container, LandingButton } from '@shared'
import ServicesModal from './ServicesModal'
import { useState } from 'react'

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
               <LandingButton
                  label="QUIERO CONTACTARME"
                  onClick={() => setIsModalOpen(true)}
                  variant="tertiary"
               />
            </div>
         </Container>

         <ServicesModal isModalOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
      </>
   )
}
export default ContactSection
