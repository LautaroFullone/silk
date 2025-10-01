import { useMutation, useQueryClient } from '@tanstack/react-query'
import { updateTestimonial } from '@services/testimonials.service'
import { extractErrorData } from '@utils/extractErrorDetails'
import { queriesKeys } from '@config/reactQueryKeys'
import { routesConfig } from '@config/routesConfig'
import { useNavigate } from 'react-router-dom'
import { toast } from 'sonner'

const useUpdateTestimonial = () => {
   const navigate = useNavigate()
   const queryClient = useQueryClient()

   const { mutateAsync: updateTestimonialMutate, isPending } = useMutation({
      mutationFn: updateTestimonial,
      onSuccess: ({ message, testimonial }) => {
         if (message === 'No hay cambios para aplicar') {
            toast.info(message)
         } else {
            toast.success(message)

            // Actualizar el cache de la lista de testimonios
            queryClient.invalidateQueries({ queryKey: [queriesKeys.FETCH_TESTIMONIALS] })
            // queryClient.invalidateQueries({
            //    queryKey: [queriesKeys.FETCH_TESTIMONIAL, testimonial.id],
            // })

            // Actualizar el cache del testimonio actualizado
            queryClient.setQueryData([queriesKeys.FETCH_TESTIMONIAL, testimonial.id], {
               message,
               testimonial,
            })

            navigate(routesConfig.ADMIN_TESTIMONIAL_LIST)
         }
      },
      onError: (error) => {
         if (error?.message === 'Network Error') return
         const { message } = extractErrorData(error)

         toast.error(message, {
            id: `error-${queriesKeys.UPDATE_TESTIMONIAL}`,
         })
      },
   })

   return { updateTestimonialMutate, isPending }
}

export default useUpdateTestimonial
