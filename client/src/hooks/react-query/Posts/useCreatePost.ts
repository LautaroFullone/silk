import { useMutation, useQueryClient } from '@tanstack/react-query'
import { extractErrorData } from '@utils/extractErrorDetails'
import { queriesKeys } from '@config/reactQueryKeys'
import { createPost } from '@services/posts.service'
import { toast } from 'sonner'

const useCreatePost = () => {
   const queryClient = useQueryClient()

   const { mutateAsync: createPostMutate, isPending } = useMutation({
      mutationFn: createPost,
      onSuccess: ({ message }) => {
         toast.success(message)

         queryClient.invalidateQueries({ queryKey: [queriesKeys.FETCH_POSTS] })
      },
      onError: (error) => {
         if (error?.message === 'Network Error') return
         const { message } = extractErrorData(error)

         toast.error(message, {
            id: `error-${queriesKeys.CREATE_POST}`,
         })
      },
   })

   return { createPostMutate, isPending }
}

export default useCreatePost
