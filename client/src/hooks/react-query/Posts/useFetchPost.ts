import { extractErrorData } from '@utils/extractErrorDetails'
import { getPostById } from '@services/posts.service'
import { queriesKeys } from '@config/reactQueryKeys'
import { useQuery } from '@tanstack/react-query'
import { toast } from 'sonner'

const useFetchPost = (param: { postId: string | undefined }) => {
   const { data, isLoading, error, isError } = useQuery({
      queryKey: [queriesKeys.FETCH_POST, param.postId],
      queryFn: () => getPostById(param.postId!),
      staleTime: 2 * 60 * 1000, //2min - menor tiempo para datos que pueden cambiar frecuentemente
      retry: 1,
      enabled: !!param.postId, // Solo ejecuta la query si hay postId
   })

   if (isError && error.message !== 'Network Error') {
      const { message } = extractErrorData(error)

      toast.error(message, {
         id: `error-${queriesKeys.FETCH_POST}-${param.postId}`,
      })
   }

   return {
      post: data?.post,
      isLoading,
      isError,
      error,
   }
}

export default useFetchPost
