import { requestStatusConfig } from '@config/requestStatusConfig'
import { getValidTransitions } from '@utils/statusTransitions'
import { ServiceRequest } from '@models/Request.model'
import { MoreVertical } from 'lucide-react'
import {
   DropdownMenu,
   DropdownMenuContent,
   DropdownMenuItem,
   DropdownMenuTrigger,
} from '@shadcn'

interface RequestStatusHandlerProps {
   request: ServiceRequest
   trigger?: React.ReactNode
   onStatusChange: (status: ServiceRequest['status']) => void
}

const RequestStatusHandler: React.FC<RequestStatusHandlerProps> = ({
   request,
   trigger,
   onStatusChange,
}) => {
   const validTransitions = getValidTransitions(request.status)
   const hasValidTransitions = validTransitions.length > 0

   return (
      <DropdownMenu>
         <DropdownMenuTrigger asChild disabled={!hasValidTransitions}>
            {trigger ? (
               trigger
            ) : (
               <MoreVertical
                  className={`h-5 w-5 transition-all duration-200 ${
                     hasValidTransitions
                        ? 'cursor-pointer hover:scale-105'
                        : 'cursor-not-allowed opacity-50'
                  }`}
               />
            )}
         </DropdownMenuTrigger>

         <DropdownMenuContent align="end">
            {validTransitions.map((status) => {
               const { label, color, icon: Icon } = requestStatusConfig[status]
               return (
                  <DropdownMenuItem key={status} onClick={() => onStatusChange(status)}>
                     <Icon className={`w-4 h-4 mr-2 ${color} bg-transparent`} />
                     Marcar como {label}
                  </DropdownMenuItem>
               )
            })}

            {/* <DropdownMenuItem
               onClick={() => {}}
               className="text-destructive! hover:bg-red-50!"
            >
               <Trash2 className="w-4 h-4 mr-3 text-destructive" />
               Eliminar solicitud
            </DropdownMenuItem> */}
         </DropdownMenuContent>
      </DropdownMenu>
   )
}
export default RequestStatusHandler
