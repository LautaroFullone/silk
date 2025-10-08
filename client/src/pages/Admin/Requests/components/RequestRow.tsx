import { Badge, Button, Skeleton, TableCell, TableRow } from '@shadcn'
import RequestStatusHandler from './RequestStatusHandler'
import { ServiceRequest } from '@models/Request.model'
import { Eye, SquarePen, Trash2 } from 'lucide-react'
import { RequestStatusBadge } from '@shared'

interface RequestRowProps {
   request: ServiceRequest
   onEdit: (status: ServiceRequest['status']) => void
   onDelete: (request: ServiceRequest) => void
}

const RequestRow = ({ request, onEdit, onDelete }: RequestRowProps) => (
   <TableRow>
      <TableCell className="text-sm">
         {new Date(request.createdAt).toLocaleDateString('es-ES')}
      </TableCell>

      <TableCell className="font-medium">
         <div className="text-sm">{request.name}</div>
         <div className="text-xs text-muted-foreground">
            {request.age} {request.age === 1 ? 'año' : 'años'}
         </div>
      </TableCell>

      <TableCell>
         <div className="text-sm">{request.email}</div>
         <div className="text-xs text-muted-foreground">{request.phone}</div>
      </TableCell>

      <TableCell>
         <div className="flex flex-col space-y-1">
            <Badge
               variant="outline"
               className=" border-silk-primary-200 bg-silk-primary-100 text-silk-primary-800 rounded-sm"
            >
               {request.service}
            </Badge>
         </div>
      </TableCell>

      <TableCell className="font-medium">{request.budget}</TableCell>

      <TableCell>
         <RequestStatusBadge status={request.status} />
      </TableCell>

      <TableCell align="right" className="space-x-2">
         <Button variant="ghost" size="sm">
            <Eye className="size-4" />
            Ver
         </Button>

         <RequestStatusHandler
            request={request}
            trigger={
               <Button variant="outline" size="sm">
                  <SquarePen className="size-4" />
                  Editar
               </Button>
            }
            onStatusChange={onEdit}
         />

         <Button
            variant="outline"
            size="sm"
            className="text-destructive!"
            onClick={() => onDelete(request)}
         >
            <Trash2 className="size-4" />
            Eliminar
         </Button>
      </TableCell>
   </TableRow>
)

//TODO: mejorar skeleton
RequestRow.Skeleton = function RequestRowSkeleton() {
   return (
      <TableRow>
         <TableCell>
            <Skeleton className="h-5 w-22" />
         </TableCell>
         <TableCell>
            <Skeleton className="h-5 w-20" />
         </TableCell>
         <TableCell>
            <Skeleton className="h-6 w-20 mr-4" />
         </TableCell>
         <TableCell>
            <Skeleton className="h-5 w-12" />
         </TableCell>
         <TableCell>
            <Skeleton className="h-5 w-20" />
         </TableCell>
         <TableCell>
            <Skeleton className="h-5 w-20" />
         </TableCell>
         <TableCell>
            <Skeleton className="h-5 w-20" />
         </TableCell>
      </TableRow>
   )
}

export default RequestRow
