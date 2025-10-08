import RequestStatusHandler from './RequestStatusHandler'
import { ServiceRequest } from '@models/Request.model'
import { RequestStatusBadge } from '@shared'
import {
   Card,
   CardContent,
   CardHeader,
   CardTitle,
   Dialog,
   DialogContent,
   DialogDescription,
   DialogHeader,
   DialogTitle,
   ScrollArea,
} from '@shadcn'
import {
   Mail,
   Phone,
   MapPin,
   Calendar,
   DollarSign,
   Clock,
   FileText,
   Sparkles,
} from 'lucide-react'

interface RequestModalProps {
   isOpen: boolean
   request: ServiceRequest | null
   onClose: () => void
   onEdit: (status: ServiceRequest['status']) => void
}

const RequestModal: React.FC<RequestModalProps> = ({
   isOpen,
   request,
   onClose,
   onEdit,
}) => {
   if (!request) return

   return (
      <Dialog open={isOpen} onOpenChange={(open) => open || onClose()}>
         <DialogContent className="max-w-5xl max-h-[90vh] overflow-hidden bg-gray-50">
            <DialogHeader className="gap-0">
               <DialogTitle className="text-2xl font-serif">
                  Detalles de la Solicitud
               </DialogTitle>

               <DialogDescription>{`Solicitud ${request.id}`}</DialogDescription>
            </DialogHeader>

            <ScrollArea className="h-[600px]">
               <div className="space-y-6">
                  {/* Header con información principal */}
                  <div className="bg-gradient-to-r from-emerald-100 via-emerald-100 to-teal-100 rounded-md p-6 ">
                     <div className="flex items-start justify-between mb-4">
                        <div className="flex items-center gap-4">
                           <div className="w-16 h-16 bg-emerald-600 text-white rounded-full flex items-center justify-center font-serif text-3xl shadow-md">
                              {request.name.charAt(0)}
                           </div>

                           <div>
                              <h3 className="text-2xl font-serif font-bold text-silk-secondary">
                                 {request.name}
                              </h3>
                              <p className="text-sm text-muted-foreground font-medium">
                                 Hace 4 dias
                              </p>
                           </div>
                        </div>

                        <div className="flex items-center gap-3">
                           <RequestStatusBadge status={request.status} />

                           <RequestStatusHandler
                              request={request}
                              onStatusChange={onEdit}
                           />
                        </div>
                     </div>

                     {/* Información de contacto rápida */}
                     <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        <div className="flex items-center gap-2">
                           <Mail className="w-4 h-4 text-emerald-600" />

                           <div>
                              <p className="text-xs text-gray-500 font-medium">Email</p>
                              <p className="text-sm font-semibold text-silk-secondary truncate">
                                 {request.email}
                              </p>
                           </div>
                        </div>

                        <div className="flex items-center gap-2">
                           <Phone className="w-4 h-4 text-emerald-600" />

                           <div>
                              <p className="text-xs text-gray-500 font-medium">
                                 Teléfono
                              </p>
                              <p className="text-sm font-semibold text-silk-secondary">
                                 {request.phone}
                              </p>
                           </div>
                        </div>

                        <div className="flex items-center gap-2">
                           <MapPin className="w-4 h-4 text-emerald-600" />

                           <div>
                              <p className="text-xs text-gray-500 font-medium">
                                 Ubicación
                              </p>
                              <p className="text-sm font-semibold text-silk-secondary">
                                 {request.ubication}
                              </p>
                           </div>
                        </div>

                        <div className="flex items-center gap-2">
                           <Calendar className="w-4 h-4 text-emerald-600" />
                           <div>
                              <p className="text-xs text-gray-500 font-medium">Fecha</p>
                              <p className="text-sm font-semibold text-silk-secondary">
                                 {new Date(request.createdAt).toLocaleDateString('es-ES')}
                              </p>
                           </div>
                        </div>
                     </div>
                  </div>

                  {/* Resumen compacto */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                     {/* Tipo de servicio */}
                     <div className="rounded-lg border border-gray-100 bg-white p-4">
                        <div className="flex items-center justify-between">
                           <span className="text-xs font-medium text-gray-500">
                              Servicio/s elegido
                           </span>
                        </div>
                        <div className="mt-3 flex items-center gap-2">
                           <Sparkles className="w-4 h-4 text-emerald-600" />
                           <p className="text-sm font-semibold text-gray-900">
                              {request.service}
                           </p>
                        </div>
                     </div>

                     {/* Presupuesto */}
                     <div className="rounded-lg border border-gray-100 bg-white p-4">
                        <div className="flex items-center justify-between">
                           <span className="text-xs font-medium text-gray-500">
                              Presupuesto cliente
                           </span>
                        </div>

                        <div className="mt-3 flex items-center gap-2">
                           <DollarSign className="w-4 h-4 text-emerald-600" />
                           <p className="text-sm font-semibold text-gray-900">
                              {request.budget}
                           </p>
                        </div>
                     </div>

                     {/* Inicio deseado */}
                     <div className="rounded-lg border border-gray-100 bg-white p-4">
                        <div className="flex items-center justify-between">
                           <span className="text-xs font-medium text-gray-500">
                              Inicio deseado
                           </span>
                        </div>

                        <div className="mt-3 flex items-center gap-2">
                           <Calendar className="w-4 h-4 text-emerald-600" />
                           <p className="text-sm font-semibold text-gray-900">
                              {request.startMoment === 'now'
                                 ? 'Inmediatamente'
                                 : request.startMoment === 'next-month'
                                 ? 'El próximo mes'
                                 : request.startMoment === 'to-agree'
                                 ? 'A convenir'
                                 : request.startMoment}
                           </p>
                        </div>
                     </div>
                  </div>

                  {/* Información adicional si existe */}
                  <Card className="shadow-sm border-0 bg-gradient-to-br from-white to-gray-50">
                     <CardHeader className="pb-4">
                        <CardTitle className="text-lg flex items-center gap-2">
                           <FileText className="w-5 h-5 text-emerald-600" />
                           Información Adicional
                        </CardTitle>
                     </CardHeader>
                     <CardContent>
                        <div className="bg-white rounded-md p-4 border border-gray-100">
                           <p className="text-sm text-silk-secondary leading-relaxed">
                              Algo de texto que puede enviar el cliente
                           </p>
                        </div>
                     </CardContent>
                  </Card>

                  {/* Timeline de acciones */}
                  <Card className="shadow-sm border-0 bg-gradient-to-br from-white to-gray-50">
                     <CardHeader className="pb-4">
                        <CardTitle className="text-lg flex items-center gap-2">
                           <Clock className="w-5 h-5 text-emerald-600" />
                           Timeline de la Solicitud
                        </CardTitle>
                     </CardHeader>

                     <CardContent>
                        <div className="space-y-3">
                           {request.timeline && request.timeline.length > 0 ? (
                              request.timeline.map((event) => (
                                 <div
                                    key={event.id}
                                    className="flex items-center gap-3 p-3 bg-white rounded-md border border-gray-100"
                                 >
                                    <div
                                       className={`w-2 h-2 rounded-full ${
                                          event.type === 'PENDING'
                                             ? 'bg-emerald-500'
                                             : event.type === 'CONTACTED'
                                             ? 'bg-blue-500'
                                             : event.type === 'CONTRACTED'
                                             ? 'bg-green-600'
                                             : event.type === 'CANCELLED'
                                             ? 'bg-red-500'
                                             : event.type === 'CUSTOM'
                                             ? 'bg-purple-500'
                                             : 'bg-gray-400'
                                       }`}
                                    />

                                    <div className="flex-1">
                                       <p className="text-sm font-medium text-silk-secondary">
                                          {event.title}
                                       </p>

                                       <p className="text-xs text-gray-500">
                                          {new Date(event.date).toLocaleDateString(
                                             'es-ES'
                                          )}{' '}
                                          - {event.description}
                                       </p>
                                    </div>
                                 </div>
                              ))
                           ) : (
                              // Fallback para solicitudes sin timeline
                              <>
                                 <div className="flex items-center gap-3 p-3 bg-white rounded-md border border-gray-100">
                                    <div className="w-2 h-2 bg-emerald-500 rounded-full"></div>
                                    <div className="flex-1">
                                       <p className="text-sm font-medium text-silk-secondary">
                                          Solicitud recibida
                                       </p>
                                       <p className="text-xs text-gray-500">
                                          {new Date(request.createdAt).toLocaleDateString(
                                             'es-ES'
                                          )}{' '}
                                          - Formulario completado
                                       </p>
                                    </div>
                                 </div>

                                 {request.status !== 'PENDING' && (
                                    <div className="flex items-center gap-3 p-3 bg-white rounded-md border border-gray-100">
                                       <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                                       <div className="flex-1">
                                          <p className="text-sm font-medium text-silk-secondary">
                                             Cliente contactado
                                          </p>
                                          <p className="text-xs text-gray-500">
                                             Primer contacto realizado
                                          </p>
                                       </div>
                                    </div>
                                 )}

                                 {request.status === 'CONTRACTED' && (
                                    <div className="flex items-center gap-3 p-3 bg-white rounded-md border border-gray-100">
                                       <div className="w-2 h-2 bg-emerald-500 rounded-full"></div>
                                       <div className="flex-1">
                                          <p className="text-sm font-medium text-silk-secondary">
                                             Servicio completado
                                          </p>
                                          <p className="text-xs text-gray-500">
                                             Consultoría finalizada exitosamente
                                          </p>
                                       </div>
                                    </div>
                                 )}
                              </>
                           )}
                        </div>
                     </CardContent>
                  </Card>
               </div>
            </ScrollArea>
         </DialogContent>
      </Dialog>
   )
}

export default RequestModal
