import { useMutation, useQueryClient } from '@tanstack/react-query'
import { createTestimonial } from '@services/testimonials.service'
import { extractErrorData } from '@utils/extractErrorDetails'
import { queriesKeys } from '@config/reactQueryKeys'
import { toast } from 'sonner'

const useCreateTestimonial = () => {
   const queryClient = useQueryClient()

   const { mutateAsync: createTestimonialMutate, isPending } = useMutation({
      mutationFn: createTestimonial,
      onSuccess: ({ message }) => {
         toast.success(message)

         // queryClient.invalidateQueries({ queryKey: [queriesKeys.FETCH_TESTIMONIALS] })

         // Actualizar el caché agregando el nuevo testimonio
         queryClient.invalidateQueries({ queryKey: [queriesKeys.FETCH_TESTIMONIALS] })
      },
      onError: (error) => {
         if (error?.message === 'Network Error') return
         const { message } = extractErrorData(error)

         toast.error(message, {
            id: `error-${queriesKeys.CREATE_TESTIMONIAL}`,
         })
      },
   })

   return { createTestimonialMutate, isPending }
}

export default useCreateTestimonial
