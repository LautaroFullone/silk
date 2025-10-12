import { getRequestDetails } from '@services/requests.service'
import { extractErrorData } from '@utils/extractErrorDetails'
import { queriesKeys } from '@config/reactQueryKeys'
import { useQuery } from '@tanstack/react-query'
import { toast } from 'sonner'

const useFetchRequestDetails = (param: { requestId: string }) => {
   const { data, isLoading, error, isError } = useQuery({
      queryKey: [queriesKeys.FETCH_REQUEST, param.requestId],
      queryFn: () => getRequestDetails(param.requestId),
      enabled: Boolean(param.requestId),
      staleTime: 20 * 60 * 1000, // 20 min
      retry: 1,
   })

   if (isError && error.message !== 'Network Error') {
      const { message } = extractErrorData(error)

      toast.error(message, { id: `error-${queriesKeys.FETCH_REQUEST}` })
   }

   return {
      request: data?.request || null,
      isLoading,
      isError,
      error,
   }
}

export default useFetchRequestDetails
