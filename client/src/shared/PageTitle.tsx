import { routesConfig } from '@config/routesConfig'
import { useNavigate } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'

interface PageTitleProps {
   title: string
   description?: string
   hasGoBack?: boolean
   goBackRoute?: keyof typeof routesConfig
}

const PageTitle: React.FC<PageTitleProps> = ({
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
               onClick={() =>
                  goBackRoute ? navigate(routesConfig[goBackRoute]) : navigate(-1)
               }
            />
         )}

         <div>
            <h1 className="text-silk-secondary font-bold text-3xl mb-2">{title}</h1>
            {description && (
               <p className="text-sm sm:text-base text-muted-foreground">{description}</p>
            )}
         </div>
      </div>
   )
}
export default PageTitle
