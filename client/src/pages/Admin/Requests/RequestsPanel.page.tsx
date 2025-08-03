import useSearchAndSort from '@hooks/useSearchAndSort'
import {
   Badge,
   Button,
   Card,
   CardContent,
   DropdownMenu,
   DropdownMenuContent,
   DropdownMenuItem,
   DropdownMenuTrigger,
   Input,
   Select,
   SelectContent,
   SelectItem,
   SelectTrigger,
   SelectValue,
   Table,
   TableBody,
   TableCell,
   TableHead,
   TableHeader,
   TableRow,
} from '@shadcn'
import AdminTitle from '@shared/AdminTitle'
import {
   AlertCircle,
   ArrowUpDown,
   Calendar,
   CheckCircle,
   ChevronDown,
   ChevronUp,
   DollarSign,
   Eye,
   Hash,
   Loader,
   Mail,
   MoreVertical,
   Sparkles,
   User,
   XCircle,
} from 'lucide-react'
import { useState } from 'react'

interface ServiceRequest {
   id: string
   name: string
   email: string
   phone: string
   age: number
   date: string
   services: string[]
   budget: string
   status: 'pending' | 'contacted' | 'completed' | 'cancelled'
   formData: {
      occupation: string
      location: string
      goals: string
      experience: string
      preferences: string
      availability: string
      additionalInfo: string
   }
}

const mockRequest: ServiceRequest[] = [
   {
      id: 'REQ-001',
      name: 'María González',
      email: 'maria.gonzalez@email.com',
      phone: '+34 612 345 678',
      age: 32,
      date: '2025-01-15',
      services: ['Consultoría de Imagen Ejecutiva', 'Análisis de Color Personal'],
      budget: '500-1000€',
      status: 'pending',
      formData: {
         occupation: 'Directora de Marketing',
         location: 'Madrid, España',
         goals: 'Mejorar mi imagen profesional para presentaciones importantes',
         experience: 'Primera vez con consultoría de imagen',
         preferences: 'Estilo clásico y elegante',
         availability: 'Fines de semana',
         additionalInfo: 'Tengo una presentación importante en 3 semanas',
      },
   },
   {
      id: 'REQ-002',
      name: 'Carlos Rodríguez',
      email: 'carlos.rodriguez@email.com',
      phone: '+34 687 654 321',
      age: 28,
      date: '2025-01-14',
      services: ['Transformación Completa'],
      budget: '1000-2000€',
      status: 'contacted',
      formData: {
         occupation: 'Emprendedor',
         location: 'Barcelona, España',
         goals: 'Cambio completo de imagen para nueva etapa profesional',
         experience: 'He trabajado con estilistas antes',
         preferences: 'Moderno y sofisticado',
         availability: 'Entre semana por las tardes',
         additionalInfo: 'Acabo de fundar mi startup y necesito proyectar confianza',
      },
   },
   {
      id: 'REQ-003',
      name: 'Ana Martínez',
      email: 'ana.martinez@email.com',
      phone: '+34 654 987 321',
      age: 45,
      date: '2025-01-13',
      services: ['Consultoría Virtual'],
      budget: '200-500€',
      status: 'completed',
      formData: {
         occupation: 'Consultora de Negocios',
         location: 'Valencia, España',
         goals: 'Optimizar mi guardarropa actual',
         experience: 'Segunda consultoría',
         preferences: 'Práctico y versátil',
         availability: 'Flexible',
         additionalInfo: 'Trabajo desde casa pero tengo reuniones frecuentes por video',
      },
   },
   {
      id: 'REQ-004',
      name: 'Luis Fernández',
      email: 'luis.fernandez@email.com',
      phone: '+34 698 123 456',
      age: 38,
      date: '2025-01-12',
      services: ['Análisis de Color Personal', 'Consultoría de Imagen Ejecutiva'],
      budget: '800-1200€',
      status: 'pending',
      formData: {
         occupation: 'Abogado',
         location: 'Sevilla, España',
         goals: 'Renovar mi imagen para el bufete',
         experience: 'Nunca he tenido consultoría profesional',
         preferences: 'Conservador pero actual',
         availability: 'Sábados por la mañana',
         additionalInfo: 'Soy socio del bufete y necesito proyectar autoridad',
      },
   },
   {
      id: 'REQ-005',
      name: 'Elena Ruiz',
      email: 'elena.ruiz@email.com',
      phone: '+34 611 222 333',
      age: 29,
      date: '2025-01-11',
      services: ['Análisis de Color Personal'],
      budget: '300-600€',
      status: 'cancelled',
      formData: {
         occupation: 'Diseñadora Gráfica',
         location: 'Bilbao, España',
         goals: 'Encontrar mi paleta de colores perfecta',
         experience: 'Primera consultoría',
         preferences: 'Creativo y único',
         availability: 'Tardes entre semana',
         additionalInfo: 'Trabajo en una agencia creativa',
      },
   },
]

