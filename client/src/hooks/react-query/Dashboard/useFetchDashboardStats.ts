import { getDashboardStats } from '@services/dashboard.service'
import { queriesKeys } from '@config/reactQueryKeys'
import { useQuery } from '@tanstack/react-query'

const useFetchDashboardStats = () => {
   const { data, isLoading, error, isError } = useQuery({
      queryKey: [queriesKeys.FETCH_DASHBOARD_STATS],
      queryFn: getDashboardStats,
      staleTime: 5 * 60 * 1000, // 5 minutos
      refetchOnWindowFocus: false,
   })

   return {
      stats: data?.stats,
      isLoading,
      isError,
      error,
   }
}

export default useFetchDashboardStats
