import { Dialog, DialogContent, DialogTitle } from '@shadcn'
import ContactForm from '@shared/ContactForm'

interface ColorimetryModalProps {
   isModalOpen: boolean
   onClose: () => void
}

const ColorimetryModal: React.FC<ColorimetryModalProps> = ({ isModalOpen, onClose }) => {
   return (
      <Dialog open={isModalOpen} onOpenChange={(open) => open || onClose()}>
         <DialogContent className="max-w-6xl max-h-[90vh] overflow-hidden bg-tertiary text-primary">
            <DialogTitle className="hidden">
               ANÁLISIS DE COLOR HECHO POR EXPERTOS
            </DialogTitle>

            <div className="container mx-auto px-4 py-6 ">
               <div className="grid lg:grid-cols-2 gap-12 items-center">
                  <div>
                     <p className="text-sm font-semibold uppercase">
                        ANÁLISIS DE COLOR HECHO POR EXPERTOS
                     </p>
                     <h2 className="mt-3 text-4xl md:text-5xl font-light leading-tight">
                        ¿Usas los colores que realmente te
                        <span className="italic"> favorecen</span>?
                     </h2>

                     <p className="mt-4 text-primary/80">
                        Vamos a analizar tu tono de piel y te guiaremos con combinaciones
                        que resalten tu estilo.
                     </p>

                     <ul className="mt-6 space-y-2 text-primary">
                        <li className="flex items-center gap-2">
                           <span className="h-5 w-5 rounded-full bg-primary text-white grid place-items-center text-xs">
                              1
                           </span>
                           Completá tus datos
                        </li>
                        <li className="flex items-center gap-2">
                           <span className="h-5 w-5 rounded-full bg-primary text-white grid place-items-center text-xs">
                              2
                           </span>
                           Responde preguntas simples
                        </li>
                        <li className="flex items-center gap-2">
                           <span className="h-5 w-5 rounded-full bg-primary text-white grid place-items-center text-xs">
                              3
                           </span>
                           Obtené tu paleta personalizada
                        </li>
                     </ul>
                  </div>

                  <ContactForm />
               </div>
            </div>
         </DialogContent>
      </Dialog>
   )
}
export default ColorimetryModal
