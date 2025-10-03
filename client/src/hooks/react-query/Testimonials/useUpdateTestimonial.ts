import { useMutation, useQueryClient } from '@tanstack/react-query'
import { updateTestimonial, getTestimonials } from '@services/testimonials.service'
import { extractErrorData } from '@utils/extractErrorDetails'
import { queriesKeys } from '@config/reactQueryKeys'
import { routesConfig } from '@config/routesConfig'
import { useNavigate } from 'react-router-dom'
import { Testimonial } from '@models/Testimonial.model'
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

            // queryClient.invalidateQueries({ queryKey: [queriesKeys.FETCH_TESTIMONIALS] })

            // Actualizar el caché de la lista de testimonios
            queryClient.setQueryData(
               [queriesKeys.FETCH_TESTIMONIALS],
               (oldData: Awaited<ReturnType<typeof getTestimonials>> | undefined) => {
                  if (!oldData) return oldData
                  return {
                     ...oldData,
                     testimonials: oldData.testimonials.map((t: Testimonial) =>
                        t.id === testimonial.id ? testimonial : t
                     ),
                  }
               }
            )

            // Actualizar el caché del testimonio individual
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
