import { AlertCircle, CheckCircle, CircleDot, LucideIcon, XCircle } from 'lucide-react'
import { ServiceRequest } from '@models/Request.model'
import { Badge } from '@shadcn'

type StatusDataType = Record<
   ServiceRequest['status'],
   { label: string; icon: LucideIcon; bannerColor: string; itemColor: string }
>

const useRequests = () => {
   const statusConfig: StatusDataType = {
      pending: {
         label: 'Pendiente',
         icon: AlertCircle,
         bannerColor: 'bg-amber-100 text-amber-800',
         itemColor: 'text-amber-600',
      },
      contacted: {
         label: 'Contactado',
         icon: CircleDot,
         bannerColor: 'bg-indigo-100 text-indigo-800',
         itemColor: 'text-indigo-600',
      },
      contracted: {
         label: 'Contratado',
         icon: CheckCircle,
         bannerColor: 'bg-emerald-100 text-emerald-800',
         itemColor: 'text-emerald-600',
      },
      cancelled: {
         label: 'Cancelado',
         icon: XCircle,
         bannerColor: 'bg-stone-100 text-stone-800',
         itemColor: 'text-stone-600',
      },
   } as const

   const getStatusBanner = (status: ServiceRequest['status']) => {
      const banner = statusConfig[status] || {
         label: 'Indefinido',
         icon: AlertCircle,
         color: 'bg-gray-100 text-gray-800',
      }

      return (
         <Badge className={banner.bannerColor}>
            <banner.icon className="w-4 h-4 mr-1" />
            {banner.label}
         </Badge>
      )
   }

   return { statusConfig, getStatusBanner }
}

export default useRequests
