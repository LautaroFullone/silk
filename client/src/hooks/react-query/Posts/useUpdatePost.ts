import { useMutation, useQueryClient } from '@tanstack/react-query'
import { extractErrorData } from '@utils/extractErrorDetails'
import { queriesKeys } from '@config/reactQueryKeys'
import { updatePost, getPosts } from '@services/posts.service'
import { Post } from '@models/Post.model'
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

            //queryClient.invalidateQueries({ queryKey: [queriesKeys.FETCH_POSTS] })
            // queryClient.setQueryData([queriesKeys.FETCH_POST, post.id], (old: Post) => ({
            //    ...old,
            //    post,
            // }))

            // Actualizar el caché de la lista de posts
            queryClient.setQueryData(
               [queriesKeys.FETCH_POSTS],
               (oldData: Awaited<ReturnType<typeof getPosts>> | undefined) => {
                  if (!oldData) return oldData
                  return {
                     ...oldData,
                     posts: oldData.posts.map((p: Post) => (p.id === post.id ? post : p)),
                  }
               }
            )

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
