import { Testimonial } from '@models/Testimonial.model'
import { Button, Card, CardContent } from '@shadcn'
import { Edit, Quote, Star, Trash2, User } from 'lucide-react'
import TestimonialCardActions from './TestimonialCardActions'

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
                  {/* Profile Image */}
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

                  {/* Name and Role */}
                  <div className="flex-1 min-w-0">
                     <h3 className="text-lg font-serif text-gray-900 font-semibold truncate">
                        {personName}
                     </h3>
                     <div className="flex items-center gap-1 text-gray-600 text-sm">
                        <User className="w-3 h-3 flex-shrink-0" />
                        <span className="truncate">{personRole}</span>
                     </div>
                  </div>
               </div>

               {/* Actions 
               <div className="flex gap-1 flex-shrink-0">
                  <Button
                     variant="outline"
                     size="sm"
                     onClick={() => {}}
                     className="p-1.5 h-auto hover:bg-blue-50 hover:border-blue-300 hover:text-blue-700 transition-colors"
                     title="Editar testimonio"
                  >
                     <Edit className="w-3 h-3" />
                  </Button>

                  <Button
                     variant="outline"
                     size="sm"
                     onClick={() => {}}
                     className={`p-1.5 h-auto transition-colors ${
                        isHighlight
                           ? 'bg-yellow-50 border-yellow-300 text-yellow-700 hover:bg-yellow-100'
                           : 'hover:bg-yellow-50 hover:border-yellow-300 hover:text-yellow-700'
                     }`}
                     title={isHighlight ? 'Quitar destacado' : 'Destacar'}
                  >
                     <Star className={`w-3 h-3 ${isHighlight ? 'fill-current' : ''}`} />
                  </Button>

                  <Button
                     variant="outline"
                     size="sm"
                     onClick={() => {}}
                     className="p-1.5 h-auto hover:bg-red-50 hover:border-red-300 hover:text-red-700 transition-colors"
                     title="Eliminar testimonio"
                  >
                     <Trash2 className="w-3 h-3" />
                  </Button>
               </div>*/}

               <TestimonialCardActions idTestimonial={id} isHighlight={isHighlight} />
            </div>

            {/* Quote */}
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
