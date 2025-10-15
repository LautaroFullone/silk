import { extractErrorData } from '@utils/extractErrorDetails'
import { queriesKeys } from '@config/reactQueryKeys'
import { getPosts } from '@services/posts.service'
import { useQuery } from '@tanstack/react-query'
import { toast } from 'sonner'

const useFetchPosts = (param: { onlyActive: boolean }) => {
   const { data, isLoading, error, isError } = useQuery({
      queryKey: [queriesKeys.FETCH_POSTS, param.onlyActive],
      queryFn: () => getPosts(param.onlyActive),
      staleTime: 20 * 60 * 1000, //20min
      retry: 1,
   })

   if (isError && error.message !== 'Network Error') {
      const { message } = extractErrorData(error)

      toast.error(message, {
         id: `error-${queriesKeys.FETCH_POSTS}`,
      })
   }

   return {
      posts: data?.posts || [],
      categories: data?.categories || {},
      isLoading,
      isError,
      error,
   }
}
export default useFetchPosts
