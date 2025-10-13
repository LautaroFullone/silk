import { requestStatusConfig } from '@config/requestStatusConfig'
import { formatRelativeTime } from '@utils/formatRelativeTime'
import { Activity, Shortcut } from '@models/Dashboard.model'
import { useFetchDashboardStats } from '@hooks/react-query'
import ActivityCard from './components/ActivityCard'
import ShortcutCard from './components/ShortcutCard'
import { routesConfig } from '@config/routesConfig'
import { useNavigate } from 'react-router-dom'
import StatsCard from './components/StatsCard'
import { PageTitle } from '@shared'
import { useMemo } from 'react'
import {
   AlertCircle,
   Calendar,
   CheckCircle,
   ClipboardList,
   FilePlus2,
   FileText,
   History,
   MessageSquare,
   Zap,
} from 'lucide-react'
import {
   Card,
   CardContent,
   CardDescription,
   CardHeader,
   CardTitle,
   Skeleton,
} from '@shadcn'

const Dashboard = () => {
   const navigate = useNavigate()

   const { stats, isLoading, isError } = useFetchDashboardStats()

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

   const shortcuts: Shortcut[] = useMemo(
      () => [
         {
            label: 'Nuevo Post',
            icon: FilePlus2,
            route: routesConfig.ADMIN_POST_NEW,
            description: 'Publicar nuevo contenido',
         },
         {
            label: 'Nuevo Testimonio',
            icon: MessageSquare,
            route: routesConfig.ADMIN_TESTIMONIAL_NEW,
            description: 'Agregar testimonio',
         },
         {
            label: 'Listado de Posts',
            icon: FileText,
            route: routesConfig.ADMIN_POST_LIST,
            description: 'Gestionar publicaciones',
         },
         {
            label: 'Registro de Solicitudes',
            icon: ClipboardList,
            route: routesConfig.ADMIN_REQUEST_LIST,
            description: 'Revisar solicitudes',
         },
      ],
      []
   )

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
         <PageTitle title="Panel de Control" description="Resumen de la plataforma" />

         {/* Estadísticas principales */}
         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {isLoading ? (
               <>
                  {Array.from({ length: 4 }).map((_, index) => (
                     <StatsCard.Skeleton key={`stat-skeleton-${index}`} />
                  ))}
               </>
            ) : (
               statsCards.map((stat, index) => (
                  <StatsCard
                     key={`stat-card-${index}`}
                     title={stat.title}
                     value={stat.value}
                     description={stat.description}
                     icon={stat.icon}
                     iconColor={stat.color}
                     iconBgColor={stat.bgColor}
                  />
               ))
            )}
         </div>

         <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Actividad reciente */}{' '}
            <Card className="lg:col-span-2">
               <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                     {isLoading ? (
                        <>
                           <Skeleton className="size-6 rounded" />
                           <Skeleton className="h-6 w-36" />
                        </>
                     ) : (
                        <>
                           <History className="size-5 text-emerald-800" />
                           Actividad Reciente
                        </>
                     )}
                  </CardTitle>

                  <CardDescription>
                     {isLoading ? (
                        <Skeleton className="h-4 w-52 mt-2" />
                     ) : (
                        'Últimas acciones en el panel'
                     )}
                  </CardDescription>
               </CardHeader>

               <CardContent>
                  <div className="space-y-4">
                     {isLoading ? (
                        Array.from({ length: 5 }).map((_, index) => (
                           <ActivityCard.Skeleton key={`activity-skeleton-${index}`} />
                        ))
                     ) : recentActivities.length === 0 ? (
                        <div className="text-center py-12 text-gray-500">
                           <div className="bg-gray-50 rounded-full p-3 w-16 h-16 mx-auto mb-4">
                              <Calendar className="w-10 h-10 mx-auto text-gray-300" />
                           </div>

                           <p className="text-sm font-medium text-gray-900 mb-1">
                              No hay actividad reciente
                           </p>

                           <p className="text-xs text-gray-500">
                              Las acciones aparecerán aquí cuando se realicen
                           </p>
                        </div>
                     ) : (
                        recentActivities.map((activity, index) => (
                           <ActivityCard
                              key={`activity-card-${index}`}
                              activity={activity}
                           />
                        ))
                     )}
                  </div>
               </CardContent>
            </Card>
            {/* Acciones Rapidas */}
            <Card className="h-min">
               <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                     {isLoading ? (
                        <>
                           <Skeleton className="size-6 rounded" />
                           <Skeleton className="h-6 w-40" />
                        </>
                     ) : (
                        <>
                           <Zap className="size-5 text-emerald-800" />
                           Acciones Rápidas
                        </>
                     )}
                  </CardTitle>

                  <CardDescription>
                     {isLoading ? (
                        <Skeleton className="h-4 w-28 mt-2" />
                     ) : (
                        'Tareas frecuentes'
                     )}
                  </CardDescription>
               </CardHeader>

               <CardContent>
                  <div className="space-y-4">
                     {isLoading
                        ? Array.from({ length: 4 }).map((_, index) => (
                             <ShortcutCard.Skeleton key={`action-skeleton-${index}`} />
                          ))
                        : shortcuts.map((shortcut, index) => (
                             <ShortcutCard
                                key={`shortcut-card-${index}`}
                                shortcut={shortcut}
                                onClick={() => navigate(shortcut.route)}
                             />
                          ))}
                  </div>
               </CardContent>
            </Card>
         </div>
      </>
   )
}

export default Dashboard
