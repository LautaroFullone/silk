import { X, type LucideIcon } from 'lucide-react'

interface EmptyBannerProps {
   title?: string
   description?: string
   icon?: LucideIcon
}

const EmptyBannerLanding: React.FC<EmptyBannerProps> = ({
   title = 'No hay datos',
   description = 'Sin información disponible',
   icon: Icon,
}) => {
   return (
      <div className="bg-white/10 backdrop-blur-sm rounded-lg p-12 border border-silk-secondary/20 text-center">
         {Icon ? (
            <Icon size={80} className="mx-auto text-silk-secondary/60" />
         ) : (
            <X size={80} className="mx-auto text-silk-secondary/60" />
         )}

         <h3 className="font-very-vogue text-3xl text-silk-secondary mt-4 mb-2">
            {title}
         </h3>

         <p className="text-silk-secondary/80">{description}</p>
      </div>
   )
}
export default EmptyBannerLanding
