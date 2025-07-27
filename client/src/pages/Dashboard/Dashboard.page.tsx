import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@shadcn'
import {
   DollarSign,
   FileText,
   MessageSquare,
   ShoppingBag,
   TrendingUp,
   Users,
} from 'lucide-react'

{
   /* <div className="space-y-8">
   
         <div className="flex flex-col space-y-2">
            <h1 className="text-3xl font-bold tracking-tight">Panel de Control</h1>
            <p className="text-muted-foreground">
               Bienvenido al Sistema de Gestión de Lavandería Industrial Full-Clean
            </p>
         </div>
      </div> */
}

const Dashboard = () => {
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

   return (
      <div className="p-8 space-y-8">
         <div>
            <h1 className="text-4xl text-gray-900 mb-2">Dashboard</h1>
            <p className="text-gray-600">Bienvenido al panel de administración de SILK</p>
         </div>

         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {stats.map((stat) => (
               <Card key={stat.title} className="hover:shadow-md transition-shadow">
                  <CardContent>
                     <div className="flex items-center justify-between">
                        <div>
                           <p className="text-sm font-medium text-gray-600">
                              {stat.title}
                           </p>
                           <p className="text-3xl font-bold text-gray-900 mt-2">
                              {stat.value}
                           </p>
                           <p className="text-sm text-gray-500 mt-1">
                              {stat.description}
                           </p>
                        </div>
                        <div className={`p-3 rounded-full ${stat.bgColor}`}>
                           <stat.icon className={`w-6 h-6 ${stat.color}`} />
                        </div>
                     </div>
                  </CardContent>
               </Card>
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
                     {[
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
                     ].map((activity, index) => (
                        <div
                           key={index}
                           className="flex items-center space-x-3 p-3 rounded-lg bg-gray-50"
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
                     {[
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
                     ].map((shortcut) => (
                        <button
                           key={shortcut.title}
                           className="p-4 text-left rounded-lg border border-gray-200 hover:border-emerald-300 hover:bg-emerald-50 transition-colors"
                        >
                           <shortcut.icon className="w-5 h-5 text-emerald-600 mb-2" />
                           <p className="text-sm font-medium text-gray-900">
                              {shortcut.title}
                           </p>
                        </button>
                     ))}
                  </div>
               </CardContent>
            </Card>
         </div>
      </div>
   )
}
export default Dashboard
