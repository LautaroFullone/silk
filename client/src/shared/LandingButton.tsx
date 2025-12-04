import { Button } from '@shadcn'
import { ChevronRight } from 'lucide-react'

interface LandingButtonProps {
   label: string
   variant?: 'primary' | 'secondary' | 'tertiary'
   onClick: () => void
}

const LandingButton: React.FC<LandingButtonProps> = ({
   label,
   variant = 'primary',
   onClick,
}) => {
   return (
      <Button
         variant={variant}
         onClick={onClick}
         size="xl"
         className="group relative overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300"
      >
         <span className="relative z-10 flex items-center">
            {label}
            <ChevronRight
               className="ml-2 group-hover:translate-x-1 transition-transform duration-200"
               size={19}
            />
         </span>
         <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
      </Button>
   )
}
export default LandingButton
