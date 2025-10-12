import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@shadcn'
import { ConfirmActionModal, EmptyBanner, Pagination } from '@shared'
import { checkStatusTransition } from '@utils/statusTransitions'
import { useDeleteRequests, useUpdateRequest } from '@hooks'
import { ServiceRequest } from '@models/Request.model'
import RequestModal from './RequestModal'
import RequestRow from './RequestRow'
import { useState } from 'react'
import {
   Calendar,
   CircleDashed,
   DollarSign,
   Mail,
   Sparkles,
   Trash2,
   User,
} from 'lucide-react'

interface RequestTableProps {
   paginatedRequests: ServiceRequest[]
   isLoading: boolean
   currentPage: number
   totalPages: number
   canGoNext: boolean
   canGoPrevious: boolean
   onPageChange: (page: number) => void
   emptyMessage: string
}

const RequestsTable: React.FC<RequestTableProps> = ({
   paginatedRequests,
   isLoading,
   currentPage,
   totalPages,
   canGoNext,
   canGoPrevious,
   onPageChange,
   emptyMessage,
}) => {
   const [requestSelected, setRequestSelected] = useState<ServiceRequest | null>(null)
   const [requestToDelete, setRequestToDelete] = useState<ServiceRequest | null>(null)

   const { deleteRequestMutate, isPending: isDeletingRequest } = useDeleteRequests()
   const { updateServiceRequestMutate } = useUpdateRequest()

   const handleServiceRequestUpdate = async (
      requestId: ServiceRequest['id'],
      status: ServiceRequest['status']
   ) => {
      const currentRequest = paginatedRequests.find((req) => req.id === requestId)

      if (currentRequest && checkStatusTransition(currentRequest.status, status)) {
         await updateServiceRequestMutate({ requestId, status })
      }
   }

   return (
      <>
         <div className="overflow-x-auto">
            <Table className="min-w-full">
               <TableHeader>
                  <TableRow>
                     <TableHead>
                        <div className="flex items-center gap-2">
                           <Calendar className="w-4 h-4 text-emerald-800" />
                           Fecha
                        </div>
                     </TableHead>

                     <TableHead>
                        <div className="flex items-center gap-2">
                           <User className="w-4 h-4 text-emerald-800" />
                           Persona
                        </div>
                     </TableHead>

                     <TableHead>
                        <div className="flex items-center gap-2">
                           <Mail className="w-4 h-4 text-emerald-800" />
                           Email
                        </div>
                     </TableHead>

                     <TableHead>
                        <div className="flex items-center gap-2">
                           <Sparkles className="w-4 h-4 text-emerald-800" />
                           Servicios
                        </div>
                     </TableHead>

                     <TableHead>
                        <div className="flex items-center gap-2">
                           <DollarSign className="w-4 h-4 text-emerald-800" />
                           Presupuesto
                        </div>
                     </TableHead>

                     <TableHead>
                        <div className="flex items-center gap-2">
                           <CircleDashed className="w-4 h-4 text-emerald-800" />
                           Estado
                        </div>
                     </TableHead>
                     <TableHead className=""></TableHead>
                  </TableRow>
               </TableHeader>

               <TableBody>
                  {isLoading ? (
                     Array.from({ length: 5 }).map((_, i) => (
                        <RequestRow.Skeleton key={`skeleton-request-${i}`} />
                     ))
                  ) : paginatedRequests.length ? (
                     paginatedRequests.map((request) => (
                        <RequestRow
                           key={request.id}
                           request={request}
                           onEdit={async (status) =>
                              await handleServiceRequestUpdate(request.id, status)
                           }
                           onDelete={setRequestToDelete}
                           onSelect={setRequestSelected}
                        />
                     ))
                  ) : (
                     <TableRow className="hover:bg-background ">
                        <TableCell colSpan={7} className="px-0">
                           <EmptyBanner
                              title="No hay solicitudes registradas"
                              description={emptyMessage}
                           />
                        </TableCell>
                     </TableRow>
                  )}
               </TableBody>
            </Table>
         </div>

         {totalPages > 1 && !isLoading && (
            <Pagination
               currentPage={currentPage}
               totalPages={totalPages}
               onPageChange={onPageChange}
               canGoNext={canGoNext}
               canGoPrevious={canGoPrevious}
            />
         )}

         {requestSelected && (
            <RequestModal
               isOpen={!!requestSelected}
               requestId={requestSelected.id}
               onEdit={async (status) =>
                  await handleServiceRequestUpdate(requestSelected.id, status)
               }
               onClose={() => setRequestSelected(null)}
            />
         )}

         <ConfirmActionModal
            isOpen={!!requestToDelete}
            isLoading={isDeletingRequest}
            title={
               <>
                  ¿Estás seguro que querés eliminar la solicitud de{' '}
                  <span className="font-bold">{requestToDelete?.name}</span>?
               </>
            }
            description="Se eliminará permanentemente la solicitud. Esta acción no se puede deshacer."
            confirmButton={{
               icon: Trash2,
               label: 'Eliminar solicitud',
               loadingLabel: 'Eliminando...',
               variant: 'destructive',
               onConfirm: async () => {
                  await deleteRequestMutate(requestToDelete!.id)
                  setRequestToDelete(null)
               },
            }}
            cancelButton={{
               label: 'No, mantener',
               variant: 'outline',
               onCancel: () => setRequestToDelete(null),
            }}
         />
      </>
   )
}
export default RequestsTable
