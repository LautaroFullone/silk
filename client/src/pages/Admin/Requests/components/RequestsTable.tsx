import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@shadcn'
import { ServiceRequest } from '@models/Request.model'
import { useNavigate } from 'react-router-dom'
import { useDeleteRequests } from '@hooks'
import { useState } from 'react'
import RequestRow from './RequestRow'
import { EmptyBanner, Pagination } from '@shared'
import { Calendar, CircleDashed, DollarSign, Mail, Sparkles, User } from 'lucide-react'

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

const tableHeaders = [
   { name: 'Nombre', icon: User },
   { name: 'Email', icon: Mail },
   { name: 'Fecha', icon: Calendar },
   { name: 'Servicios', icon: Sparkles },
   { name: 'Presupuesto', icon: DollarSign },
   { name: 'Estado', icon: CircleDashed },
   { name: '', icon: null },
]

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
   const navigate = useNavigate()
   const [selectedRequest, setSelectedRequest] = useState<ServiceRequest | null>(null)

   const { deleteRequestMutate, isPending } = useDeleteRequests()

   return (
      <>
         <div className="overflow-x-auto">
            <Table className="min-w-full">
               {/* <TableHeader>
                  <TableRow>
                     <TableHead>Nombre</TableHead>
                     <TableHead>Email</TableHead>
                     <TableHead>Fecha</TableHead>
                     <TableHead>Servicios</TableHead>
                     <TableHead className="text-right">Presupuesto</TableHead>
                     <TableHead>Estado</TableHead>
                     <TableHead></TableHead>
                  </TableRow>
               </TableHeader> */}

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
                  {isLoading ? (
                     Array.from({ length: 5 }).map((_, i) => (
                        <RequestRow.Skeleton key={`skeleton-article-${i}`} />
                     ))
                  ) : paginatedRequests.length ? (
                     paginatedRequests.map((request) => (
                        <RequestRow
                           key={request.id}
                           request={request}
                           onEdit={() => console.log('Edit request', request)}
                           onDelete={() => console.log('Delete request', request)}
                        />
                     ))
                  ) : (
                     <TableRow className="hover:bg-background ">
                        <TableCell colSpan={6} className="px-0">
                           <EmptyBanner
                              title="No hay artículos registrados"
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
      </>
   )
}
export default RequestsTable
