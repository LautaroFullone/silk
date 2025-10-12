import { RequestStatus } from '@models/Request.model'
import {
   type LucideIcon,
   XCircle,
   CheckCircle,
   CircleDot,
   AlertCircle,
} from 'lucide-react'

interface RequestStatusInfo {
   label: string
   icon: LucideIcon
   description: string
   color: string
   timelineColor: string
}

export const requestStatusConfig: Record<RequestStatus, RequestStatusInfo> = {
   PENDING: {
      label: 'Pendiente',
      icon: AlertCircle,
      color: 'bg-amber-100 text-amber-700',
      timelineColor: 'amber',
      description: 'La solicitud está pendiente de revisión.',
   },
   CONTACTED: {
      label: 'Contactado',
      icon: CircleDot,
      color: 'bg-indigo-100 text-indigo-700',
      timelineColor: 'indigo',
      description: 'El cliente ya ha sido contactado.',
   },
   CONTRACTED: {
      label: 'Contratado',
      icon: CheckCircle,
      color: 'bg-emerald-100 text-emerald-700',
      timelineColor: 'emerald',
      description: 'El servicio ha sido contratado.',
   },
   CANCELLED: {
      label: 'Cancelado',
      icon: XCircle,
      color: 'bg-stone-100 text-stone-700',
      timelineColor: 'stone',
      description: 'La solicitud ha sido cancelada.',
   },
} as const
