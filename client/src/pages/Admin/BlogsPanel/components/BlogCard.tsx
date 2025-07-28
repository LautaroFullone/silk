import { Calendar, Edit, Eye, EyeOff, MoreHorizontal, Trash2, User } from 'lucide-react'
import { Button, Card, CardContent } from '@shadcn'
import { Badge } from '@shadcn/badge'
import {
   DropdownMenu,
   DropdownMenuContent,
   DropdownMenuItem,
   DropdownMenuTrigger,
} from '@shadcn/dropdown-menu'
import { useState } from 'react'

interface BlogCardProps {
   id: string
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
   id,
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
      <Card className="overflow-hidden flex flex-col transition-all p-0 cursor-pointer h-45">
         <CardContent className="p-0 flex flex-col h-full">
            <div className="flex h-full">
               <div className="w-48 bg-red-200 flex-shrink-0 overflow-hidden">
                  <img
                     src={image || '/placeholder.svg'}
                     alt={title}
                     className="w-full h-full object-cover"
                  />
               </div>

               <div className="flex-1 p-4 sm:p-6 w-full relative">
                  <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4">
                     <div className="flex-1 pr-12 lg:pr-0">
                        <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3 mb-2">
                           <h3 className="text-lg sm:text-xl font-serif text-gray-900">
                              {title}
                           </h3>
                           <Badge
                              variant={status === 'published' ? 'default' : 'secondary'}
                              className={`${
                                 status === 'published'
                                    ? 'bg-emerald-800 text-white'
                                    : 'bg-gray-500 text-white'
                              }`}
                           >
                              {status === 'published' ? 'Publicado' : 'Borrador'}
                           </Badge>
                        </div>

                        <div className="flex flex-col sm:flex-row sm:items-center text-sm mb-3 gap-2 sm:gap-4 text-gray-600">
                           <div className="flex items-center">
                              <User className="w-4 h-4 mr-1" />
                              <span>{author}</span>
                           </div>
                           <div className="flex items-center">
                              <Calendar className="w-4 h-4 mr-1" />
                              <span>{new Date(date).toLocaleDateString('es-ES')}</span>
                           </div>
                        </div>

                        <p className="text-sm line-clamp-2 text-gray-600">{excerpt}</p>
                     </div>

                     <div className="xl:hidden absolute top-4 right-4">
                        <DropdownMenu
                           open={isDropdownOpen}
                           onOpenChange={setIsDropdownOpen}
                        >
                           <DropdownMenuTrigger asChild>
                              <Button
                                 size="icon"
                                 variant="ghost"
                                 className="h-8 w-8 p-0 "
                              >
                                 <MoreHorizontal className="h-4 w-4" />
                                 <span className="sr-only">Abrir menú</span>
                              </Button>
                           </DropdownMenuTrigger>

                           <DropdownMenuContent align="end" className="xl:hidden">
                              <DropdownMenuItem onClick={() => {}}>
                                 <Edit className="mr-3 h-4 w-4" />
                                 <span className="font-medium  text-gray-500">
                                    Editar
                                 </span>
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

                     <div className="hidden xl:flex gap-2 lg:ml-6">
                        <Button variant="ghost" onClick={() => {}}>
                           <Edit className="w-4 h-4" />
                           <span className="ml-1">Editar</span>
                        </Button>

                        <Button variant="secondary" onClick={() => {}}>
                           {isDisabled ? (
                              <>
                                 <Eye className="w-4 h-4" />
                                 <span className="ml-1">Mostrar post</span>
                              </>
                           ) : (
                              <>
                                 <EyeOff className="w-4 h-4" />
                                 <span className="ml-1">Ocultar post</span>
                              </>
                           )}
                        </Button>

                        <Button
                           variant="destructive"
                           onClick={() => {}}
                           title="Eliminar post"
                        >
                           <Trash2 className="w-4 h-4" />
                           <span className="ml-1">Eliminar</span>
                        </Button>
                     </div>
                  </div>
               </div>
            </div>
         </CardContent>
      </Card>
   )
}
export default BlogCard
