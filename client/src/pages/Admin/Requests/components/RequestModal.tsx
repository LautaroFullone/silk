import { Mail, Phone, MapPin, Calendar, DollarSign, Clock, Sparkles } from 'lucide-react'
import { requestStatusConfig } from '@config/requestStatusConfig'
import { formatRelativeTime } from '@utils/formatRelativeTime'
import { formatDateToShow } from '@utils/formatDateToShow'
import RequestStatusHandler from './RequestStatusHandler'
import { ServiceRequest } from '@models/Request.model'
import { useFetchRequestDetails } from '@hooks'
import { RequestStatusBadge } from '@shared'
import {
   Card,
   CardContent,
   CardHeader,
   CardTitle,
   cn,
   Dialog,
   DialogContent,
   DialogDescription,
   DialogHeader,
   DialogTitle,
   Skeleton,
} from '@shadcn'

interface RequestModalProps {
   isOpen: boolean
   requestId: ServiceRequest['id']
   onClose: () => void
   onEdit: (status: ServiceRequest['status']) => void
}

const RequestModal: React.FC<RequestModalProps> = ({
   isOpen,
   requestId,
   onClose,
   onEdit,
}) => {
   const { request, isLoading } = useFetchRequestDetails({ requestId })

   return (
      <Dialog open={isOpen} onOpenChange={(open) => open || onClose()}>
         <DialogContent className="max-w-5xl max-h-[90vh] overflow-hidden bg-gray-50">
            <DialogHeader className="gap-0">
               <DialogTitle className="font-bold text-2xl">
                  Detalles de la Solicitud
               </DialogTitle>

               <DialogDescription asChild>
                  <div>
                     Solicitud ID:{' '}
                     {isLoading ? (
                        <Skeleton className="inline-block h-3 w-44" />
                     ) : (
                        <span className="italic">{request?.id}</span>
                     )}
                  </div>
               </DialogDescription>
            </DialogHeader>

            <div className="space-y-4 overflow-y-auto max-h-[70dvh]">
               <RequestHeader isLoading={isLoading} request={request} onEdit={onEdit} />
               <RequestSummary isLoading={isLoading} request={request} />
               <RequestTimeline isLoading={isLoading} request={request} />
            </div>
         </DialogContent>
      </Dialog>
   )
}

interface ContentProps {
   request: ServiceRequest | null
   isLoading: boolean
   onEdit?: (status: ServiceRequest['status']) => void
}

const RequestHeader: React.FC<ContentProps> = ({ isLoading, request, onEdit }) => {
   if (isLoading) {
      return (
         <div className="bg-white border border-gray-200 rounded-md p-6 shadow-sm">
            <div className="flex items-start justify-between mb-4">
               <div className="flex items-center gap-4">
                  <Skeleton className="w-16 h-16 rounded-full" />
                  <div>
                     <Skeleton className="h-8 w-48 mb-2" />
                     <Skeleton className="h-4 w-24" />
                  </div>
               </div>
               <div className="flex items-center gap-3">
                  <Skeleton className="h-5 w-18 rounded-full" />
                  <Skeleton className="h-5 w-5" />
               </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
               {Array.from({ length: 4 }).map((_, i) => (
                  <div key={i} className="flex items-center gap-2">
                     <Skeleton className="size-4 rounded" />
                     <div>
                        <Skeleton className="h-4 w-12 mb-1" />
                        <Skeleton className="h-5 w-24" />
                     </div>
                  </div>
               ))}
            </div>
         </div>
      )
   }

   return (
      <div className="bg-emerald-50 border rounded-md p-6 shadow-xs">
         {/* Mobile: Status Badge y Handler arriba del nombre */}
         <div className="flex sm:hidden items-center justify-end gap-3 mb-4">
            {request?.status && <RequestStatusBadge status={request.status} />}
            {request && (
               <RequestStatusHandler request={request} onStatusChange={onEdit!} />
            )}
         </div>

         <div className="flex items-start justify-between mb-4">
            <div className="flex items-center gap-4">
               <div className="shrink-0 size-16 bg-gradient-to-br from-emerald-500 to-emerald-800 text-white rounded-full flex items-center justify-center font-serif text-3xl shadow-lg uppercase">
                  {request?.name.charAt(0)}
               </div>

               <div>
                  <h3 className="text-2xl font-serif font-bold text-silk-secondary">
                     {request?.name}
                  </h3>
                  <p className="text-sm text-muted-foreground font-medium">
                     {formatRelativeTime(request?.createdAt)}
                  </p>
               </div>
            </div>

            {/* Desktop: Status Badge y Handler a la derecha */}
            <div className="hidden sm:flex items-center gap-3 ">
               {request?.status && <RequestStatusBadge status={request.status} />}
               {request && (
                  <RequestStatusHandler request={request} onStatusChange={onEdit!} />
               )}
            </div>
         </div>

         <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
            <div className="flex items-center gap-2">
               <Mail className="w-4 h-4 text-emerald-600" />
               <div>
                  <p className="text-xs text-gray-500 font-medium">Email</p>
                  <p className="text-sm font-semibold text-silk-secondary truncate">
                     {request?.email}
                  </p>
               </div>
            </div>

            <div className="flex items-center gap-2">
               <Phone className="w-4 h-4 text-emerald-600" />
               <div>
                  <p className="text-xs text-gray-500 font-medium">Teléfono</p>
                  <p className="text-sm font-semibold text-silk-secondary">
                     {request?.phone}
                  </p>
               </div>
            </div>

            <div className="flex items-center gap-2">
               <MapPin className="w-4 h-4 text-emerald-600" />
               <div>
                  <p className="text-xs text-gray-500 font-medium">Ubicación</p>
                  <p className="text-sm font-semibold text-silk-secondary">
                     {request?.ubication}
                  </p>
               </div>
            </div>

            <div className="flex items-center gap-2">
               <Calendar className="w-4 h-4 text-emerald-600" />
               <div>
                  <p className="text-xs text-gray-500 font-medium">Fecha</p>
                  <p className="text-sm font-semibold text-silk-secondary">
                     {formatDateToShow(request?.createdAt, 'date')}
                  </p>
               </div>
            </div>
         </div>
      </div>
   )
}

