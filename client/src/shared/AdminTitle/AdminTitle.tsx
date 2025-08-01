import { ArrowLeft } from 'lucide-react'

interface AdminTitleProps {
   title: string
   description: string
   hasGoBack?: boolean
}
const AdminTitle: React.FC<AdminTitleProps> = ({
   title,
   description,
   hasGoBack = false,
}) => {
   return (
      <div className="flex items-center gap-4">
         {hasGoBack && (
            <ArrowLeft
               className="cursor-pointer h-6 w-6"
               aria-label="Volver para atrás"
            />
         )}

         <div>
            <h1 className="text-4xl font-serif text-gray-900 mb-2">{title}</h1>
            <p className="text-muted-foreground">{description}</p>
         </div>
      </div>
   )
}
export default AdminTitle
