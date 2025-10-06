import { RequestStatus, ServiceRequest } from '@models/Request.model'
import { requestStatusConfig } from '@config/requestStatusConfig'
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
   return (
      <DropdownMenu>
         <DropdownMenuTrigger asChild>
            {trigger ? (
               trigger
            ) : (
               <MoreVertical className="h-5 w-5 cursor-pointer transition-all duration-200 hover:scale-105" />
            )}
         </DropdownMenuTrigger>

         <DropdownMenuContent align="end">
            {Object.entries(requestStatusConfig).map(
               ([status, { label, color, icon: Icon }]) => (
                  <DropdownMenuItem
                     key={status}
                     disabled={request.status === status}
                     onClick={() => onStatusChange(status as RequestStatus)}
                  >
                     <Icon className={`w-4 h-4 mr-2 ${color} bg-transparent`} />
                     Marcar como {label}
                  </DropdownMenuItem>
               )
            )}

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
