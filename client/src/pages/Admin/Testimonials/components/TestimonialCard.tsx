import TestimonialCardActions from './TestimonialCardActions'
import { Testimonial } from '@models/Testimonial.model'
import { Quote, Star, User } from 'lucide-react'
import { Card, CardContent } from '@shadcn'

interface TestimonialCardProps {
   testimonial: Testimonial
}

const TestimonialCard: React.FC<TestimonialCardProps> = ({
   testimonial: { id, content, isHighlight, image, personName, personRole },
}) => {
   return (
      <Card
         key={id}
         className="overflow-hidden hover:shadow-xl transition-all duration-300 border-0 shadow-md bg-white h-full flex flex-col"
      >
         <CardContent className="flex flex-col h-full">
            <div className="flex items-start justify-between mb-4">
               <div className="flex items-center space-x-4">
                  <div className="relative flex-shrink-0">
                     <div className="w-16 h-16 rounded-full overflow-hidden border-3 border-white shadow-lg">
                        <img
                           src={image}
                           alt={personRole}
                           className="w-16 h-16 object-cover"
                        />
                     </div>

                     {isHighlight && (
                        <div className="absolute -top-1 -right-1 bg-gradient-to-r from-emerald-600 to-emerald-700 rounded-full p-1 shadow-lg">
                           <Star className="w-3 h-3 text-white fill-current" />
                        </div>
                     )}
                  </div>

                  <div className="flex-1 min-w-0">
                     <h3
                        className="flex-1 min-w-0 text-xl font-serif text-gray-900 truncate"
                        title={personName}
                     >
                        {personName}
                     </h3>

                     <div className="flex items-center text-gray-600 text-sm">
                        <User className="w-4 h-4 mr-1" />
                        <span className="truncate">{personRole}</span>
                     </div>
                  </div>
               </div>

               <TestimonialCardActions idTestimonial={id} isHighlight={isHighlight} />
            </div>

            <div className="flex-1 flex flex-col">
               <div className="relative flex-1">
                  <Quote className="absolute -top-1 -left-1 w-6 h-6 text-emerald-800" />
                  <blockquote className="text-gray-700 leading-relaxed pl-5 text-sm italic font-light">
                     "{content}"
                  </blockquote>
               </div>
            </div>
         </CardContent>
      </Card>
   )
}
export default TestimonialCard