const RequestSummary: React.FC<ContentProps> = ({ isLoading, request }) => {
   if (isLoading) {
      return (
         <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {Array.from({ length: 3 }).map((_, i) => (
               <div key={i} className="rounded-lg border bg-card p-4">
                  <Skeleton className="h-4 w-32 mb-3" />
                  <div className="flex items-center gap-2">
                     <Skeleton className="w-4 h-4" />
                     <Skeleton className="h-4 w-24" />
                  </div>
               </div>
            ))}
         </div>
      )
   }

   return (
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
         <div className="rounded-lg border bg-card p-4">
            <div className="flex items-center justify-between">
               <span className="text-xs font-medium text-gray-500">
                  Servicio solicitado
               </span>
            </div>
            <div className="mt-3 flex items-center gap-2">
               <Sparkles className="w-4 h-4 text-emerald-600" />
               <p className="text-sm font-semibold text-gray-900">{request?.service}</p>
            </div>
         </div>

         <div className="rounded-lg border bg-card p-4">
            <div className="flex items-center justify-between">
               <span className="text-xs font-medium text-gray-500">
                  Presupuesto cliente
               </span>
            </div>
            <div className="mt-3 flex items-center gap-2">
               <DollarSign className="w-4 h-4 text-emerald-600" />
               <p className="text-sm font-semibold text-gray-900">{request?.budget}</p>
            </div>
         </div>

         <div className="rounded-lg border bg-card p-4">
            <div className="flex items-center justify-between">
               <span className="text-xs font-medium text-gray-500">Inicio deseado</span>
            </div>
            <div className="mt-3 flex items-center gap-2">
               <Calendar className="w-4 h-4 text-emerald-600" />
               <p className="text-sm font-semibold text-gray-900">
                  {request?.startMoment === 'now'
                     ? 'Inmediatamente'
                     : request?.startMoment === 'next-month'
                     ? 'El próximo mes'
                     : request?.startMoment === 'to-agree'
                     ? 'A convenir'
                     : request?.startMoment}
               </p>
            </div>
         </div>
      </div>
   )
}

