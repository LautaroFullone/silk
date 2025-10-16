import { useMutation, useQueryClient } from '@tanstack/react-query'
import { deleteTestimonial } from '@services/testimonials.service'
import { extractErrorData } from '@utils/extractErrorDetails'
import { queriesKeys } from '@config/reactQueryKeys'
import { toast } from 'sonner'

function useDeleteTestimonial() {
   const queryClient = useQueryClient()

   const { mutateAsync: deleteTestimonialMutate, isPending } = useMutation({
      mutationFn: deleteTestimonial,
      onSuccess: ({ message }) => {
         toast.success(message)

         // Invalidar todas las queries de testimonios (tanto onlyActive true como false)
         queryClient.invalidateQueries({
            queryKey: [queriesKeys.FETCH_TESTIMONIALS],
         })
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
