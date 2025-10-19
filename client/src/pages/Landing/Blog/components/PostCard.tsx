import { getPublicImageUrl } from '@utils/getPublicImage'
import { ChevronRight } from 'lucide-react'
import { Badge, Skeleton } from '@shadcn'
import { Post } from '@models/Post.model'
import { Link } from 'react-router-dom'
import { routesConfig } from '@config/routesConfig'

interface PostCardProps {
   post: Post
}

const PostCard = ({
   post: { id, date, description, title, imageFilePath, category },
}: PostCardProps) => {
   return (
      <Link to={routesConfig.CLIENT_BLOG_POST.replace(':postId', id)} className="group">
         <div
            className="bg-silk-secondary border border-silk-secondary rounded-md shadow-lg 
               transition-all overflow-hidden flex flex-col h-full"
         >
            {/* Barra tipo ventana */}
            <div className="w-full flex items-center px-2 py-2 bg-silk-secondary justify-between">
               <div className="flex space-x-1.5">
                  <span className="block w-2 h-2 bg-gray-400 rounded-full" />
                  <span className="block w-2 h-2 bg-gray-400 rounded-full" />
                  <span className="block w-2 h-2 bg-gray-400 rounded-full" />
               </div>
            </div>

            {/* Contenido */}
            <div className="flex flex-col flex-1 bg-silk-secondary">
               {/* Imagen */}
               {imageFilePath && (
                  <div className="relative h-48 overflow-hidden border-b border-silk-secondary">
                     <img
                        alt={title}
                        src={getPublicImageUrl(imageFilePath)}
                        className="h-full w-full object-cover group-hover:scale-110 transition-transform duration-300"
                     />
                     <div className="absolute inset-0 bg-silk-secondary/0 group-hover:bg-silk-secondary/20 transition-colors duration-300"></div>
                  </div>
               )}

               {/* Info */}
               <div className="p-5 flex flex-col flex-1 bg-white">
                  <h2 className="text-2xl mb-2 text-silk-secondary font-serif leading-tight">
                     {title}
                  </h2>

                  <div className="flex items-center justify-between gap-2 mb-2">
                     <span className="text-muted-foreground text-sm">{date}</span>
                     <Badge
                        variant="default"
                        className="bg-silk-primary text-white border-none rounded-xs uppercase"
                     >
                        {category.name}
                     </Badge>

                     {/* <span className="inline-block border border-silk-primary text-silk-primary bg-white px-2 py-0.5 rounded font-semibold text-xs uppercase tracking-wide">
                        {category}
                     </span> */}
                  </div>

                  <p className="text-muted-foreground flex-1 mb-4">{description}</p>

                  <span className="flex items-center gap-1 text-silk-primary font-medium group-hover:underline transition-all mt-auto">
                     Leer más <ChevronRight size={16} />
                  </span>
               </div>
            </div>
         </div>
      </Link>
   )
}

PostCard.Skeleton = function PostCardSkeleton() {
   return (
      <div className="group">
         <div
            className="border border-silk-secondary rounded-md shadow-lg 
               transition-all overflow-hidden flex flex-col h-full"
         >
            {/* Barra tipo ventana */}
            <div className="w-full flex items-center px-2 py-2 bg-silk-secondary justify-between">
               <div className="flex space-x-1.5">
                  <span className="block w-2 h-2 bg-gray-400 rounded-full" />
                  <span className="block w-2 h-2 bg-gray-400 rounded-full" />
                  <span className="block w-2 h-2 bg-gray-400 rounded-full" />
               </div>
            </div>

            {/* Contenido */}
            <div className="flex flex-col flex-1">
               {/* Skeleton de la imagen */}
               <div className="h-48 overflow-hidden border-b">
                  <Skeleton className="h-full w-full rounded-b-none" />
               </div>

               {/* Skeleton del contenido */}
               <div className="p-5 flex flex-col flex-1 bg-white">
                  {/* Skeleton del título */}
                  <div className="mb-2">
                     <Skeleton className="h-7 w-full mb-1" />
                     <Skeleton className="h-7 w-3/4" />
                  </div>

                  {/* Skeleton de fecha y categoría */}
                  <div className="flex items-center justify-between gap-2 mb-2">
                     <Skeleton className="h-4 w-20" />
                     <Skeleton className="h-5 w-16 rounded-xs" />
                  </div>

                  {/* Skeleton de la descripción */}
                  <div className="flex-1 mb-4 space-y-2">
                     <Skeleton className="h-4 w-full" />
                     <Skeleton className="h-4 w-full" />
                     <Skeleton className="h-4 w-2/3" />
                  </div>

                  {/* Skeleton del "Leer más" */}
                  <div className="mt-auto">
                     <Skeleton className="h-5 w-20" />
                  </div>
               </div>
            </div>
         </div>
      </div>
   )
}

export default PostCard