const RequestsPanel = () => {
   const [requests, setRequests] = useState(mockRequest)
   const { searchTerm, setSearchTerm, sortBy, setSortBy, sortOrder, toggleSortOrder } =
      useSearchAndSort<ServiceRequest>({
         data: [],
         searchableFields: ['name', 'email', 'status'],
         sortableFields: ['date', 'name', 'status'],
      })

   const getStatusColor = (status: ServiceRequest['status']) => {
      switch (status) {
         case 'pending':
            return 'bg-yellow-100 text-yellow-800'
         case 'contacted':
            return 'bg-blue-100 text-blue-800'
         case 'completed':
            return 'bg-emerald-100 text-emerald-800'
         case 'cancelled':
            return 'bg-gray-100 text-gray-800'
         default:
            return 'bg-gray-100 text-gray-800'
      }
   }

   const getStatusLabel = (status: ServiceRequest['status']) => {
      switch (status) {
         case 'pending':
            return 'Pendiente'
         case 'contacted':
            return 'Contactado'
         case 'completed':
            return 'Completado'
         case 'cancelled':
            return 'Cancelado'
         default:
            return 'Desconocido'
      }
   }

   const updateRequestStatus = (id: string, newStatus: ServiceRequest['status']) => {
      setRequests(
         requests.map((request) =>
            request.id === id ? { ...request, status: newStatus } : request
         )
      )
   }

   return (
      <>
         <AdminTitle
            title="Gestión de Testimonios"
            description="Crea y administra los testimonios de la web"
         />

         <div className="flex flex-col lg:flex-row gap-4">
            <div className="max-w-2xl w-full">
               <span className="text-sm text-gray-600">Buscador:</span>

               <Input
                  className="w-full"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Filtrar por nombre, rol o estado..."
               />
            </div>

            <div className="flex items-end justify-between lg:justify-normal ">
               <div className="flex items-end gap-2">
                  <div className="flex flex-col">
                     <span className="text-sm text-gray-600 whitespace-nowrap">
                        Ordenar por:
                     </span>

                     <Select
                        value={sortBy}
                        onValueChange={(value: keyof ServiceRequest) => setSortBy(value)}
                     >
                        <SelectTrigger className="sm:w-30">
                           <SelectValue />
                        </SelectTrigger>

                        <SelectContent>
                           <SelectItem value="date">Fecha</SelectItem>
                           <SelectItem value="name">Nombre</SelectItem>
                           <SelectItem value="stauts">Estado</SelectItem>
                        </SelectContent>
                     </Select>
                  </div>

                  <Button
                     variant="outline"
                     onClick={() => toggleSortOrder()}
                     className="flex items-center gap-1 bg-white!"
                  >
                     <ArrowUpDown className="w-4 h-4" />
                     {sortOrder === 'asc' ? (
                        <ChevronUp className="w-3 h-3" />
                     ) : (
                        <ChevronDown className="w-4 h-4" />
                     )}
                  </Button>
               </div>
            </div>
         </div>

         <Card className="p-0 overflow-hidden">
            <CardContent className="p-0">
               <Table>
                  <TableHeader className="bg-gray-100">
                     <TableRow>
                        <TableHead className="font-semibold">
                           <div className="flex items-center gap-2">
                              <User className="w-4 h-4 text-emerald-800" />
                              Nombre
                           </div>
                        </TableHead>

                        <TableHead className="font-semibold">
                           <div className="flex items-center gap-2">
                              <Mail className="w-4 h-4 text-emerald-800" />
                              Email
                           </div>
                        </TableHead>

                        <TableHead className="font-semibold">
                           <div className="flex items-center gap-2">
                              <Calendar className="w-4 h-4 text-emerald-800" />
                              Fecha
                           </div>
                        </TableHead>

                        <TableHead className="font-semibold">
                           <div className="flex items-center gap-2">
                              <Sparkles className="w-4 h-4 text-emerald-800" />
                              Servicios
                           </div>
                        </TableHead>

                        <TableHead className="font-semibold">
                           <div className="flex items-center gap-2">
                              <DollarSign className="w-4 h-4 text-emerald-800" />
                              Presupuesto
                           </div>
                        </TableHead>

                        <TableHead className="font-semibold">Estado</TableHead>

                        <TableHead className="font-semibold">Acciones</TableHead>
                     </TableRow>
                  </TableHeader>

                  <TableBody>
                     {mockRequest.map((request) => (
                        <TableRow key={request.id} className="hover:bg-gray-50">
                           <TableCell>
                              <div>
                                 <div className="font-medium text-gray-900">
                                    {request.name}
                                 </div>
                                 <div className="text-sm text-gray-500">{request.id}</div>
                              </div>
                           </TableCell>

                           <TableCell>
                              <div className="text-sm text-gray-900">{request.email}</div>
                              <div className="text-xs text-gray-500">{request.phone}</div>
                           </TableCell>

                           <TableCell>
                              <div className="text-sm text-gray-900">
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
                                    <Badge variant="outline" className="text-xs">
                                       +{request.services.length - 2} más
                                    </Badge>
                                 )}
                              </div>
                           </TableCell>

                           <TableCell>{request.budget}</TableCell>

                           <TableCell>
                              <Badge
                                 className={getStatusColor(
                                    request.status as ServiceRequest['status']
                                 )}
                              >
                                 {getStatusLabel(
                                    request.status as ServiceRequest['status']
                                 )}
                              </Badge>
                           </TableCell>
                           <TableCell>
                              <div className="flex gap-1">
                                 <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={() => {}}
                                    className="p-2"
                                    title="Ver detalles"
                                 >
                                    <Eye className="w-4 h-4" />
                                 </Button>

                                 <DropdownMenu>
                                    <DropdownMenuTrigger asChild>
                                       <Button
                                          variant="outline"
                                          size="sm"
                                          className="p-2 bg-transparent"
                                          title="Cambiar estado"
                                       >
                                          <MoreVertical className="w-4 h-4" />
                                       </Button>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent align="end">
                                       <DropdownMenuItem
                                          onClick={() =>
                                             updateRequestStatus(request.id, 'pending')
                                          }
                                       >
                                          <AlertCircle className="w-4 h-4 mr-2 text-yellow-600" />
                                          Marcar como Pendiente
                                       </DropdownMenuItem>
                                       <DropdownMenuItem
                                          onClick={() =>
                                             updateRequestStatus(request.id, 'contacted')
                                          }
                                       >
                                          <Loader className="w-4 h-4 mr-2 text-blue-600" />
                                          Marcar como Contactado
                                       </DropdownMenuItem>
                                       <DropdownMenuItem
                                          onClick={() =>
                                             updateRequestStatus(request.id, 'completed')
                                          }
                                       >
                                          <CheckCircle className="w-4 h-4 mr-2 text-emerald-600" />
                                          Marcar como Completado
                                       </DropdownMenuItem>
                                       <DropdownMenuItem
                                          onClick={() =>
                                             updateRequestStatus(request.id, 'cancelled')
                                          }
                                       >
                                          <XCircle className="w-4 h-4 mr-2 text-gray-600" />
                                          Marcar como Cancelado
                                       </DropdownMenuItem>
                                    </DropdownMenuContent>
                                 </DropdownMenu>
                              </div>
                           </TableCell>
                        </TableRow>
                     ))}
                  </TableBody>
               </Table>
            </CardContent>
         </Card>
      </>
   )
}
export default RequestsPanel
