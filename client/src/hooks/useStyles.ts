import { ServiceRequest } from '@models/Request.model'

const useStyles = () => {
   const getRequestStatusColor = (status: ServiceRequest['status']) => {
      switch (status) {
         case 'pending':
            return 'bg-amber-100 text-amber-800'
         case 'contacted':
            return 'bg-indigo-100 text-indigo-800'
         case 'contracted':
            return 'bg-emerald-100 text-emerald-800'
         case 'cancelled':
            return 'bg-stone-100 text-stone-800'
         default:
            return 'bg-gray-100 text-gray-800'
      }
   }

   const getStatusConfig = (status: ServiceRequest['status']) => {
      switch (status) {
         case 'pending':
            return {
               color: 'bg-yellow-100 text-yellow-800 border-yellow-200',
               icon: AlertCircle,
               label: 'Pendiente',
            }
         case 'contacted':
            return {
               color: 'bg-blue-100 text-blue-800 border-blue-200',
               icon: Loader,
               label: 'Contactado',
            }
         case 'contracted':
            return {
               color: 'bg-emerald-100 text-emerald-800 border-emerald-200',
               icon: CheckCircle,
               label: 'Completado',
            }
         case 'cancelled':
            return {
               color: 'bg-gray-100 text-gray-800 border-gray-200',
               icon: XCircle,
               label: 'Cancelado',
            }
      }
   }

   return { getRequestStatusColor }
}

export default useStyles
