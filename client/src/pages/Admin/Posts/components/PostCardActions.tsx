import { Edit, Eye, EyeOff, MoreVertical, Trash2 } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { Post } from '@models/Post.model'
import { Button } from '@shadcn'
import { useState } from 'react'
import {
   DropdownMenu,
   DropdownMenuContent,
   DropdownMenuItem,
   DropdownMenuTrigger,
} from '@shadcn/dropdown-menu'

interface PostCardActionsProps {
   idPost: Post['id']
   isVisible: Post['isVisible']
}

const PostCardActions: React.FC<PostCardActionsProps> = ({ idPost, isVisible }) => {
   const navigate = useNavigate()

   const [isDropdownOpen, setIsDropdownOpen] = useState(false)

   const goToEdit = () => {
      const params = new URLSearchParams({ id: idPost })
      navigate(`form/?${params}`)
   }

   return (
      <>
         <div className="flex-shrink-0 hidden lg:flex gap-2">
            <Button variant="ghost" onClick={() => goToEdit()}>
               <Edit className="w-4 h-4" />
            </Button>

            <Button
               variant="secondary"
               onClick={() => {}}
               className="border-secondary! bg-white! hover:bg-secondary! group"
            >
               {isVisible ? (
                  <EyeOff className="w-4 h-4 text-secondary group-hover:text-white" />
               ) : (
                  <Eye className="w-4 h-4 text-secondary group-hover:text-white" />
               )}
            </Button>

            <Button
               variant="destructive"
               onClick={() => {}}
               title="Eliminar post"
               className="border-destructive! bg-white! hover:bg-destructive! group"
            >
               <Trash2 className="w-4! h-4! text-destructive group-hover:text-white" />
            </Button>
         </div>

         <div className="flex-shrink-0 flex lg:hidden">
            <DropdownMenu open={isDropdownOpen} onOpenChange={setIsDropdownOpen}>
               <DropdownMenuTrigger asChild>
                  <Button size="icon" variant="ghost" className="h-8 w-8 p-0">
                     <MoreVertical className="h-4 w-4" />
                     <span className="sr-only">Abrir menú</span>
                  </Button>
               </DropdownMenuTrigger>

               <DropdownMenuContent align="end">
                  <DropdownMenuItem onClick={() => goToEdit()} className="text-secondary">
                     <Edit className="mr-3 h-4 w-4 text-secondary" />
                     <span className="font-medium ">Editar</span>
                  </DropdownMenuItem>

                  <DropdownMenuItem onClick={() => {}} className="text-secondary">
                     {isVisible ? (
                        <EyeOff className="mr-3 w-4 h-4 text-secondary" />
                     ) : (
                        <Eye className="w-4 h-4 text-secondary" />
                     )}
                     <span className="font-medium">
                        {isVisible ? 'Ocultar' : 'Mostrar'} post
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
export default PostCardActions
