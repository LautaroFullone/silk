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

   return { getRequestStatusColor }
}

export default useStyles
