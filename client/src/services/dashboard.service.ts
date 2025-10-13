import { DashboardStats } from '@models/Dashboard.model'
import { api } from '@lib/axios'

/**
 * Obtener estadísticas optimizadas para el dashboard
 * @returns Estadísticas del dashboard con contadores y elementos recientes
 */
export async function getDashboardStats() {
   const { data } = await api.get<{ stats: DashboardStats }>('/dashboard/stats')
   return data
}
