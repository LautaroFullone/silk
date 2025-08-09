import { ServiceRequest } from '@models/Request.model'
import { MoreVertical, Trash2 } from 'lucide-react'
import useRequests from '@hooks/useRequests'
import {
   DropdownMenu,
   DropdownMenuContent,
   DropdownMenuItem,
   DropdownMenuTrigger,
} from '@shadcn'

interface RequestStatusHandlerProps {
   request: ServiceRequest
   onStatusChange: (status: ServiceRequest['status']) => void
}

const RequestStatusHandler: React.FC<RequestStatusHandlerProps> = ({
   request,
   onStatusChange,
}) => {
   const { statusConfig } = useRequests()

   return (
      <DropdownMenu>
         <DropdownMenuTrigger asChild>
            <MoreVertical className="h-5 w-5 cursor-pointer transition-all duration-200 hover:scale-105" />
         </DropdownMenuTrigger>

         <DropdownMenuContent align="end">
            {Object.entries(statusConfig).map(
               ([status, { label, icon: Icon, itemColor }]) => (
                  <DropdownMenuItem
                     key={status}
                     disabled={request.status === status}
                     onClick={() => onStatusChange(status as ServiceRequest['status'])}
                  >
                     <Icon className={`w-4 h-4 mr-2 ${itemColor} bg-transparent`} />
                     Marcar como {label}
                  </DropdownMenuItem>
               )
            )}

            <DropdownMenuItem
               onClick={() => {}}
               className="text-destructive! hover:bg-red-50!"
            >
               <Trash2 className="w-4 h-4 mr-3 text-destructive" />
               Eliminar solicitud
            </DropdownMenuItem>
         </DropdownMenuContent>
      </DropdownMenu>
   )
}
export default RequestStatusHandler
