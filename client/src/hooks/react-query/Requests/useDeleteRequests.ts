import { deleteRequest, getRequests } from '@services/requests.service'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { extractErrorData } from '@utils/extractErrorDetails'
import { queriesKeys } from '@config/reactQueryKeys'
import { toast } from 'sonner'

function useDeleteRequests() {
   const queryClient = useQueryClient()

   const { mutateAsync: deleteRequestMutate, isPending } = useMutation({
      mutationFn: deleteRequest,
      onSuccess: ({ message, request }) => {
         toast.success(message)

         // Actualizar el caché removiendo la solicitud eliminada
         queryClient.setQueryData(
            [queriesKeys.FETCH_REQUESTS],
            (oldData: Awaited<ReturnType<typeof getRequests>>) => {
               if (!oldData) return oldData
               return {
                  ...oldData,
                  requests: oldData.requests?.filter((r) => r.id !== request.id) || [],
               }
            }
         )
      },
      onError: (error) => {
         if (error?.message === 'Network Error') return
         const { message } = extractErrorData(error)

         toast.error(message, {
            id: `error-${queriesKeys.DELETE_REQUEST}`,
         })
      },
   })

   return { deleteRequestMutate, isPending }
}

export default useDeleteRequests
