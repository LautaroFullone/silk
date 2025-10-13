import { LucideIcon } from 'lucide-react'
import { RequestStatus } from './Request.model'

export interface DashboardPost {
   id: string
   title: string
   date: string
   author: string
}

export interface DashboardRequest {
   id: string
   name: string
   status: RequestStatus
   createdAt: string
}

export interface DashboardStats {
   posts: {
      total: number
      active: number
      recent: DashboardPost[]
   }
   testimonials: {
      total: number
      highlighted: number
   }
   requests: {
      total: number
      byStatus: Record<RequestStatus, number>
      recent: DashboardRequest[]
   }
}

export interface Activity {
   action: string
   time: string
   type: string
   icon: LucideIcon
   color: string
   sortDate: Date
}

export interface Shortcut {
   label: string
   route: string
   icon: LucideIcon
   description: string
}
