import { getDashboardStats } from '@services/dashboard.service'
import { queriesKeys } from '@config/reactQueryKeys'
import { useQuery } from '@tanstack/react-query'

const useFetchDashboardStats = () => {
   const { data, isLoading, error, isError } = useQuery({
      queryKey: [queriesKeys.FETCH_DASHBOARD_STATS],
      queryFn: getDashboardStats,
      staleTime: 20 * 60 * 1000, // 20 minutos
      refetchOnWindowFocus: false,
      retry: false,
   })

   return {
      stats: data?.stats,
      isLoading,
      isError,
      error,
   }
}

export default useFetchDashboardStats
