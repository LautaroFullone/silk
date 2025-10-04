import { deleteTestimonial, getTestimonials } from '@services/testimonials.service'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { extractErrorData } from '@utils/extractErrorDetails'
import { Testimonial } from '@models/Testimonial.model'
import { queriesKeys } from '@config/reactQueryKeys'
import { toast } from 'sonner'

function useDeleteTestimonial() {
   const queryClient = useQueryClient()

   const { mutateAsync: deleteTestimonialMutate, isPending } = useMutation({
      mutationFn: deleteTestimonial,
      onSuccess: ({ message, testimonial }) => {
         toast.success(message)

         //  queryClient.invalidateQueries({ queryKey: [queriesKeys.FETCH_TESTIMONIALS] })

         // Actualizar el caché removiendo el testimonio eliminado
         queryClient.setQueryData(
            [queriesKeys.FETCH_TESTIMONIALS],
            (oldData: Awaited<ReturnType<typeof getTestimonials>>) => {
               if (!oldData) return oldData
               return {
                  ...oldData,
                  testimonials:
                     oldData.testimonials?.filter(
                        (t: Testimonial) => t.id !== testimonial.id
                     ) || [],
               }
            }
         )
      },
      onError: (error) => {
         if (error?.message === 'Network Error') return
         const { message } = extractErrorData(error)

         toast.error(message, {
            id: `error-${queriesKeys.DELETE_TESTIMONIAL}`,
         })
      },
   })

   return { deleteTestimonialMutate, isPending }
}

export default useDeleteTestimonial
