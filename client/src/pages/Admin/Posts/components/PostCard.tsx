import { Calendar, Edit, MoreVertical, Trash2, User } from 'lucide-react'
import { formatDateToShow } from '@utils/formatDateToShow'
import { getPublicImageUrl } from '@utils/getPublicImage'
import { Post } from '@models/Post.model'
import { useState } from 'react'
import {
   Card,
   CardContent,
   Badge,
   cn,
   Button,
   DropdownMenu,
   DropdownMenuContent,
   DropdownMenuItem,
   DropdownMenuTrigger,
   Skeleton,
} from '@shadcn'

interface PostCardProps {
   post: Post
   onEdit: (post: Post) => void
   onDelete: (post: Post) => void
}

const PostCard = ({ post, onEdit, onDelete }: PostCardProps) => {
   const [isDropdownOpen, setIsDropdownOpen] = useState(false)

   return (
      <Card
         className={cn(
            'overflow-hidden transition-all p-0 hover:shadow-md cursor-pointer',
            ' md:h-45 flex flex-col md:flex-row',
            post.isActive
               ? 'border-l-6 border-l-emerald-700'
               : 'border-l-6 border-l-gray-600'
         )}
      >
         <CardContent className="p-0 flex flex-col md:flex-row h-full w-full cursor-default">
            {/* Imagen */}
            <div className="relative w-full h-40 md:h-full md:w-48 flex-shrink-0 overflow-hidden">
               <img
                  alt={post.title}
                  className="w-full h-full object-cover"
                  src={getPublicImageUrl(post.imageFilePath)}
                  onError={(e) => {
                     e.currentTarget.src = '/image-placeholder.svg'
                  }}
               />

               <div className="absolute top-2 left-2">
                  {post.isActive ? (
                     <Badge
                        variant="default"
                        className="bg-gradient-to-b from-emerald-600 to-emerald-800 text-white border-none"
                     >
                        Publicado
                     </Badge>
                  ) : (
                     <Badge
                        variant="default"
                        className="bg-gradient-to-b from-gray-500 to-gray-700 text-white border-none"
                     >
                        Borrador
                     </Badge>
                  )}
               </div>
            </div>

            {/* Contenido */}
            <div className="flex-1 p-4 flex flex-col h-40 md:h-full">
               {/* Header con título y acciones */}
               <div className="flex items-start gap-2 mb-3 min-w-0">
                  <div className="flex-1 min-w-0">
                     <h3
                        className="font-very-vogue text-xl md:text-2xl text-silk-secondary line-clamp-2 leading-tight"
                        title={post.title}
                     >
                        {post.title}
                     </h3>
                  </div>

                  {/* Acciones - versión desktop */}
                  <div className="flex-shrink-0 gap-2 hidden lg:flex">
                     <Button variant="ghost" size="sm" onClick={() => onEdit(post)}>
                        <Edit className="size-4" />
                        Editar
                     </Button>

                     <Button
                        variant="outline"
                        size="sm"
                        onClick={() => onDelete(post)}
                        className="text-destructive!"
                     >
                        <Trash2 className="size-4" />
                        Eliminar
                     </Button>
                  </div>

                  {/* Acciones - versión mobile */}
                  <div className="flex-shrink-0 flex lg:hidden">
                     <DropdownMenu open={isDropdownOpen} onOpenChange={setIsDropdownOpen}>
                        <DropdownMenuTrigger asChild>
                           <Button size="icon" variant="ghost" className="h-8 w-8 p-0">
                              <MoreVertical className="h-4 w-4" />
                              <span className="sr-only">Abrir menú</span>
                           </Button>
                        </DropdownMenuTrigger>

                        <DropdownMenuContent align="end">
                           <DropdownMenuItem
                              onClick={() => {
                                 onEdit(post)
                                 setIsDropdownOpen(false)
                              }}
                              className="text-silk-secondary font-normal"
                           >
                              <Edit className="mr-3 h-4 w-4 text-silk-secondary" />
                              Editar
                           </DropdownMenuItem>

                           <DropdownMenuItem
                              onClick={() => {
                                 onDelete(post)
                                 setIsDropdownOpen(false)
                              }}
                              className="text-destructive! hover:bg-red-50!"
                           >
                              <Trash2 className="mr-3 h-4 w-4 text-destructive" />
                              Eliminar
                           </DropdownMenuItem>
                        </DropdownMenuContent>
                     </DropdownMenu>
                  </div>
               </div>

               {/* Metadata */}
               <div className="flex flex-wrap items-center text-xs md:text-sm gap-x-3 gap-y-1 text-muted-foreground mb-2">
                  <div className="flex items-center">
                     <User className="w-3 h-3 md:w-4 md:h-4 mr-1" />
                     <span className="truncate">{post.author}</span>
                  </div>

                  <div className="flex items-center">
                     <Calendar className="w-3 h-3 md:w-4 md:h-4 mr-1" />
                     <span>{formatDateToShow(post.date, 'date')}</span>
                  </div>

                  <Badge
                     variant="outline"
                     className="border-silk-primary-200 bg-silk-primary-100 text-silk-primary-800 rounded-sm text-xs"
                  >
                     {post.category.name}
                  </Badge>
               </div>

               {/* Descripción */}
               <p className="text-sm text-muted-foreground line-clamp-2 flex-1">
                  {post.description}
               </p>
            </div>
         </CardContent>
      </Card>
   )
}

PostCard.Skeleton = function PostCardSkeleton() {
   return (
      <Card className="overflow-hidden transition-all p-0 h-80 md:h-45 flex flex-col md:flex-row">
         <div className="p-0 flex flex-col md:flex-row h-full w-full">
            {/* Skeleton de la imagen */}
            <div className="relative w-full h-40 md:h-full md:w-48 flex-shrink-0 overflow-hidden">
               <Skeleton className="w-full h-full" />

               {/* Skeleton del badge */}
               <div className="absolute top-2 left-2">
                  <Skeleton className="h-6 w-20 rounded-full" />
               </div>
            </div>

            {/* Skeleton del contenido */}
            <div className="flex-1 p-4 flex flex-col h-40 md:h-full">
               {/* Header con título y acciones */}
               <div className="flex items-start gap-2 mb-3">
                  <div className="flex-1">
                     <Skeleton className="h-5 md:h-6 w-full max-w-48" />
                  </div>

                  {/* Skeleton de las acciones - versión desktop */}
                  <div className="flex-shrink-0 gap-2 hidden lg:flex">
                     <Skeleton className="h-8 w-20" />
                     <Skeleton className="h-8 w-24" />
                  </div>

                  {/* Skeleton de las acciones - versión mobile */}
                  <div className="flex-shrink-0 flex lg:hidden">
                     <Skeleton className="h-8 w-8 rounded" />
                  </div>
               </div>

               {/* Skeleton de la metadata */}
               <div className="flex flex-wrap items-center mb-2 gap-x-3 gap-y-1">
                  <Skeleton className="h-3 md:h-4 w-20" />
                  <Skeleton className="h-3 md:h-4 w-16" />
                  <Skeleton className="h-4 w-12 rounded-sm" />
               </div>

               {/* Skeleton de la descripción */}
               <div className="flex-1 space-y-1">
                  <Skeleton className="h-3 md:h-4 w-full" />
                  <Skeleton className="h-3 md:h-4 w-3/4" />
               </div>
            </div>
         </div>
      </Card>
   )
}

export default PostCard
