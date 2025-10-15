import { getPublicImageUrl } from '@utils/getPublicImage'
import { ChevronRight } from 'lucide-react'
import { Post } from '@models/Post.model'
import { Link } from 'react-router-dom'
import { Badge } from '@shadcn'

interface PostCardProps {
   post: Post
}

const PostCard: React.FC<PostCardProps> = ({
   post: { id, date, description, title, imageFilePath, category },
}) => {
   return (
      <Link to={`/post/${id}`} className="group">
         <div
            className="bg-silk-secondary border border-silk-secondary rounded-sm shadow-lg 
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
                  <div className="h-48 overflow-hidden border-b border-silk-secondary">
                     <img
                        alt={title}
                        src={getPublicImageUrl(imageFilePath)}
                        className="h-full w-full object-cover group-hover:scale-110 transition-transform duration-300"
                     />
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
export default PostCard
