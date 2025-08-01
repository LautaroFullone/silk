import { Card, CardContent } from '@shadcn'
import { LucideIcon } from 'lucide-react'

interface StatsCardProps {
   title: string
   value: string
   description: string
   iconColor: string
   iconBgColor: string
   icon: LucideIcon
}

const StatsCard: React.FC<StatsCardProps> = ({
   title,
   value,
   description,
   icon: Icon,
   iconColor,
   iconBgColor,
}) => {
   return (
      <Card className="hover:shadow-md transition-shadow">
         <CardContent>
            <div className="flex items-center justify-between">
               <div>
                  <p className="text-sm font-medium text-gray-600">{title}</p>
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
export default StatsCard
