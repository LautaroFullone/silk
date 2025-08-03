import { Card, CardContent, Badge, cn } from '@shadcn'
import PostCardActions from './PostCardActions'
import { Calendar, User } from 'lucide-react'
import { Post } from '@models/Post.model'

interface PostCardProps {
   post: Post
}

const PostCard: React.FC<PostCardProps> = ({
   post: { id, title, author, date, description, isVisible, image, category },
}) => {
   return (
      <Card
         className={cn(
            'overflow-hidden flex flex-col md:flex-row transition-all p-0 hover:shadow-md cursor-pointer h-auto md:45',
            isVisible ? 'border-l-6 border-l-emerald-700' : 'border-l-6 border-l-gray-600'
         )}
      >
         <CardContent className="p-0 flex flex-col md:flex-row h-full w-full cursor-default">
            <div className="w-full md:w-48 h-32 md:h-40 flex-shrink-0 overflow-hidden relative">
               <img
                  src={image || '/placeholder.svg'}
                  alt={title}
                  className="w-full h-full object-cover"
               />

               <div className="absolute top-2 left-2">
                  {isVisible ? (
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
                     className="flex-1 min-w-0 text-xl font-serif text-secondary truncate"
                     title={title}
                  >
                     {title}
                  </h3>

                  <PostCardActions idPost={id} isVisible={isVisible} />
               </div>

               <div className="flex flex-wrap items-center text-sm mb-2 gap-x-4 gap-y-2 text-gray-600">
                  <div className="flex items-center">
                     <User className="w-4 h-4 mr-1" />
                     <span className="truncate">{author}</span>
                  </div>

                  <div className="flex items-center">
                     <Calendar className="w-4 h-4 mr-1" />
                     <span>{new Date(date).toLocaleDateString('es-ES')}</span>
                  </div>

                  <Badge
                     variant="default"
                     className={
                        'bg-emerald-800 text-white uppercase rounded-xs border-none'
                     }
                  >
                     {category}
                  </Badge>
               </div>

               <p className="text-sm text-gray-500 line-clamp-2 min-w-0">{description}</p>
            </div>
         </CardContent>
      </Card>
   )
}

export default PostCard
