import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@shadcn'
import StatsCard from './components/StatsCard'
import { PageTitle } from '@shared'
import {
   DollarSign,
   FileText,
   MessageSquare,
   ShoppingBag,
   TrendingUp,
   Users,
} from 'lucide-react'

const stats = [
   {
      title: 'Posts Totales',
      value: '24',
      description: '3 nuevos esta semana',
      icon: FileText,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50',
   },
   {
      title: 'Testimonios',
      value: '18',
      description: '2 destacados',
      icon: MessageSquare,
      color: 'text-green-600',
      bgColor: 'bg-green-50',
   },
   {
      title: 'Productos',
      value: '12',
      description: '8 activos',
      icon: ShoppingBag,
      color: 'text-purple-600',
      bgColor: 'bg-purple-50',
   },
   {
      title: 'Ingresos',
      value: '$2,847',
      description: '+12% vs mes anterior',
      icon: DollarSign,
      color: 'text-emerald-600',
      bgColor: 'bg-emerald-50',
   },
   {
      title: 'Visitas',
      value: '1,234',
      description: '+8% esta semana',
      icon: TrendingUp,
      color: 'text-orange-600',
      bgColor: 'bg-orange-50',
   },
   {
      title: 'Usuarios',
      value: '89',
      description: '5 nuevos hoy',
      icon: Users,
      color: 'text-indigo-600',
      bgColor: 'bg-indigo-50',
   },
]

const activities = [
   {
      action: 'Nuevo post publicado',
      time: 'Hace 2 horas',
      type: 'post',
   },
   {
      action: 'Testimonio destacado',
      time: 'Hace 4 horas',
      type: 'testimonial',
   },
   {
      action: 'Producto actualizado',
      time: 'Hace 1 día',
      type: 'product',
   },
   {
      action: 'Usuario registrado',
      time: 'Hace 2 días',
      type: 'user',
   },
]

const shortcuts = [
   { title: 'Nuevo Post', icon: FileText, href: '/admin/posts' },
   {
      title: 'Agregar Testimonio',
      icon: MessageSquare,
      href: '/admin/testimonios',
   },
   {
      title: 'Crear Producto',
      icon: ShoppingBag,
      href: '/admin/productos',
   },
   {
      title: 'Ver Estadísticas',
      icon: TrendingUp,
      href: '/admin/estadisticas',
   },
]

const Dashboard = () => {
   return (
      <>
         <PageTitle
            title="Panel de Control"
            description="Bienvenido al panel de administración de SILK"
         />

         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {stats.map((stat, index) => (
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

         <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
               <CardHeader>
                  <CardTitle>Actividad Reciente</CardTitle>
                  <CardDescription>Últimas acciones en tu panel</CardDescription>
               </CardHeader>

               <CardContent>
                  <div className="space-y-4">
                     {activities.map((activity, index) => (
                        <div
                           key={index}
                           className="flex items-center space-x-3 p-3 rounded-md bg-gray-50"
                        >
                           <div className="w-2 h-2 bg-emerald-500 rounded-full"></div>
                           <div className="flex-1">
                              <p className="text-sm font-medium text-gray-900">
                                 {activity.action}
                              </p>
                              <p className="text-xs text-gray-500">{activity.time}</p>
                           </div>
                        </div>
                     ))}
                  </div>
               </CardContent>
            </Card>

            <Card>
               <CardHeader>
                  <CardTitle>Accesos Rápidos</CardTitle>
                  <CardDescription>Acciones frecuentes</CardDescription>
               </CardHeader>

               <CardContent>
                  <div className="grid grid-cols-2 gap-4">
                     {shortcuts.map((shortcut) => (
                        <button
                           key={shortcut.title}
                           className="p-4 text-left rounded-md border border-gray-200 hover:border-emerald-300 hover:bg-emerald-50 transition-colors"
                        >
                           <shortcut.icon className="w-5 h-5 text-emerald-800 mb-2" />
                           <p className="text-sm font-medium text-gray-900">
                              {shortcut.title}
                           </p>
                        </button>
                     ))}
                  </div>
               </CardContent>
            </Card>
         </div>
      </>
   )
}
export default Dashboard
