import { ArrowLeft } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

interface AdminTitleProps {
   title: string
   description: string
   hasGoBack?: boolean
   goBackRoute?: string
}
const AdminTitle: React.FC<AdminTitleProps> = ({
   title,
   description,
   hasGoBack = false,
   goBackRoute,
}) => {
   const navigate = useNavigate()

   return (
      <div className="flex items-center gap-4">
         {hasGoBack && (
            <ArrowLeft
               className="h-6 w-6 cursor-pointer hover:scale-105"
               aria-label="Volver para atrás"
               onClick={() => (goBackRoute ? navigate(goBackRoute) : navigate(-1))}
            />
         )}

         <div>
            <h1 className="text-3xl sm:text-4xl font-serif text-gray-900 mb-2">
               {title}
            </h1>
            <p className="text-sm sm:text-base text-muted-foreground ">{description}</p>
         </div>
      </div>
   )
}
export default AdminTitle
