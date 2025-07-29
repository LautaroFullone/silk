import { Calendar, Edit, Eye, EyeOff, MoreHorizontal, Trash2, User } from 'lucide-react'
import { Button, Card, CardContent } from '@shadcn'
import { Badge } from '@shadcn/badge'
import { useState } from 'react'
import {
   DropdownMenu,
   DropdownMenuContent,
   DropdownMenuItem,
   DropdownMenuTrigger,
} from '@shadcn/dropdown-menu'

interface BlogCardProps {
   title: string
   author: string
   date: string
   excerpt: string
   content: string
   image: string
   status: string
   category: string
}

const BlogCard: React.FC<BlogCardProps> = ({
   title,
   author,
   date,
   excerpt,
   image,
   status,
}) => {
   const [isDropdownOpen, setIsDropdownOpen] = useState(false)
   const isDisabled = status === 'draft'

   return (
      <Card className="overflow-hidden flex flex-col md:flex-row transition-all p-0 cursor-pointer h-auto md:min-h-45">
         <CardContent className="p-0 flex flex-col md:flex-row h-full w-full">
            {/* Imagen */}
            <div className="w-full md:w-48 h-32 md:h-auto bg-red-200 flex-shrink-0 overflow-hidden">
               <img
                  src={image || '/placeholder.svg'}
                  alt={title}
                  className="w-full h-full object-cover"
               />
            </div>

            {/* Contenido */}
            <div className="p-6 w-full min-w-0 flex flex-col justify-normal md:justify-between">
               {/* Título + Badge + Acciones */}
               <div className="flex items-center gap-2 min-w-0 mb-2">
                  {/* Título: ocupa todo lo que puede, nunca pisa badge ni acciones */}
                  <h3
                     className="flex-1 min-w-0 text-lg sm:text-xl font-serif text-gray-900 truncate"
                     title={title}
                  >
                     {title}
                  </h3>
                  {/* Badge */}
                  <Badge
                     variant={status === 'published' ? 'default' : 'secondary'}
                     className={`flex-shrink-0 ${
                        status === 'published'
                           ? 'bg-emerald-800 text-white'
                           : 'bg-gray-500 text-white'
                     }`}
                  >
                     {status === 'published' ? 'Publicado' : 'Borrador'}
                  </Badge>
                  {/* Acciones (xl+) */}
                  <div className="flex-shrink-0 hidden xl:flex gap-2">
                     <Button variant="ghost" onClick={() => {}}>
                        <Edit className="w-4 h-4" />
                        {/* <span className="ml-1">Editar</span> */}
                     </Button>
                     <Button variant="secondary" onClick={() => {}}>
                        {isDisabled ? (
                           <>
                              <EyeOff className="w-4 h-4" />
                              {/* <span className="ml-1">Mostrar post</span> */}
                           </>
                        ) : (
                           <>
                              <Eye className="w-4 h-4" />
                              {/* <span className="ml-1">Ocultar post</span> */}
                           </>
                        )}
                     </Button>
                     <Button
                        variant="destructive"
                        onClick={() => {}}
                        title="Eliminar post"
                     >
                        <Trash2 className="w-4 h-4" />
                        {/* <span className="ml-1">Eliminar</span> */}
                     </Button>
                  </div>

                  {/* Ellipsis (mobile/tablet) */}
                  <div className="flex-shrink-0 flex xl:hidden">
                     <DropdownMenu open={isDropdownOpen} onOpenChange={setIsDropdownOpen}>
                        <DropdownMenuTrigger asChild>
                           <Button size="icon" variant="ghost" className="h-8 w-8 p-0">
                              <MoreHorizontal className="h-4 w-4" />
                              <span className="sr-only">Abrir menú</span>
                           </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                           <DropdownMenuItem onClick={() => {}}>
                              <Edit className="mr-3 h-4 w-4" />
                              <span className="font-medium text-gray-500">Editar</span>
                           </DropdownMenuItem>
                           <DropdownMenuItem onClick={() => {}}>
                              <Eye className="mr-3 h-4 w-4 text-accent-foreground" />
                              <span className="font-medium">
                                 {isDisabled ? 'Mostrar' : 'Ocultar'} post
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
               </div>

               {/* Autor y fecha */}
               <div className="flex flex-wrap items-center text-sm mb-2 gap-4 text-gray-600">
                  <div className="flex items-center">
                     <User className="w-4 h-4 mr-1" />
                     <span className="truncate">{author}</span>
                  </div>
                  <div className="flex items-center">
                     <Calendar className="w-4 h-4 mr-1" />
                     <span>{new Date(date).toLocaleDateString('es-ES')}</span>
                  </div>
               </div>

               {/* Excerpt */}
               <p className="text-sm text-gray-600 line-clamp-2 min-w-0">{excerpt}</p>
            </div>
         </CardContent>
      </Card>
   )
}

export default BlogCard
