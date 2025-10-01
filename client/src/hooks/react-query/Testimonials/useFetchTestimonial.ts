import { getTestimonialById } from '@services/testimonials.service'
import { extractErrorData } from '@utils/extractErrorDetails'
import { queriesKeys } from '@config/reactQueryKeys'
import { useQuery } from '@tanstack/react-query'
import { toast } from 'sonner'

const useFetchTestimonial = (param: { testimonialId: string | undefined }) => {
   const { data, isLoading, error, isError } = useQuery({
      queryKey: [queriesKeys.FETCH_TESTIMONIAL, param.testimonialId],
      queryFn: () => getTestimonialById(param.testimonialId!),
      staleTime: 2 * 60 * 1000, //2min - menor tiempo para datos que pueden cambiar frecuentemente
      retry: 1,
      enabled: !!param.testimonialId, // Solo ejecuta la query si hay testimonialId
   })

   if (isError && error.message !== 'Network Error') {
      const { message } = extractErrorData(error)

      toast.error(message, {
         id: `error-${queriesKeys.FETCH_TESTIMONIAL}-${param.testimonialId}`,
      })
   }

   return {
      testimonial: data?.testimonial,
      isLoading,
      isError,
      error,
   }
}

export default useFetchTestimonial
