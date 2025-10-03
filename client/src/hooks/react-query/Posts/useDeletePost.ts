import { useMutation, useQueryClient } from '@tanstack/react-query'
import { deletePost, getPosts } from '@services/posts.service'
import { extractErrorData } from '@utils/extractErrorDetails'
import { queriesKeys } from '@config/reactQueryKeys'
import { Post } from '@models/Post.model'
import { toast } from 'sonner'

function useDeletePost() {
   const queryClient = useQueryClient()

   const { mutateAsync: deletePostMutate, isPending } = useMutation({
      mutationFn: deletePost,
      onSuccess: ({ message, post }) => {
         toast.success(message)

         // queryClient.invalidateQueries({ queryKey: [queriesKeys.FETCH_POSTS] })

         // Actualizar el caché removiendo el post eliminado
         queryClient.setQueryData(
            [queriesKeys.FETCH_POSTS],
            (oldData: Awaited<ReturnType<typeof getPosts>>) => {
               if (!oldData) return oldData
               return {
                  ...oldData,
                  posts: oldData.posts.filter((p: Post) => p.id !== post.id) || [],
               }
            }
         )
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
