import { useMutation, useQueryClient } from '@tanstack/react-query'
import { createPost, getPosts } from '@services/posts.service'
import { extractErrorData } from '@utils/extractErrorDetails'
import { queriesKeys } from '@config/reactQueryKeys'
import { toast } from 'sonner'

const useCreatePost = () => {
   const queryClient = useQueryClient()

   const { mutateAsync: createPostMutate, isPending } = useMutation({
      mutationFn: createPost,
      onSuccess: ({ message, post }) => {
         toast.success(message)

         // Actualizar el caché agregando el nuevo post
         queryClient.setQueryData(
            [queriesKeys.FETCH_POSTS],
            (oldData: Awaited<ReturnType<typeof getPosts>> | undefined) => {
               if (!oldData) return oldData
               return {
                  ...oldData,
                  posts: [post, ...oldData.posts], // Agregar al inicio de la lista
               }
            }
         )
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
