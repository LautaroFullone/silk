import { Edit, Eye, EyeOff, MoreHorizontal, Trash2 } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { Blog } from '@models/Blog.model'
import { Button } from '@shadcn'
import { useState } from 'react'
import {
   DropdownMenu,
   DropdownMenuContent,
   DropdownMenuItem,
   DropdownMenuTrigger,
} from '@shadcn/dropdown-menu'

interface BlogCardActionsProps {
   idBlog: Blog['id']
   isVisible: Blog['isVisible']
}

const BlogCardActions: React.FC<BlogCardActionsProps> = ({ idBlog, isVisible }) => {
   const navigate = useNavigate()

   const [isDropdownOpen, setIsDropdownOpen] = useState(false)

   return (
      <>
         <div className="flex-shrink-0 hidden lg:flex gap-2">
            <Button variant="ghost" onClick={() => navigate(`/admin/blogs/${idBlog}`)}>
               <Edit className="w-4 h-4" />
            </Button>

            <Button variant="secondary" onClick={() => {}}>
               {isVisible ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
            </Button>

            <Button variant="destructive" onClick={() => {}} title="Eliminar post">
               <Trash2 className="w-4 h-4" />
            </Button>
         </div>

         <div className="flex-shrink-0 flex lg:hidden">
            <DropdownMenu open={isDropdownOpen} onOpenChange={setIsDropdownOpen}>
               <DropdownMenuTrigger asChild>
                  <Button size="icon" variant="ghost" className="h-8 w-8 p-0">
                     <MoreHorizontal className="h-4 w-4" />
                     <span className="sr-only">Abrir menú</span>
                  </Button>
               </DropdownMenuTrigger>

               <DropdownMenuContent align="end">
                  <DropdownMenuItem onClick={() => {}} className="text-accent-foreground">
                     <Edit className="mr-3 h-4 w-4 text-accent-foreground" />
                     <span className="font-medium ">Editar</span>
                  </DropdownMenuItem>

                  <DropdownMenuItem onClick={() => {}} className="text-accent-foreground">
                     <Eye className="mr-3 h-4 w-4 text-accent-foreground" />
                     <span className="font-medium">
                        {isVisible ? 'Ocultar' : 'Mostrar'} post
                     </span>
                  </DropdownMenuItem>

                  <DropdownMenuItem
                     onClick={() => {}}
                     className="text-red-600! hover:bg-red-50"
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
export default BlogCardActions
