import { Post } from '@models/Post.model'
import { Badge } from '@shadcn'
import { ChevronRight } from 'lucide-react'
import { Link } from 'react-router-dom'

interface PostCardProps {
   post: Post
}

const PostCard: React.FC<PostCardProps> = ({
   post: { id, date, description, title, image, category },
}) => {
   return (
      <Link to={`/Post/${id}`} className="group">
         <div
            className="bg-secondary border border-secondary rounded-sm shadow-lg 
               transition-all overflow-hidden flex flex-col h-full"
         >
            {/* Barra tipo ventana */}
            <div className="w-full flex items-center px-2 py-2 bg-secondary justify-between">
               <div className="flex space-x-1.5">
                  <span className="block w-2 h-2 bg-gray-400 rounded-full" />
                  <span className="block w-2 h-2 bg-gray-400 rounded-full" />
                  <span className="block w-2 h-2 bg-gray-400 rounded-full" />
               </div>

               {/* <span className="text-sm font-classy-vogue text-white tracking-widest uppercase">
                  {category}
               </span> */}
            </div>

            {/* Contenido */}
            <div className="flex flex-col flex-1 bg-secondary">
               {/* Imagen */}
               {image && (
                  <div className="h-48 overflow-hidden border-b border-secondary">
                     <img
                        src={image}
                        alt={title}
                        className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-200"
                     />
                  </div>
               )}

               {/* Info */}
               <div className="p-5 flex flex-col flex-1 bg-white">
                  <h2 className="text-2xl mb-2 text-secondary font-serif leading-tight">
                     {title}
                  </h2>

                  <div className="flex items-center justify-between gap-2 mb-2">
                     <span className="text-muted-foreground text-sm">{date}</span>
                     <Badge
                        variant="default"
                        className="bg-primary text-white border-none rounded-xs uppercase"
                     >
                        {category}
                     </Badge>

                     {/* <span className="inline-block border border-primary text-primary bg-white px-2 py-0.5 rounded font-semibold text-xs uppercase tracking-wide">
                        {category}
                     </span> */}
                  </div>

                  <p className="text-muted-foreground flex-1 mb-4">{description}</p>

                  <span className="flex items-center gap-1 text-primary font-medium group-hover:underline transition-all mt-auto">
                     Leer más <ChevronRight size={16} />
                  </span>
               </div>
            </div>
         </div>
      </Link>
   )
   // return (
   //    <Link to={`/Post/${id}`} className="group">
   //       <div className="rounded-sm shadow-sm bg-white hover:shadow-lg transition-all overflow-hidden flex flex-col h-full">
   //          {image && (
   //             <div className="h-48 overflow-hidden">
   //                <img
   //                   src={image}
   //                   alt={title}
   //                   className="h-full object-cover group-hover:scale-105 transition-transform duration-200"
   //                />
   //             </div>
   //          )}
   //          <div className="p-5 flex flex-col flex-1">
   //             <h2 className="text-xl font-bold mb-2 text-primary transition-colors">
   //                {title}
   //             </h2>
   //             <div className="text-gray-400 text-xs mb-3">{date}</div>
   //             <p className="text-gray-700 flex-1 mb-3">{description}</p>
   //             <span className="text-green-900 font-medium group-hover:underline transition-all">
   //                Leer más →
   //             </span>
   //          </div>
   //       </div>
   //    </Link>
   // )
}
export default PostCard
