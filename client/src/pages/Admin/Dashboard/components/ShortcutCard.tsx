import { Shortcut } from '@models/Dashboard.model'
import { ArrowRight } from 'lucide-react'
import { Skeleton } from '@shadcn'

interface ShortcutCardProps {
   shortcut: Shortcut
   onClick?: () => void
}
const ShortcutCard = ({ shortcut, onClick }: ShortcutCardProps) => {
   return (
      <div
         className="w-full justify-start p-2 hover:bg-emerald-50 cursor-pointer rounded-md"
         onClick={onClick}
      >
         <div className="flex items-center gap-3 w-full">
            <div className="p-2 rounded-lg bg-emerald-100">
               <shortcut.icon className="w-4 h-4 text-emerald-700" />
            </div>

            <div className="text-left flex-1">
               <div className="font-medium text-gray-900 text-sm">{shortcut.label}</div>

               <div className="text-xs text-gray-500">{shortcut.description}</div>
            </div>

            <ArrowRight className="w-4 h-4 text-gray-400" />
         </div>
      </div>
   )
}

ShortcutCard.Skeleton = function ActivityCardSkeleton() {
   return (
      <div className="flex items-start space-x-3 p-3 rounded-lg border border-gray-100">
         <Skeleton className="h-8 w-8 rounded-full" />
         <div className="flex-1 space-y-2">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-3 w-20" />
         </div>
      </div>
   )
}
export default ShortcutCard
