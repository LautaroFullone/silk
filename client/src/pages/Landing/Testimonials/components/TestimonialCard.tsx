import { Testimonial } from '@models/Testimonial.model'
import { Quote, Star } from 'lucide-react'
import { getPublicImageUrl } from '@utils/getPublicImage'

interface TestimonialCardProps {
   testimonial: Testimonial
}

const TestimonialCard: React.FC<TestimonialCardProps> = ({
   testimonial: { personName, personRole, description, isHighlight, avatarImagePath },
}) => {
   return (
      <div className="group h-full">
         <div className="relative bg-white border border-gray-200 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden flex flex-col h-full group-hover:-translate-y-2">
            {/* Accent bar superior */}

            {/* Header con info de la persona */}
            <div className="flex items-center gap-4 p-6 pb-4">
               <div className="relative">
                  <div className="w-14 h-14 rounded-full overflow-hidden border-3 border-white shadow-lg ring-2 ring-silk-tertiary/20">
                     <img
                        src={
                           avatarImagePath
                              ? getPublicImageUrl(avatarImagePath)
                              : '/image-placeholder.svg'
                        }
                        alt={personName}
                        className="w-full h-full object-cover"
                     />
                  </div>

                  {isHighlight && (
                     <div className="absolute -top-1 -right-1 w-6 h-6 bg-gradient-to-r from-amber-400 to-amber-500 rounded-full flex items-center justify-center shadow-lg">
                        <Star className="w-3 h-3 text-white fill-current" />
                     </div>
                  )}
               </div>

               <div className="flex-1 min-w-0">
                  <h3 className="font-serif text-silk-secondary font-semibold text-lg truncate">
                     {personName}
                  </h3>

                  <p className="text-sm text-silk-primary font-medium opacity-80">
                     {personRole}
                  </p>
               </div>
            </div>

            {/* Contenido del testimonio */}
            <div className="flex flex-col flex-1 px-6 pb-6 relative">
               {/* Quote icon decorativo en esquina superior derecha */}
               <Quote className="absolute top-2 right-2 w-6 h-6 text-silk-primary/30" />

               {/* Testimonio */}
               <blockquote className="text-silk-secondary/90 flex-1 leading-relaxed text-base italic font-light pt-2 pr-8">
                  "{description}"
               </blockquote>

               {/* Línea decorativa simple */}
               <div className="w-12 h-0.5 bg-gradient-to-r from-silk-primary to-silk-tertiary rounded-full mt-4"></div>
            </div>
         </div>
      </div>
   )
}

export default TestimonialCard
