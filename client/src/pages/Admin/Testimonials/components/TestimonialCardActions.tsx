import { Edit, Eye, EyeOff, MoreHorizontal, Star, StarOff, Trash2 } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { Testimonial } from '@models/Testimonial.model'
import { Button } from '@shadcn'
import { useState } from 'react'
import {
   DropdownMenu,
   DropdownMenuContent,
   DropdownMenuItem,
   DropdownMenuTrigger,
} from '@shadcn/dropdown-menu'

interface TestimonialCardActionsProps {
   idTestimonial: Testimonial['id']
   isHighlight: Testimonial['isHighlight']
}

const TestimonialCardActions: React.FC<TestimonialCardActionsProps> = ({
   idTestimonial,
   isHighlight,
}) => {
   const navigate = useNavigate()

   const [isDropdownOpen, setIsDropdownOpen] = useState(false)

   const goToEdit = () => {
      const params = new URLSearchParams({ id: idTestimonial })
      navigate(`form/?${params}`)
   }

   return (
      <>
         <div className="flex-shrink-0 hidden xl:flex gap-2">
            <Button variant="ghost" onClick={() => goToEdit()}>
               <Edit className="w-4 h-4" />
            </Button>

            <Button
               variant="secondary"
               className="border-secondary! bg-white! hover:bg-secondary! group"
               onClick={() => {}}
            >
               {isHighlight ? (
                  <StarOff className="w-4 h-4 text-secondary group-hover:text-white" />
               ) : (
                  <Star className="w-4 h-4 text-secondary group-hover:text-white" />
               )}
            </Button>

            <Button
               variant="outline"
               className="border-destructive! bg-white! hover:bg-destructive! group"
               onClick={() => {}}
               title="Eliminar testimonio"
            >
               <Trash2 className="w-4 h-4 text-destructive group-hover:text-white" />
            </Button>
         </div>

         <div className="flex-shrink-0 flex xl:hidden">
            <DropdownMenu open={isDropdownOpen} onOpenChange={setIsDropdownOpen}>
               <DropdownMenuTrigger asChild>
                  <Button size="icon" variant="ghost" className="h-8 w-8 p-0">
                     <MoreHorizontal className="h-4 w-4" />
                     <span className="sr-only">Abrir menú</span>
                  </Button>
               </DropdownMenuTrigger>

               <DropdownMenuContent align="end">
                  <DropdownMenuItem onClick={() => goToEdit()} className="text-secondary">
                     <Edit className="mr-3 h-4 w-4 text-secondary" />
                     <span className="font-medium ">Editar</span>
                  </DropdownMenuItem>

                  <DropdownMenuItem onClick={() => {}} className="text-secondary">
                     {isHighlight ? (
                        <StarOff className="mr-3 w-4 h-4 text-secondary" />
                     ) : (
                        <Star className="mr-3 w-4 h-4 text-secondary" />
                     )}
                     <span className="font-medium">
                        {isHighlight ? 'Destacar' : 'Desmarcar'} testimonio
                     </span>
                  </DropdownMenuItem>

                  <DropdownMenuItem
                     onClick={() => {}}
                     className="text-red-600! hover:bg-red-50!"
                  >
                     <Trash2 className="mr-3 h-4 w-4 text-red-600" />
                     <span className="font-medium">Eliminar</span>
                  </DropdownMenuItem>
               </DropdownMenuContent>
            </DropdownMenu>
         </div>
      </>
   )
}
export default TestimonialCardActions
