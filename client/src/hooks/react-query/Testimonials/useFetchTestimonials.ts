import { getTestimonials } from '@services/testimonials.service'
import { extractErrorData } from '@utils/extractErrorDetails'
import { queriesKeys } from '@config/reactQueryKeys'
import { useQuery } from '@tanstack/react-query'
import { toast } from 'sonner'

const useFetchTestimonials = (param: { onlyActive: boolean; count?: number }) => {
   const { data, isLoading, error, isError } = useQuery({
      queryKey: [queriesKeys.FETCH_TESTIMONIALS, param.onlyActive],
      queryFn: () => getTestimonials(param),
      staleTime: 20 * 60 * 1000, //20min
      retry: 1,
   })

   if (isError && error.message !== 'Network Error') {
      const { message } = extractErrorData(error)

      toast.error(message, {
         id: `error-${queriesKeys.FETCH_TESTIMONIALS}`,
      }) //Seteo un ID para evitar toast duplicados
   }

   return {
      testimonials: data?.testimonials || [],
      isLoading,
      isError,
      error,
   }
}
export default useFetchTestimonials
