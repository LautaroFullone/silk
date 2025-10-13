import { Card, CardContent, Skeleton } from '@shadcn'
import { LucideIcon } from 'lucide-react'

interface StatsCardProps {
   title: string
   value: number
   description: string
   iconColor: string
   iconBgColor: string
   icon: LucideIcon
}

const StatsCard = ({
   title,
   value,
   description,
   icon: Icon,
   iconColor,
   iconBgColor,
}: StatsCardProps) => {
   return (
      <Card className="hover:shadow-md transition-shadow">
         <CardContent>
            <p className="text-sm font-medium text-gray-600">{title}</p>
            <div className="flex items-center justify-between">
               <div>
                  <p className="text-3xl font-bold text-gray-900 mt-2">{value}</p>
                  <p className="text-sm text-gray-500 mt-1">{description}</p>
               </div>
               <div className={`p-3 rounded-full ${iconBgColor}`}>
                  <Icon className={`w-6 h-6 ${iconColor}`} />
               </div>
            </div>
         </CardContent>
      </Card>
   )
}

StatsCard.Skeleton = function StatsCardSkeleton() {
   return (
      <Card>
         <CardContent>
            <Skeleton className="h-4 w-24 mb-4" />
            <div className="flex items-center justify-between">
               <div>
                  <Skeleton className="h-8 w-16 mb-2" />
                  <Skeleton className="h-4 w-20" />
               </div>
               <Skeleton className="h-12 w-12 rounded-full" />
            </div>
         </CardContent>
      </Card>
   )
}
export default StatsCard
