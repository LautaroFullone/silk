import { getRequests, updateServiceRequestStatus } from '@services/requests.service'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { extractErrorData } from '@utils/extractErrorDetails'
import { queriesKeys } from '@config/reactQueryKeys'
import { toast } from 'sonner'

const useUpdateRequest = () => {
   const queryClient = useQueryClient()

   const { mutateAsync: updateServiceRequestMutate, isPending } = useMutation({
      mutationFn: updateServiceRequestStatus,
      onSuccess: ({ message, request }) => {
         if (message === 'No hay cambios para aplicar') {
            toast.info(message)
         } else {
            toast.success(message)
            // Actualizar el caché de la lista de solicitudes
            queryClient.setQueryData(
               [queriesKeys.FETCH_REQUESTS],
               (oldData: Awaited<ReturnType<typeof getRequests>>) => {
                  if (!oldData) return oldData
                  return {
                     ...oldData,
                     requests: oldData.requests.map((r) =>
                        r.id === request.id ? request : r
                     ),
                  }
               }
            )

            // Actualizar el caché de la solicitud individual
            queryClient.setQueryData([queriesKeys.FETCH_REQUEST, request.id], {
               message,
               request,
            })
         }
      },
      onError: (error) => {
         if (error?.message === 'Network Error') return
         const { message } = extractErrorData(error)

         toast.error(message, {
            id: `error-${queriesKeys.UPDATE_REQUEST}`,
         })
      },
   })

   return { updateServiceRequestMutate, isPending }
}

export default useUpdateRequest
