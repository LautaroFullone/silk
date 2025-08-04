import { ServiceRequest } from '@models/Request.model'
import {
   AlertCircle,
   Calendar,
   CheckCircle,
   CircleDashed,
   CircleDot,
   DollarSign,
   Eye,
   FileText,
   Info,
   Mail,
   MoreVertical,
   Sparkles,
   Trash,
   Trash2,
   User,
   XCircle,
} from 'lucide-react'
import {
   Badge,
   Button,
   Card,
   CardContent,
   DropdownMenu,
   DropdownMenuContent,
   DropdownMenuItem,
   DropdownMenuTrigger,
   Table,
   TableBody,
   TableCell,
   TableHead,
   TableHeader,
   TableRow,
} from '@shadcn'

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
}

const RequestsTable: React.FC<RequestTableProps> = ({ requests }) => {
   const getStatusColor = (status: ServiceRequest['status']) => {
      switch (status) {
         case 'pending':
            return 'bg-amber-100 text-amber-800'
         case 'contacted':
            return 'bg-indigo-100 text-indigo-800'
         case 'completed':
            return 'bg-emerald-100 text-emerald-800'
         case 'cancelled':
            return 'bg-stone-100 text-stone-800'
         default:
            return 'bg-gray-100 text-gray-800'
      }
   }

   const getStatusBanner = (status: ServiceRequest['status']) => {
      switch (status) {
         case 'pending':
            return (
               <Badge className={getStatusColor(status)}>
                  <AlertCircle className="w-4 h-4 mr-1 text-amber-600" />
                  Pendiente
               </Badge>
            )
         case 'contacted':
            return (
               <Badge className={getStatusColor(status)}>
                  <CircleDot className="w-4 h-4 mr-1 text-blue-600" />
                  Contactado
               </Badge>
            )
         case 'completed':
            return (
               <Badge className={getStatusColor(status)}>
                  <CheckCircle className="w-4 h-4 mr-1 text-emerald-600" />
                  Completado
               </Badge>
            )
         case 'cancelled':
            return (
               <Badge className={getStatusColor(status)}>
                  <XCircle className="w-4 h-4 mr-1 text-muted-foreground" />
                  Cancelado
               </Badge>
            )
         default:
            return (
               <Badge className={getStatusColor(status)}>
                  <AlertCircle className="w-4 h-4 mr-1 text-amber-600" />
                  Indefinido
               </Badge>
            )
      }
   }

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
                           <div className="font-medium text-secondary">
                              {request.name}
                           </div>
                           <div className="text-sm text-muted-foreground">
                              {request.id}
                           </div>
                        </TableCell>

                        <TableCell>
                           <div className="text-sm text-secondary">{request.email}</div>
                           <div className="text-xs text-muted-foreground">
                              {request.phone}
                           </div>
                        </TableCell>

                        <TableCell>
                           <div className="text-sm text-secondary">
                              {new Date(request.date).toLocaleDateString('es-ES')}
                           </div>
                        </TableCell>

                        <TableCell>
                           <div className="flex flex-col space-y-1">
                              {request.services.slice(0, 2).map((service, index) => (
                                 <Badge
                                    key={index}
                                    variant="outline"
                                    className="text-secondary border-gray-200 bg-accent rounded-sm"
                                 >
                                    {service}
                                 </Badge>
                              ))}

                              {request.services.length > 2 && (
                                 <Badge
                                    variant="outline"
                                    className="text-secondary border-gray-200 bg-accent rounded-sm"
                                 >
                                    +{request.services.length - 2} más
                                 </Badge>
                              )}
                           </div>
                        </TableCell>

                        <TableCell>{request.budget}</TableCell>

                        <TableCell>
                           {getStatusBanner(request.status as ServiceRequest['status'])}
                        </TableCell>

                        <TableCell>
                           <div className="flex gap-1">
                              <div className="flex space-x-3">
                                 <FileText className="w-5 h-5 cursor-pointer" />

                                 <DropdownMenu>
                                    <DropdownMenuTrigger asChild>
                                       {/* <Button
                                       variant="outline"
                                       size="sm"
                                       className="p-2 bg-transparent"
                                       title="Cambiar estado"
                                    >
                                       <MoreVertical className="w-4 h-4" />
                                    </Button> */}

                                       <MoreVertical className="h-5 w-5 cursor-pointer" />
                                    </DropdownMenuTrigger>

                                    <DropdownMenuContent align="end">
                                       <DropdownMenuItem
                                          disabled={request.status === 'pending'}
                                          onClick={() => {}}
                                       >
                                          <AlertCircle className="w-4 h-4 mr-2 text-amber-600" />
                                          Marcar como Pendiente
                                       </DropdownMenuItem>

                                       <DropdownMenuItem
                                          disabled={request.status === 'contacted'}
                                          onClick={() => {}}
                                       >
                                          <CircleDot className="w-4 h-4 mr-2 text-blue-600" />
                                          Marcar como Contactado
                                       </DropdownMenuItem>

                                       <DropdownMenuItem
                                          disabled={request.status === 'completed'}
                                          onClick={() => {}}
                                       >
                                          <CheckCircle className="w-4 h-4 mr-2 text-emerald-600" />
                                          Marcar como Completado
                                       </DropdownMenuItem>

                                       <DropdownMenuItem
                                          disabled={request.status === 'cancelled'}
                                          onClick={() => {}}
                                       >
                                          <XCircle className="w-4 h-4 mr-2 text-muted-foreground" />
                                          Marcar como Cancelado
                                       </DropdownMenuItem>

                                       <DropdownMenuItem
                                          onClick={() => {}}
                                          className="text-destructive! hover:bg-red-50!"
                                       >
                                          <Trash2 className="w-4 h-4 mr-3 text-destructive" />
                                          Eliminar solicitud
                                       </DropdownMenuItem>
                                    </DropdownMenuContent>
                                 </DropdownMenu>
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
