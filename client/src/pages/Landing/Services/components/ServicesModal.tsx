import { Dialog, DialogContent, DialogTitle } from '@shadcn'
import ContactForm from '@shared/ContactForm'

interface ServicesModalProps {
   isModalOpen: boolean
   onClose: () => void
}

const ServicesModal: React.FC<ServicesModalProps> = ({ isModalOpen, onClose }) => {
   return (
      <Dialog open={isModalOpen} onOpenChange={(open) => open || onClose()}>
         <DialogContent
            onOpenAutoFocus={
               (e) => e.preventDefault() // <- evita que se enfoque el contenido al abrir el modal
            }
            className="max-w-6xl! max-h-[90dvh] overflow-y-auto bg-silk-tertiary text-silk-primary 
             sm:w-full "
         >
            <DialogTitle className="hidden">
               SERVICIOS PERSONALIZADOS DE IMAGEN
            </DialogTitle>

            <div className="mx-auto sm:px-4 py-6">
               <div className="grid lg:grid-cols-2 gap-x-4 gap-y-8 items-center">
                  <div>
                     <p className="text-sm font-semibold uppercase">
                        SERVICIOS PERSONALIZADOS DE IMAGEN
                     </p>
                     <h2 className="mt-3 text-4xl md:text-5xl font-light leading-tight">
                        Encontrá el servicio que
                        <span className="italic"> transforme</span> tu imagen
                     </h2>

                     <p className="mt-4 text-silk-primary/80">
                        Elegí el servicio que mejor se adapte a tus necesidades y
                        objetivos. Nuestro equipo te ayudará a crear una imagen única y
                        auténtica.
                     </p>

                     <div className="text-xl md:text-2xl text-silk-primary/90 mt-8 space-y-6 border-l-2 border-silk-primary/50 pl-4">
                        {/* Quote inspiracional */}
                        <blockquote className="font-light italic">
                           "Un armario que te <span className="font-normal">inspira</span>
                           "
                        </blockquote>
                        <blockquote className="font-light italic">
                           "Una imagen que te{' '}
                           <span className="font-normal">representa</span>"
                        </blockquote>
                        <blockquote className="font-light italic">
                           "Una confianza que{' '}
                           <span className="font-normal">transforma</span> realidades"
                        </blockquote>
                     </div>
                  </div>

                  <ContactForm isServiceInputEnabled onSubmitSuccess={() => onClose()} />
               </div>
            </div>
         </DialogContent>
      </Dialog>
   )
}
export default ServicesModal
