import { Testimonial } from '@models/Testimonial.model'
import { getPublicImageUrl } from '@utils/getPublicImage'
import { Quote, Star } from 'lucide-react'

interface TestimonialCardProps {
   testimonial: Testimonial
}

const TestimonialCard: React.FC<TestimonialCardProps> = ({
   testimonial: { personName, personRole, description, isHighlight, avatarImagePath },
}) => {
   return (
      <div className="h-full relative bg-white border border-gray-200 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 overflow-hidden flex flex-col">
         {/* Header con info de la persona */}
         <div className="flex items-center gap-4 p-6 pb-4">
            <div className="relative">
               <div className="w-14 h-14 rounded-full overflow-hidden border-3 border-white shadow-lg ring-2 ring-silk-tertiary/20">
                  <img
                     alt={personName}
                     className="w-full h-full object-cover"
                     src={
                        avatarImagePath
                           ? getPublicImageUrl(avatarImagePath)
                           : '/image-placeholder.svg'
                     }
                  />
               </div>

               {isHighlight && (
                  <div className="absolute -top-1 -right-1 w-6 h-6 bg-gradient-to-r from-amber-400 to-amber-500 rounded-full flex items-center justify-center shadow-lg">
                     <Star className="w-3 h-3 text-white fill-current" />
                  </div>
               )}
            </div>

            <div className="flex-1 min-w-0">
               <h3 className="font-serif text-silk-secondary font-semibold text-lg select-none">
                  {personName}
               </h3>

               <p className="text-sm text-silk-primary font-medium opacity-80 select-none">
                  {personRole}
               </p>
            </div>
         </div>

         {/* Contenido del testimonio */}
         <div className="flex flex-col flex-1 px-6 pb-6 relative">
            {/* Quote icon decorativo en esquina superior derecha */}
            <Quote className="absolute top-2 right-2 w-6 h-6 text-silk-primary/40" />

            {/* Testimonio */}
            <blockquote className="text-silk-secondary/90 flex-1 leading-relaxed text-base italic font-light pt-2 pr-8 select-none">
               "{description}"
            </blockquote>

            {/* Línea decorativa simple */}
            {/* <div className="w-12 h-0.5 bg-gradient-to-r from-silk-primary to-silk-tertiary rounded-full mt-4"></div> */}
         </div>
      </div>
   )
}

export default TestimonialCard
