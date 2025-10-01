import { Calendar, Edit, MoreVertical, Trash2, User } from 'lucide-react'
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
            'overflow-hidden flex flex-col md:flex-row transition-all p-0 hover:shadow-md cursor-pointer h-auto',
            post.isActive
               ? 'border-l-6 border-l-emerald-700'
               : 'border-l-6 border-l-gray-600'
         )}
      >
         <CardContent className="p-0 flex flex-col md:flex-row h-full w-full cursor-default">
            <div className="w-full md:w-48 h-32 md:h-40 flex-shrink-0 overflow-hidden relative">
               <img
                  alt={post.title}
                  className="w-full h-full object-cover"
                  src={getPublicImageUrl(post.image)}
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

            <div className="p-6 w-full min-w-0 flex flex-col">
               <div className="flex items-center gap-2 min-w-0">
                  <h3
                     className="flex-1 min-w-0 text-xl font-serif text-silk-secondary truncate"
                     title={post.title}
                  >
                     {post.title}
                  </h3>

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

               <div className="flex flex-wrap items-center text-sm mb-2 gap-x-4 gap-y-2 text-muted-foreground">
                  <div className="flex items-center">
                     <User className="w-4 h-4 mr-1" />
                     <span className="truncate">{post.author}</span>
                  </div>

                  <div className="flex items-center">
                     <Calendar className="w-4 h-4 mr-1" />
                     <span>{new Date(post.date).toLocaleDateString('es-ES')}</span>
                  </div>

                  {/* <Badge
                     variant="default"
                     className={
                        'bg-emerald-800 text-white uppercase rounded-xs border-none'
                     }
                  >
                     {category}
                  </Badge> */}
                  <Badge
                     variant="outline"
                     className="text-silk-secondary border-gray-200 bg-accent rounded-sm uppercase"
                  >
                     {post.category}
                  </Badge>
               </div>

               <p className="text-sm text-muted-foreground line-clamp-2 min-w-0">
                  {post.description}
               </p>
            </div>
         </CardContent>
      </Card>
   )
}

PostCard.Skeleton = function PostCardSkeleton() {
   return (
      <Card className="overflow-hidden flex flex-col md:flex-row transition-all p-0 h-auto md:45">
         <div className="p-0 flex flex-col md:flex-row h-full w-full">
            {/* Skeleton de la imagen */}
            <div className="w-full md:w-48 h-32 md:h-40 flex-shrink-0 overflow-hidden relative">
               <Skeleton className="w-full h-full" />

               {/* Skeleton del badge */}
               <div className="absolute top-2 left-2">
                  <Skeleton className="h-6 w-20 rounded-full" />
               </div>
            </div>

            {/* Skeleton del contenido */}
            <div className="p-6 w-full min-w-0 flex flex-col">
               <div className="flex items-center gap-2 min-w-0 mb-4">
                  {/* Skeleton del título */}
                  <div className="flex-1 min-w-0">
                     <Skeleton className="h-6 max-w-48" />
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
               <div className="flex flex-wrap items-center mb-2 gap-x-4 gap-y-2 ">
                  <Skeleton className="h-4 w-24" />

                  <Skeleton className="h-4 w-20" />

                  <Skeleton className="h-4 w-16 rounded-sm" />
               </div>

               {/* Skeleton de la descripción */}
               <div className="space-y-2">
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-3/4" />
               </div>
            </div>
         </div>
      </Card>
   )
}

export default PostCard
