import { Link, useLocation } from 'react-router-dom'
import { Button, cn } from '@shadcn'
import {
   Archive,
   DollarSign,
   FileText,
   Home,
   LogOut,
   Settings,
   ShoppingCart,
} from 'lucide-react'

const navigation = [
   { name: 'Dashboard', link: '/admin', icon: Home },
   { name: 'Pedidos', link: '/admin/pedidos', icon: ShoppingCart },
   { name: 'Blogs', link: '/admin/blogs', icon: FileText },
   { name: 'Artículos', link: '/admin/articulos', icon: Archive },
   { name: 'Pagos', link: '/admin/pagos', icon: DollarSign },
   { name: 'Configuración', link: '/admin/configuracion', icon: Settings },
]
const Sidebar = () => {
   const { pathname } = useLocation()

   return (
      <div className="flex flex-col w-64 bg-white border-r border-gray-200 text-gray-700">
         <div className="flex items-center justify-center h-16 px-4 border-b border-gray-200">
            <div className="flex items-center space-x-2">
               <div className="text-secondary">
                  <span className="font-classy-vogue text-5xl">SILK</span>
               </div>
               <div className="px-2 bg-emerald-800 text-white font-light rounded-sm flex items-center justify-center">
                  ADMIN
               </div>
            </div>
         </div>

         <nav className="flex-1 px-4 py-4 space-y-2">
            {navigation.map((item) => {
               const isActive = pathname === item.link
               return (
                  <Link key={item.name} to={item.link}>
                     <Button
                        variant={isActive ? 'secondary' : 'ghost'}
                        disableScale
                        className={cn(
                           'w-full justify-start',
                           'hover:bg-emerald-50! hover:text-emerald-800',
                           isActive && 'bg-emerald-800 hover:bg-emerald-800 text-white'
                        )}
                     >
                        <item.icon className="mr-2 h-4 w-4" />
                        {item.name}
                     </Button>
                  </Link>
               )
            })}
         </nav>

         <div className="p-4 border-t border-gray-200">
            <Button
               variant="ghost"
               className="w-full justify-start text-red-600 hover:text-red-700 hover:bg-red-50"
               onClick={() => alert('Cerrar sesión')}
            >
               <LogOut className="mr-2 h-4 w-4" />
               Cerrar Sesión
            </Button>
         </div>
      </div>
   )
}
export default Sidebar
