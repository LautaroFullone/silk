import { useMutation, useQueryClient } from '@tanstack/react-query'
import { extractErrorData } from '@utils/extractErrorDetails'
import { queriesKeys } from '@config/reactQueryKeys'
import { deletePost } from '@services/posts.service'
import { toast } from 'sonner'

function useDeletePost() {
   const queryClient = useQueryClient()

   const { mutateAsync: deletePostMutate, isPending } = useMutation({
      mutationFn: deletePost,
      onSuccess: ({ message }) => {
         toast.success(message)

         // queryClient.invalidateQueries({ queryKey: [queriesKeys.FETCH_POSTS] })

         // Actualizar el caché removiendo el post eliminad
         queryClient.invalidateQueries({ queryKey: [queriesKeys.FETCH_POSTS] })
      },
      onError: (error) => {
         if (error?.message === 'Network Error') return
         const { message } = extractErrorData(error)

         toast.error(message, {
            id: `error-${queriesKeys.DELETE_POST}`,
         })
      },
   })

   return { deletePostMutate, isPending }
}

export default useDeletePost
