import { Button, Card, CardContent } from '@shadcn'
import { Badge } from '@shadcn/badge'
import {
   DropdownMenu,
   DropdownMenuContent,
   DropdownMenuItem,
   DropdownMenuTrigger,
} from '@shadcn/dropdown-menu'
import { Calendar, Edit, Eye, MoreHorizontal, Trash, Trash2, User } from 'lucide-react'

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
   const isDisabled = status === 'draft'

   return (
      // <Card
      //    className={`overflow-hidden transition-all p-0 cursor-pointer ${
      //       isDisabled ? 'opacity-60 bg-gray-50 ' : 'opacity-100 bg-white '
      //    }`}
      // >
      <Card className="overflow-hidden flex flex-col h-full transition-all p-0 cursor-pointer bg-white">
         <CardContent className="p-0 flex flex-col h-full">
            <div className="flex h-full">
               <div className="w-48 h-48 bg-red-200 flex-shrink-0 overflow-hidden">
                  <img
                     src={image || '/placeholder.svg'}
                     alt={title}
                     className="w-full h-full object-cover"
                  />
               </div>

               <div className="flex-1 p-4 sm:p-6 w-full relative">
                  {/* Mobile/Tablet Actions - positioned at top right */}
                  <div className="xl:hidden absolute top-4 right-4">
                     <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                           <Button
                              variant="outline"
                              size="sm"
                              className="h-8 w-8 p-0 bg-white shadow-sm"
                           >
                              <MoreHorizontal className="h-4 w-4" />
                              <span className="sr-only">Abrir menú</span>
                           </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="w-48">
                           <DropdownMenuItem onClick={() => {}}>
                              <Edit className="mr-2 h-4 w-4" />
                              <span>Editar</span>
                           </DropdownMenuItem>
                           <DropdownMenuItem>
                              <Eye className="mr-2 h-4 w-4" />
                              <span>Ver</span>
                           </DropdownMenuItem>
                           <DropdownMenuItem
                              onClick={() => {}}
                              className={
                                 status === 'draft' ? 'text-green-600' : 'text-orange-600'
                              }
                           >
                              <Eye className="mr-2 h-4 w-4" />
                              <span>
                                 {status === 'published' ? 'Desactivar' : 'Activar'}
                              </span>
                           </DropdownMenuItem>
                           <DropdownMenuItem
                              onClick={() => {}}
                              className="text-red-600 focus:text-red-600"
                           >
                              <Trash2 className="mr-2 h-4 w-4" />
                              <span>Eliminar</span>
                           </DropdownMenuItem>
                        </DropdownMenuContent>
                     </DropdownMenu>
                  </div>

                  <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4">
                     <div className="flex-1 pr-12 lg:pr-0">
                        {/* Title and Status */}
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

                        {/* Author and Date */}
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

                        {/* Excerpt */}
                        <p className="text-sm line-clamp-2 text-gray-600">{excerpt}</p>
                     </div>

                     {/* Desktop Actions - visible on large screens */}
                     <div className="hidden xl:flex gap-2 lg:ml-6">
                        <Button variant="outline" onClick={() => {}} title="Editar post">
                           <Edit className="w-4 h-4" />
                           <span className="ml-1">Editar</span>
                        </Button>

                        <Button
                           variant="outline"
                           onClick={() => {}}
                           className="text-red-600 hover:text-red-700"
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
