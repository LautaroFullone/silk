import { Badge, Tooltip, TooltipContent, TooltipTrigger } from '@shadcn'
import { requestStatusConfig } from '@config/requestStatusConfig'
import { RequestStatus } from '@models/Request.model'

interface RequestStatusBadgeProps {
   status: RequestStatus
   disableTooltip?: boolean
   tooltipSide?: 'top' | 'right' | 'bottom' | 'left'
   tooltipAlign?: 'start' | 'center' | 'end'
}

const RequestStatusBadge: React.FC<RequestStatusBadgeProps> = ({
   status,
   disableTooltip,
   tooltipSide = 'top',
   tooltipAlign = 'center',
}) => {
   const { label, description, color, icon: Icon } = requestStatusConfig[status]

   // Si el tooltip está deshabilitado, solo mostrar el badge
   if (disableTooltip) {
      return (
         <Badge className={color}>
            <Icon className="size-4!" />
            {label}
         </Badge>
      )
   }

   // Si el tooltip está habilitado, envolver badge con Tooltip
   return (
      <Tooltip>
         <TooltipTrigger asChild>
            <Badge className={color}>
               <Icon className="size-4!" />
               {label}
            </Badge>
         </TooltipTrigger>

         <TooltipContent side={tooltipSide} align={tooltipAlign}>
            <p className="text-sm">{description}</p>
         </TooltipContent>
      </Tooltip>
   )
}

export default RequestStatusBadge
