import { useMutation, useQueryClient } from '@tanstack/react-query'
import { createServiceRequest } from '@services/requests.service'
import { extractErrorData } from '@utils/extractErrorDetails'
import { queriesKeys } from '@config/reactQueryKeys'
import { toast } from 'sonner'

const useCreateRequest = () => {
   const queryClient = useQueryClient()

   const { mutateAsync: createServiceRequestMutate, isPending } = useMutation({
      mutationFn: createServiceRequest,
      onSuccess: ({ message }) => {
         toast.success(message)

         queryClient.invalidateQueries({ queryKey: [queriesKeys.FETCH_REQUESTS] })
      },
      onError: (error) => {
         if (error?.message === 'Network Error') return
         const { message } = extractErrorData(error)

         toast.error(message, {
            id: `error-${queriesKeys.CREATE_REQUEST}`,
         })
      },
   })

   return { createServiceRequestMutate, isPending }
}

export default useCreateRequest
