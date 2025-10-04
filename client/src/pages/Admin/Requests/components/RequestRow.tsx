import { Badge, Button, Skeleton, TableCell, TableRow } from '@shadcn'
import { ServiceRequest } from '@models/Request.model'
import { Eye, FileText, SquarePen, Trash2 } from 'lucide-react'
import { RequestStatusBadge } from '@shared'
import RequestStatusHandler from './RequestStatusHandler'

interface RequestRowProps {
   request: ServiceRequest
   onEdit: (request: Request) => void
   onDelete: (request: Request) => void
}

const RequestRow = ({ request, onEdit, onDelete }: RequestRowProps) => (
   <TableRow>
      {/* <TableCell className="font-medium">{request.name}</TableCell> */}
      <TableCell>
         <div className="font-medium text-silk-secondary">{request.name}</div>

         <div className="text-sm text-muted-foreground">{request.id}</div>
      </TableCell>

      {/* <TableCell>{request.email}</TableCell> */}
      <TableCell>
         <div className="text-sm text-silk-secondary">{request.email}</div>
         <div className="text-xs text-muted-foreground">{request.phone}</div>
      </TableCell>

      {/* <TableCell>{request.createdAt}</TableCell> */}
      <TableCell>
         <div className="text-sm text-silk-secondary">
            {new Date(request.createdAt).toLocaleDateString('es-ES')}
         </div>
      </TableCell>

      <TableCell>
         <div className="flex flex-col space-y-1">
            {request.services.slice(0, 3).map((service, index) => (
               <Badge
                  key={index}
                  variant="outline"
                  className="text-silk-secondary border-gray-200 bg-accent rounded-sm"
               >
                  {service}
               </Badge>
            ))}

            {request.services.length > 3 && (
               <Badge
                  variant="outline"
                  className="text-silk-secondary border-gray-200 bg-accent rounded-sm"
               >
                  +{request.services.length - 2} más
               </Badge>
            )}
         </div>
      </TableCell>

      <TableCell>{request.budget}</TableCell>

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
            onStatusChange={(status) => {
               console.log('# onStatusChange: ', status)
            }}
         />

         <Button variant="outline" size="sm" className="text-destructive!">
            <Trash2 className="size-4" />
            Eliminar
         </Button>
      </TableCell>
   </TableRow>
)

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
