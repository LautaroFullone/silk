import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@shadcn'
import { Skeleton } from '@shadcn'

const StatCardSkeleton = () => (
   <Card className="animate-pulse">
      <CardContent>
         <div className="flex items-center justify-between">
            <div className="flex-1">
               <Skeleton className="h-4 w-24 mb-2" />
               <Skeleton className="h-8 w-16 mb-1" />
               <Skeleton className="h-3 w-20" />
            </div>
            <Skeleton className="h-12 w-12 rounded-full" />
         </div>
      </CardContent>
   </Card>
)

const ActivityItemSkeleton = () => (
   <div className="flex items-start space-x-3 p-3 rounded-lg border border-gray-100">
      <Skeleton className="h-8 w-8 rounded-full" />
      <div className="flex-1 space-y-2">
         <Skeleton className="h-4 w-full" />
         <Skeleton className="h-3 w-20" />
      </div>
   </div>
)

const QuickActionSkeleton = () => (
   <div className="flex items-center gap-3 w-full p-4 rounded-md">
      <Skeleton className="h-8 w-8 rounded-lg" />
      <div className="text-left flex-1 space-y-1">
         <Skeleton className="h-4 w-24" />
         <Skeleton className="h-3 w-32" />
      </div>
      <Skeleton className="h-4 w-4" />
   </div>
)

const DashboardSkeleton = () => {
   return (
      <>
         {/* Page Title */}
         <div className="mb-6">
            <Skeleton className="h-8 w-48 mb-2" />
            <Skeleton className="h-4 w-64" />
         </div>

         {/* Stats Cards */}
         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
            {Array.from({ length: 4 }).map((_, index) => (
               <StatCardSkeleton key={`stat-skeleton-${index}`} />
            ))}
         </div>

         <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
            {/* Recent Activity Card */}
            <Card className="lg:col-span-2">
               <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                     <Skeleton className="h-5 w-5" />
                     <Skeleton className="h-6 w-32" />
                  </CardTitle>
                  <CardDescription>
                     <Skeleton className="h-4 w-48" />
                  </CardDescription>
               </CardHeader>
               <CardContent>
                  <div className="space-y-4">
                     {Array.from({ length: 5 }).map((_, index) => (
                        <ActivityItemSkeleton key={`activity-skeleton-${index}`} />
                     ))}
                  </div>
               </CardContent>
            </Card>

            {/* Quick Actions Card */}
            <Card>
               <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                     <Skeleton className="h-5 w-5" />
                     <Skeleton className="h-6 w-28" />
                  </CardTitle>
                  <CardDescription>
                     <Skeleton className="h-4 w-24" />
                  </CardDescription>
               </CardHeader>
               <CardContent>
                  <div className="space-y-3">
                     {Array.from({ length: 4 }).map((_, index) => (
                        <QuickActionSkeleton key={`action-skeleton-${index}`} />
                     ))}
                  </div>
               </CardContent>
            </Card>
         </div>
      </>
   )
}

export default DashboardSkeleton
