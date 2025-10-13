import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@shadcn'
import { requestStatusConfig } from '@config/requestStatusConfig'
import { formatRelativeTime } from '@utils/formatRelativeTime'
import DashboardSkeleton from './components/DashboardSkeleton'
import { useFetchDashboardStats } from '@hooks/react-query'
import { routesConfig } from '@config/routesConfig'
import { useNavigate } from 'react-router-dom'
import StatsCard from './components/StatsCard'
import { PageTitle } from '@shared'
import { useMemo } from 'react'
import {
   AlertCircle,
   CheckCircle,
   FileText,
   MessageSquare,
   ArrowRight,
   Calendar,
   ClipboardList,
   LucideIcon,
   Zap,
   History,
   FilePlus2,
} from 'lucide-react'

interface Activity {
   action: string
   time: string
   type: string
   icon: LucideIcon
   color: string
   sortDate: Date
}

const Dashboard = () => {
   const navigate = useNavigate()

   const { stats, isLoading, isError } = useFetchDashboardStats()

   // Estadísticas usando los datos optimizados
   const statsCards = useMemo(() => {
      if (!stats) return []

      return [
         {
            title: 'Posts Publicados',
            value: stats.posts.total,
            description: `${stats.posts.active} activos`,
            icon: FileText,
            color: 'text-sky-600',
            bgColor: 'bg-sky-50',
         },
         {
            title: 'Testimonios',
            value: stats.testimonials.total,
            description: `${stats.testimonials.highlighted} destacados`,
            icon: MessageSquare,
            color: 'text-purple-600',
            bgColor: 'bg-purple-50',
         },
         {
            title: 'Contrataciones',
            value: stats.requests.byStatus.CONTRACTED,
            description: 'Este mes',
            icon: CheckCircle,
            color: 'text-teal-600',
            bgColor: 'bg-teal-50',
         },
         {
            title: 'Solicitudes',
            value: stats.requests.total,
            description: `${stats.requests.byStatus.PENDING} pendientes`,
            icon: ClipboardList,
            color: 'text-rose-600',
            bgColor: 'bg-rose-50',
         },
      ]
   }, [stats])

   const recentActivities = useMemo(() => {
      if (!stats) return []

      const activities: Activity[] = []

      // Posts recientes (ya optimizados desde el servidor)
      stats.posts.recent.forEach((post) => {
         activities.push({
            action: `Post "${post.title}" publicado`,
            time: formatRelativeTime(post.date),
            type: 'post',
            icon: FileText,
            color: 'bg-sky-100 text-sky-700',
            sortDate: new Date(post.date),
         })
      })

      // Solicitudes recientes (ya optimizadas desde el servidor)
      stats.requests.recent.forEach((request) => {
         const statusInfo = requestStatusConfig[request.status]
         activities.push({
            action: `Solicitud de ${request.name} - ${statusInfo.label}`,
            time: formatRelativeTime(request.createdAt),
            type: 'request',
            icon: statusInfo.icon,
            color: statusInfo.color,
            sortDate: new Date(request.createdAt),
         })
      })

      return activities
         .sort((a, b) => b.sortDate.getTime() - a.sortDate.getTime())
         .slice(0, 6)
   }, [stats])

   const shortcuts = useMemo(
      () => [
         {
            title: 'Nuevo Post',
            icon: FilePlus2,
            href: routesConfig.ADMIN_POST_NEW,
            description: 'Publicar nuevo contenido',
         },
         {
            title: 'Nuevo Testimonio',
            icon: MessageSquare,
            href: routesConfig.ADMIN_TESTIMONIAL_NEW,
            description: 'Agregar testimonio',
         },
         {
            title: 'Listado de Posts',
            icon: FileText,
            href: routesConfig.ADMIN_POST_LIST,
            description: 'Gestionar publicaciones',
         },
         {
            title: 'Registro de Solicitudes',
            icon: ClipboardList,
            href: routesConfig.ADMIN_REQUEST_LIST,
            description: 'Revisar solicitudes',
         },
      ],
      []
   )

   if (isLoading) {
      return <DashboardSkeleton />
   }

   if (isError) {
      return (
         <div className="flex flex-col items-center justify-center space-y-2">
            <AlertCircle className="size-12 text-emerald-800" />
            <p className="text-lg font-medium">Error al cargar el dashboard</p>
            <p className="text-sm text-muted-foreground">Por favor, recarga la página</p>
         </div>
      )
   }

   return (
      <>
         <PageTitle
            title="Panel de Control"
            description="Resumen de tu plataforma SILK"
         />

         {/* Estadísticas principales */}
         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {statsCards.map((stat, index) => (
               <StatsCard
                  key={`stat-card-${index}`}
                  title={stat.title}
                  value={stat.value}
                  description={stat.description}
                  icon={stat.icon}
                  iconColor={stat.color}
                  iconBgColor={stat.bgColor}
               />
            ))}
         </div>

         <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Actividad Reciente - 2/3 del ancho */}
            <Card className="lg:col-span-2">
               <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                     <History className="size-5 text-emerald-800" />
                     Actividad Reciente
                  </CardTitle>

                  <CardDescription>Últimas acciones en el panel</CardDescription>
               </CardHeader>

               <CardContent>
                  <div className="space-y-4">
                     {recentActivities.length === 0 ? (
                        <div className="text-center py-8 text-gray-500">
                           <Calendar className="w-8 h-8 mx-auto mb-2 text-gray-300" />
                           <p>No hay actividad reciente</p>
                        </div>
                     ) : (
                        recentActivities.map((activity, index) => (
                           <div
                              key={index}
                              className="flex items-start space-x-3 p-3 rounded-lg border border-gray-100 hover:bg-gray-50 transition-colors"
                           >
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
                        ))
                     )}
                  </div>
               </CardContent>
            </Card>

            {/* Acciones Rápidas */}
            <Card className="h-min">
               <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                     <Zap className="size-5 text-emerald-800" />
                     Acciones Rápidas
                  </CardTitle>

                  <CardDescription>Tareas frecuentes</CardDescription>
               </CardHeader>

               <CardContent>
                  <div className="space-y-4">
                     {shortcuts.map((shortcut) => (
                        <div
                           key={shortcut.title}
                           className="w-full justify-start p-2 hover:bg-emerald-50 cursor-pointer rounded-md"
                           onClick={() => navigate(shortcut.href)}
                        >
                           <div className="flex items-center gap-3 w-full">
                              <div className="p-2 rounded-lg bg-emerald-100">
                                 <shortcut.icon className="w-4 h-4 text-emerald-700" />
                              </div>

                              <div className="text-left flex-1">
                                 <div className="font-medium text-gray-900 text-sm">
                                    {shortcut.title}
                                 </div>

                                 <div className="text-xs text-gray-500">
                                    {shortcut.description}
                                 </div>
                              </div>

                              <ArrowRight className="w-4 h-4 text-gray-400" />
                           </div>
                        </div>
                     ))}
                  </div>
               </CardContent>
            </Card>
         </div>
      </>
   )
}

export default Dashboard
