import { ServiceRequest } from '@models/Request.model'
import {
   Calendar,
   CircleDashed,
   DollarSign,
   FileText,
   Mail,
   Sparkles,
   User,
} from 'lucide-react'
import {
   Badge,
   Card,
   CardContent,
   Table,
   TableBody,
   TableCell,
   TableHead,
   TableHeader,
   TableRow,
} from '@shadcn'
import RequestStatusHandler from './RequestStatusHandler'
import useRequests from '@hooks/useRequests'

const tableHeaders = [
   { name: 'Nombre', icon: User },
   { name: 'Email', icon: Mail },
   { name: 'Fecha', icon: Calendar },
   { name: 'Servicios', icon: Sparkles },
   { name: 'Presupuesto', icon: DollarSign },
   { name: 'Estado', icon: CircleDashed },
   { name: '', icon: null },
]

interface RequestTableProps {
   requests: ServiceRequest[]
   onSelectRequest: (request: ServiceRequest) => void
}

const RequestsTable: React.FC<RequestTableProps> = ({ requests, onSelectRequest }) => {
   const { getStatusBanner } = useRequests()

   return (
      <Card className="p-0 overflow-hidden">
         <CardContent className="p-0">
            <Table>
               <TableHeader className="bg-gray-100">
                  <TableRow>
                     {tableHeaders.map((head, index) => (
                        <TableHead
                           key={`table-head-{${index}}`}
                           className="font-semibold"
                        >
                           <div className="flex items-center gap-2">
                              {head.icon && (
                                 <head.icon className="w-4 h-4 text-emerald-800" />
                              )}

                              {head.name}
                           </div>
                        </TableHead>
                     ))}
                  </TableRow>
               </TableHeader>

               <TableBody>
                  {requests.map((request) => (
                     <TableRow key={request.id} className="hover:bg-gray-50">
                        <TableCell>
                           <div className="font-medium text-silk-secondary">
                              {request.name}
                           </div>

                           <div className="text-sm text-muted-foreground">
                              {request.id}
                           </div>
                        </TableCell>

                        <TableCell>
                           <div className="text-sm text-silk-secondary">
                              {request.email}
                           </div>
                           <div className="text-xs text-muted-foreground">
                              {request.phone}
                           </div>
                        </TableCell>

                        <TableCell>
                           <div className="text-sm text-silk-secondary">
                              {new Date(request.date).toLocaleDateString('es-ES')}
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

                        <TableCell>{getStatusBanner(request.status)}</TableCell>

                        <TableCell>
                           <div className="flex gap-1">
                              <div className="flex space-x-3">
                                 <FileText
                                    onClick={() => onSelectRequest(request)}
                                    className="w-5 h-5 cursor-pointer transition-all duration-200 hover:scale-105"
                                 />

                                 <RequestStatusHandler
                                    request={request}
                                    onStatusChange={(status) => {
                                       console.log('# onStatusChange: ', status)
                                    }}
                                 />
                              </div>
                           </div>
                        </TableCell>
                     </TableRow>
                  ))}
               </TableBody>
            </Table>
         </CardContent>
      </Card>
   )
}
export default RequestsTable
