import { Edit, MoreHorizontal, Quote, SquarePen, Star, Trash2, User } from 'lucide-react'
import { Testimonial } from '@models/Testimonial.model'
import { routesConfig } from '@config/routesConfig'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'
import {
   Button,
   Card,
   CardContent,
   DropdownMenu,
   DropdownMenuContent,
   DropdownMenuItem,
   DropdownMenuTrigger,
} from '@shadcn'

interface TestimonialCardProps {
   testimonial: Testimonial
   onEdit: (testimonial: Testimonial) => void
   onDelete: (testimonial: Testimonial) => void
}

const TestimonialCard = ({ testimonial, onEdit, onDelete }: TestimonialCardProps) => {
   const [isDropdownOpen, setIsDropdownOpen] = useState(false)

   const navigate = useNavigate()

   return (
      <Card
         key={testimonial.id}
         className="overflow-hidden transition-all duration-300  hover:shadow-md bg-white h-full flex flex-col"
      >
         <CardContent className="flex flex-col h-full">
            <div className="flex items-start justify-between mb-4 min-w-0">
               {/* Avatar y nombre */}
               <div className="flex items-center gap-4 min-w-0 flex-1">
                  <div className="relative flex-shrink-0">
                     <div className="w-16 h-16 rounded-full overflow-hidden border-3 border-white shadow-lg">
                        <img
                           src={testimonial.image}
                           alt={testimonial.personRole}
                           className="w-16 h-16 object-cover"
                        />
                     </div>

                     {testimonial.isHighlight && (
                        <div className="absolute -top-1 -right-1 bg-gradient-to-bl from-emerald-600 to-emerald-800 rounded-full p-1 shadow-lg">
                           <Star className="w-3 h-3 text-white fill-current" />
                        </div>
                     )}
                  </div>

                  <div className="flex flex-col min-w-0 flex-1">
                     <h3
                        className="text-xl font-serif text-secondary truncate min-w-0"
                        title={testimonial.personName}
                     >
                        {testimonial.personName}
                     </h3>

                     <div className="flex items-center text-gray-600 text-sm min-w-0">
                        <User className="w-4 h-4 mr-1" />
                        <span className="truncate">{testimonial.personRole}</span>
                     </div>
                  </div>
               </div>

               {/* Acciones */}
               <div className="flex-shrink-0 flex items-center ml-2">
                  <div className="flex-shrink-0 gap-2 hidden md:flex">
                     <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => onEdit(testimonial)}
                     >
                        <SquarePen className="size-4" />
                        Editar
                     </Button>

                     <Button
                        variant="outline"
                        size="sm"
                        onClick={() => onDelete(testimonial)}
                        className="text-destructive!"
                     >
                        <Trash2 className="size-4" />
                        Eliminar
                     </Button>
                  </div>

                  <div className="flex-shrink-0 flex md:hidden">
                     <DropdownMenu open={isDropdownOpen} onOpenChange={setIsDropdownOpen}>
                        <DropdownMenuTrigger asChild>
                           <Button size="icon" variant="ghost" className="h-8 w-8 p-0">
                              <MoreHorizontal className="h-4 w-4" />
                              <span className="sr-only">Abrir menú</span>
                           </Button>
                        </DropdownMenuTrigger>

                        <DropdownMenuContent align="end">
                           <DropdownMenuItem
                              onClick={() =>
                                 navigate(
                                    routesConfig.ADMIN_TESTIMONIAL_EDIT.replace(
                                       ':testimonialId',
                                       testimonial.id
                                    )
                                 )
                              }
                              className="text-secondary font-normal"
                           >
                              <Edit className="mr-3 h-4 w-4 text-secondary" />
                              Editar
                           </DropdownMenuItem>

                           <DropdownMenuItem
                              onClick={() => {}}
                              className="text-destructive! hover:bg-red-50!"
                           >
                              <Trash2 className="mr-3 h-4 w-4 text-destructive" />
                              Eliminar
                           </DropdownMenuItem>
                        </DropdownMenuContent>
                     </DropdownMenu>
                  </div>
               </div>
            </div>

            <div className="flex-1 flex flex-col">
               <div className="relative flex-1">
                  <Quote className="absolute -top-1 -left-1 w-6 h-6 text-emerald-800" />
                  <blockquote className="text-gray-700 leading-relaxed pl-5 text-sm italic font-light">
                     "{testimonial.content}"
                  </blockquote>
               </div>
            </div>
         </CardContent>
      </Card>
   )
}
export default TestimonialCard
