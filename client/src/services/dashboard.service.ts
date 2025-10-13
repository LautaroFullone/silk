import { RequestStatus } from '@models/Request.model'
import { api } from '@lib/axios'

interface DashboardPost {
   id: string
   title: string
   date: string
   author: string
}

interface DashboardRequest {
   id: string
   name: string
   status: RequestStatus
   createdAt: string
}

export interface DashboardStats {
   stats: {
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
}

/**
 * Obtener estadísticas optimizadas para el dashboard
 * @returns Estadísticas del dashboard con contadores y elementos recientes
 */
export async function getDashboardStats() {
   const { data } = await api.get<DashboardStats>('/dashboard/stats')
   return data
}
