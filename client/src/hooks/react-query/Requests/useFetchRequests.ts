import { extractErrorData } from '@utils/extractErrorDetails'
import { getRequests } from '@services/requests.service'
import { queriesKeys } from '@config/reactQueryKeys'
import { useQuery } from '@tanstack/react-query'
import { toast } from 'sonner'

const useFetchRequests = () => {
   const { data, isLoading, error, isError } = useQuery({
      queryKey: [queriesKeys.FETCH_REQUESTS],
      queryFn: getRequests,
      staleTime: 20 * 60 * 1000, //20min
      retry: 1,
   })

   if (isError && error.message !== 'Network Error') {
      const { message } = extractErrorData(error)

      toast.error(message, {
         id: `error-${queriesKeys.FETCH_REQUESTS}`,
      })
   }

   return {
      requests: data?.requests || [],
      isLoading,
      isError,
      error,
   }
}
export default useFetchRequests
