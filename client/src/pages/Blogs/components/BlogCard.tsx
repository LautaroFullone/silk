import { Link } from 'react-router-dom'

interface BlogCardProps {
   id: string
   title: string
   date: string
   description: string
   imageSrc?: string
}

const BlogCard = ({ id, date, description, title, imageSrc }: BlogCardProps) => {
   return (
      <Link to={`/blog/${id}`} className="group">
         <div className="rounded-sm shadow-sm bg-white hover:shadow-lg transition-all overflow-hidden flex flex-col h-full">
            {imageSrc && (
               <div className="h-48 overflow-hidden">
                  <img
                     src={imageSrc}
                     alt={title}
                     className="h-full object-cover group-hover:scale-105 transition-transform duration-200"
                  />
               </div>
            )}
            <div className="p-5 flex flex-col flex-1">
               <h2 className="text-xl font-bold mb-2 text-primary transition-colors">
                  {title}
               </h2>
               <div className="text-gray-400 text-xs mb-3">{date}</div>
               <p className="text-gray-700 flex-1 mb-3">{description}</p>
               <span className="text-green-900 font-medium group-hover:underline transition-all">
                  Leer más →
               </span>
            </div>
         </div>
      </Link>
   )
}
export default BlogCard
