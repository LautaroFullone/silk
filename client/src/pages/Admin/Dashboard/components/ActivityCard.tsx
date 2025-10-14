import { Activity } from '@models/Dashboard.model'
import { Skeleton } from '@shadcn'

interface ActivityCardProps {
   activity: Activity
}
const ActivityCard = ({ activity }: ActivityCardProps) => {
   return (
      <div className="flex items-start space-x-3 p-3 rounded-lg border border-gray-100 hover:bg-gray-50 transition-colors">
         <div className={`p-2 rounded-full ${activity.color}`}>
            <activity.icon className="w-4 h-4" />
         </div>

         <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-gray-900 truncate">
               {activity.action}
            </p>

            <p className="text-xs text-gray-500">{activity.time}</p>
         </div>
      </div>
   )
}

ActivityCard.Skeleton = function ActivityCardSkeleton() {
   return (
      <div className="flex items-start space-x-3 p-3 rounded-lg border border-gray-100 hover:bg-gray-50 transition-colors">
         <Skeleton className="h-8 w-8 rounded-full flex-shrink-0" />
         <div className="flex-1 min-w-0 space-y-2">
            <Skeleton className="h-4 w-full max-w-xs" />
            <Skeleton className="h-3 w-16" />
         </div>
      </div>
   )
}
export default ActivityCard