const RequestTimeline: React.FC<ContentProps> = ({ isLoading, request }) => {
   if (isLoading) {
      return (
         <Card className="border bg-card">
            <CardHeader className="pb-4">
               <CardTitle className="text-lg flex items-center gap-2">
                  <Clock className="w-5 h-5 text-emerald-600" />
                  Timeline de la Solicitud
               </CardTitle>
            </CardHeader>

            <CardContent>
               <div className="relative">
                  {Array.from({ length: 2 }).map((_, i) => (
                     <div key={i} className="relative flex items-start gap-3 pb-4">
                        {/* Línea vertical en loading */}
                        {i < 1 && (
                           <div className="absolute left-1 top-6 bottom-0 w-0.5 bg-gray-200 opacity-60" />
                        )}

                        {/* Bullet point skeleton */}
                        <div className="relative z-10 mt-1">
                           <Skeleton className="size-2.5 rounded-full border border-white shadow-sm" />
                        </div>

                        {/* Contenido skeleton */}
                        <div className="flex-1 min-w-0">
                           <div className="p-3 bg-white rounded-md border border-gray-100">
                              <div className="flex items-start justify-between gap-2 mb-1">
                                 <Skeleton className="h-4 w-32" />
                                 <Skeleton className="h-4 w-32" />
                              </div>
                              <Skeleton className="h-3 w-48" />
                           </div>
                        </div>
                     </div>
                  ))}
               </div>
            </CardContent>
         </Card>
      )
   }

   return (
      <Card className="border bg-card">
         <CardHeader className="pb-4">
            <CardTitle className="text-lg flex items-center gap-2">
               <Clock className="w-5 h-5 text-emerald-600" />
               Timeline de la Solicitud
            </CardTitle>
         </CardHeader>

         <CardContent>
            <div className="relative">
               {request?.timeline && request.timeline.length > 0 ? (
                  request.timeline.map((event, index) => {
                     const { timelineColor } = requestStatusConfig[event.type]
                     const isLast = index === request.timeline!.length - 1

                     return (
                        <div
                           key={event.id}
                           className="relative flex items-start gap-3 pb-3"
                        >
                           {/* Línea vertical con degradado sutil */}
                           {!isLast && (
                              <div
                                 className={cn(
                                    'absolute left-1 top-6 bottom-0 w-0.5 opacity-60',
                                    {
                                       'bg-gradient-to-b from-amber-400 to-gray-200':
                                          timelineColor === 'amber',
                                       'bg-gradient-to-b from-indigo-400 to-gray-200':
                                          timelineColor === 'indigo',
                                       'bg-gradient-to-b from-emerald-400 to-gray-200':
                                          timelineColor === 'emerald',
                                       'bg-gradient-to-b from-stone-400 to-stone-200':
                                          timelineColor === 'stone',
                                       'bg-gray-200':
                                          !timelineColor || timelineColor === 'gray',
                                    }
                                 )}
                              />
                           )}

                           {/* Bullet point con anillo sutil */}
                           <div className="relative z-10 mt-1">
                              <div
                                 className={cn(
                                    'size-2.5 rounded-full border border-white shadow-sm',
                                    {
                                       'bg-amber-500': timelineColor === 'amber',
                                       'bg-indigo-500': timelineColor === 'indigo',
                                       'bg-emerald-500': timelineColor === 'emerald',
                                       'bg-stone-500': timelineColor === 'stone',
                                       'bg-gray-500':
                                          !timelineColor || timelineColor === 'gray',
                                    }
                                 )}
                              />
                           </div>

                           {/* Contenido del evento con hover sutil */}
                           <div className="flex-1 min-w-0">
                              <div
                                 className={cn(
                                    'p-3 bg-white rounded-md border transition-all duration-200 hover:shadow-sm',
                                    {
                                       'border-amber-300 hover:border-amber-400':
                                          timelineColor === 'amber',
                                       'border-indigo-300 hover:border-indigo-400':
                                          timelineColor === 'indigo',
                                       'border-emerald-300 hover:border-emerald-400':
                                          timelineColor === 'emerald',
                                       'border-stone-300 hover:border-stone-400':
                                          timelineColor === 'stone',
                                       'border-gray-300 hover:border-gray-400':
                                          !timelineColor || timelineColor === 'gray',
                                    }
                                 )}
                              >
                                 <div className="flex items-start justify-between gap-2 mb-1">
                                    <p className="text-sm font-medium text-silk-secondary">
                                       {event.title}
                                    </p>
                                    <span className="text-xs text-gray-400 font-medium whitespace-nowrap">
                                       {formatDateToShow(event.date, 'full')}
                                    </span>
                                 </div>
                                 <p className="text-xs text-gray-600 leading-relaxed">
                                    {event.description}
                                 </p>
                              </div>
                           </div>
                        </div>
                     )
                  })
               ) : (
                  <p className="text-sm text-gray-500 text-center py-4">
                     No hay eventos en el timeline
                  </p>
               )}
            </div>
         </CardContent>
      </Card>
   )
}

export default RequestModal
