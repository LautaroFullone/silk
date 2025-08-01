import { Card, CardContent, Badge } from '@shadcn'
import { Calendar, User } from 'lucide-react'
import { Post } from '@models/Post.model'
import PostCardActions from './PostCardActions'

interface PostCardProps {
   post: Post
}

const PostCard: React.FC<PostCardProps> = ({
   post: { id, title, author, date, description, isVisible, image },
}) => {
   return (
      <Card className="overflow-hidden flex flex-col md:flex-row transition-all p-0 shadow-md cursor-pointer h-auto md:45">
         <CardContent className="p-0 flex flex-col md:flex-row h-full w-full cursor-default">
            <div className="w-full md:w-48 h-32 md:h-40 flex-shrink-0 overflow-hidden">
               <img
                  src={image || '/placeholder.svg'}
                  alt={title}
                  className="w-full h-full object-cover"
               />
            </div>

            <div className="p-6 w-full min-w-0 flex flex-col">
               <div className="flex items-center gap-2 min-w-0">
                  <h3
                     className="flex-1 min-w-0 text-xl font-serif text-gray-900 truncate"
                     title={title}
                  >
                     {title}
                  </h3>

                  <PostCardActions idPost={id} isVisible={isVisible} />
               </div>

               <div className="flex flex-wrap items-center text-sm mb-2 gap-4 text-gray-600">
                  <div className="flex items-center">
                     <User className="w-4 h-4 mr-1" />
                     <span className="truncate">{author}</span>
                  </div>

                  <div className="flex items-center">
                     <Calendar className="w-4 h-4 mr-1" />
                     <span>{new Date(date).toLocaleDateString('es-ES')}</span>
                  </div>

                  <Badge
                     variant={isVisible ? 'default' : 'secondary'}
                     className={
                        isVisible ? 'bg-emerald-800 text-white' : 'bg-gray-500 text-white'
                     }
                  >
                     {isVisible ? 'Publicado' : 'Borrador'}
                  </Badge>
               </div>

               <p className="text-sm text-gray-500 line-clamp-2 min-w-0">{description}</p>
            </div>
         </CardContent>
      </Card>
   )
}

export default PostCard
