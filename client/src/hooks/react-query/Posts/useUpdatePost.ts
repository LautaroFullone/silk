import { useMutation, useQueryClient } from '@tanstack/react-query'
import { extractErrorData } from '@utils/extractErrorDetails'
import { queriesKeys } from '@config/reactQueryKeys'
import { updatePost } from '@services/posts.service'
import { toast } from 'sonner'

const useUpdatePost = () => {
   const queryClient = useQueryClient()

   const { mutateAsync: updatePostMutate, isPending } = useMutation({
      mutationFn: updatePost,
      onSuccess: ({ message, post }) => {
         if (message === 'No hay cambios para aplicar') {
            toast.info(message)
         } else {
            toast.success(message)

            // Actualizar el caché de la lista de posts
            queryClient.invalidateQueries({ queryKey: [queriesKeys.FETCH_POSTS] })

            // Actualizar el caché del post individual
            queryClient.setQueryData([queriesKeys.FETCH_POST, post.id], () => ({
               post,
            }))
         }
      },
      onError: (error) => {
         if (error?.message === 'Network Error') return
         const { message } = extractErrorData(error)

         toast.error(message, {
            id: `error-${queriesKeys.UPDATE_POST}`,
         })
      },
   })

   return { updatePostMutate, isPending }
}

export default useUpdatePost
