import { ConfirmActionModal, EmptyBanner, Pagination } from '@shared'
import { Testimonial } from '@models/Testimonial.model'
import { routesConfig } from '@config/routesConfig'
import TestimonialCard from './TestimonialCard'
import { useNavigate } from 'react-router-dom'
import { useDeleteTestimonial } from '@hooks'
import { Trash2 } from 'lucide-react'
import { useState } from 'react'

interface TestimonialsTableProps {
   paginatedTestimonials: Testimonial[]
   isLoading: boolean
   currentPage: number
   totalPages: number
   canGoNext: boolean
   canGoPrevious: boolean
   onPageChange: (page: number) => void
   emptyMessage: string
}

const TestimonialsTable: React.FC<TestimonialsTableProps> = ({
   paginatedTestimonials,
   isLoading,
   currentPage,
   totalPages,
   canGoNext,
   canGoPrevious,
   onPageChange,
   emptyMessage,
}) => {
   const navigate = useNavigate()
   const [selectedTestimonial, setSelectedTestimonial] = useState<Testimonial | null>(
      null
   )

   const { deleteTestimonialMutate, isPending } = useDeleteTestimonial()

   return (
      <>
         <div className="grid grid-cols-1 lg:grid-cols-2 2xl:grid-cols-3 gap-4">
            {isLoading ? (
               Array.from({ length: 5 }).map((_, i) => (
                  <TestimonialCard.Skeleton key={`skeleton-testimonial-${i}`} />
               ))
            ) : paginatedTestimonials.length ? (
               paginatedTestimonials.map((testimonial) => (
                  <TestimonialCard
                     key={`testimonial-card-${testimonial.id}`}
                     testimonial={testimonial}
                     onEdit={(testimonial) =>
                        navigate(
                           routesConfig.ADMIN_TESTIMONIAL_EDIT.replace(
                              ':testimonialId',
                              testimonial.id
                           )
                        )
                     }
                     onDelete={setSelectedTestimonial}
                  />
               ))
            ) : (
               <div className="col-span-full">
                  <EmptyBanner
                     title="No hay testimonios registrados"
                     description={emptyMessage}
                  />
               </div>
            )}
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

         <ConfirmActionModal
            isOpen={!!selectedTestimonial}
            isLoading={isPending}
            title={
               <>
                  ¿Estás seguro que querés eliminar el testimonio de{' '}
                  <span className="font-semibold">{selectedTestimonial?.personName}</span>
                  ?
               </>
            }
            description="Se eliminará permanentemente el testimonio. Esta acción no se puede deshacer."
            confirmButton={{
               icon: Trash2,
               label: 'Eliminar testimonio',
               loadingLabel: 'Eliminando...',
               variant: 'destructive',
               onConfirm: async () => {
                  await deleteTestimonialMutate(selectedTestimonial!.id)
                  setSelectedTestimonial(null)
               },
            }}
            cancelButton={{
               label: 'No, mantener',
               variant: 'outline',
               onCancel: () => setSelectedTestimonial(null),
            }}
         />
      </>
   )
}
export default TestimonialsTable
