import { extractErrorData } from '@utils/extractErrorDetails'
import { getRequests } from '@services/requests.service'
// import { ServiceRequest } from '@models/Request.model'
import { queriesKeys } from '@config/reactQueryKeys'
import { useQuery } from '@tanstack/react-query'
import { toast } from 'sonner'

// const mockRequest: ServiceRequest[] = [
//    {
//       id: 'REQ-001',
//       name: 'María González',
//       email: 'maria.gonzalez@email.com',
//       phone: '+34 612 345 678',
//       age: 32,
//       startMoment: '2025-01-15',
//       services: ['Consultoría de Imagen Ejecutiva', 'Análisis de Color Personal'],
//       budget: '100 - 200 USD',
//       status: 'PENDING',
//       ubication: 'Mar del Plata',
//       createdAt: '2025-01-10T10:00:00Z',
//    },
//    {
//       id: 'REQ-002',
//       name: 'Carlos Rodríguez',
//       email: 'carlos.rodriguez@email.com',
//       phone: '+34 687 654 321',
//       age: 28,
//       startMoment: '2025-01-14',
//       services: ['Transformación Completa'],
//       budget: '800 - 1.000 USD',
//       status: 'CONTACTED',
//       ubication: 'Buenos Aires Ciudad',
//       createdAt: '2025-01-09T14:30:00Z',
//    },
//    {
//       id: 'REQ-003',
//       name: 'Ana Martínez',
//       email: 'ana.martinez@email.com',
//       phone: '+34 654 987 321',
//       age: 45,
//       startMoment: '2025-01-13',
//       services: ['Consultoría Virtual'],
//       budget: '400 - 600 USD',
//       status: 'CONTRACTED',
//       ubication: 'Madrid',
//       createdAt: '2025-01-08T09:15:00Z',
//    },
//    {
//       id: 'REQ-004',
//       name: 'Luis Fernández',
//       email: 'luis.fernandez@email.com',
//       phone: '+34 698 123 456',
//       age: 38,
//       startMoment: '2025-01-12',
//       services: [
//          'Análisis de Color Personal',
//          'Consultoría de Imagen Ejecutiva',
//          'Consultoría de Imagen Ejecutiva',
//       ],
//       budget: '1000 - 1.200 USD',
//       status: 'PENDING',
//       ubication: 'Barcelona',
//       createdAt: '2025-01-07T11:45:00Z',
//    },
//    {
//       id: 'REQ-005',
//       name: 'Elena Ruiz',
//       email: 'elena.ruiz@email.com',
//       startMoment: '2025-01-11',
//       phone: '+34 611 222 333',
//       age: 29,
//       services: ['Análisis de Color Personal'],
//       budget: '200 - 400 USD',
//       status: 'CANCELLED',
//       ubication: 'Valencia',
//       createdAt: '2025-01-06T16:20:00Z',
//    },
// ]

const useFetchRequests = () => {
   const { data, isLoading, error, isError } = useQuery({
      queryKey: [queriesKeys.FETCH_REQUESTS],
      queryFn: getRequests,
      staleTime: 20 * 60 * 1000, //20min
      retry: 1,
   })

   if (isError && error.message !== 'Network Error') {
      const { message } = extractErrorData(error)

      toast.error(message, {
         id: `error-${queriesKeys.FETCH_REQUESTS}`,
      })
   }

   return {
      requests: data?.requests || [],
      isLoading,
      isError,
      error,
   }
}
export default useFetchRequests
