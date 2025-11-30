import { Link, useLocation, useNavigate } from 'react-router-dom'
import { checkIsLinkActive } from '@utils/checkIsLinkActive'
import { routesConfig } from '@config/routesConfig'
import useMobile from '@hooks/useMobile'
import { Button, cn } from '@shadcn'
import { useState } from 'react'
import { useAuth } from '@hooks'
import {
   ClipboardList,
   FileText,
   Home,
   LogOut,
   Menu,
   MessageSquare,
   X,
} from 'lucide-react'

const navigation = [
   { label: 'Dashboard', route: routesConfig.ADMIN_DASHBOARD, icon: Home },
   { label: 'Posts', route: routesConfig.ADMIN_POST_LIST, icon: FileText },
   {
      label: 'Testimonios',
      route: routesConfig.ADMIN_TESTIMONIAL_LIST,
      icon: MessageSquare,
   },
   // { label: 'Productos', route: routesConfig.ADMIN_PRODUCTS, icon: ShoppingBag },
   {
      label: 'Solicitudes',
      route: routesConfig.ADMIN_REQUEST_LIST,
      icon: ClipboardList,
   },
]

const SidebarAdmin = () => {
   const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

   const { pathname } = useLocation()
   const navigate = useNavigate()
   const { logout } = useAuth()
   const isMobile = useMobile()

   return (
      <>
         {/* Header mobile */}
         {isMobile && (
            <div className="fixed top-0 left-0 right-0 z-40 bg-white border-b border-gray-200 shadow-sm h-16 px-4 py-3">
               <div className="flex items-center space-x-3">
                  <Button
                     variant="ghost"
                     size="icon"
                     onClick={() => setMobileMenuOpen(true)}
                     className="hover:bg-gray-100"
                  >
                     <Menu className="h-5 w-5" />
                  </Button>

                  <div className="flex items-center space-x-2">
                     <h1 className="font-classy-vogue text-silk-secondary text-4xl">
                        SILK
                     </h1>
                     <span className="px-2 bg-emerald-800 text-white text-sm font-light rounded-sm">
                        ADMIN
                     </span>
                  </div>
               </div>
            </div>
         )}

         {/* Sidebar (siempre presente, oculto con translate en mobile) */}
         <aside
            className={cn(
               'fixed top-0 left-0 z-50 h-full w-64 bg-white border-r border-gray-200 text-gray-700 flex flex-col transform transition-transform duration-300',
               isMobile
                  ? mobileMenuOpen
                     ? 'translate-x-0'
                     : '-translate-x-full'
                  : 'relative translate-x-0 h-screen'
            )}
         >
            {/* Header con botón cerrar solo visible en mobile */}
            <div className="flex items-center justify-between h-16 px-4 border-b border-gray-200">
               <Link to={routesConfig.CLIENT_HOME} className="select-none">
                  <div className="flex items-center space-x-2">
                     <h1 className="font-classy-vogue text-silk-secondary text-4xl">
                        SILK
                     </h1>
                     <span className="px-2 bg-emerald-800 text-white text-sm font-light rounded-sm">
                        ADMIN
                     </span>
                  </div>
               </Link>

               {isMobile && (
                  <Button
                     size="icon"
                     variant="ghost"
                     className="hover:bg-gray-100"
                     onClick={() => setMobileMenuOpen(false)}
                  >
                     <X className="h-5 w-5" />
                  </Button>
               )}
            </div>

            <nav className="flex-1 p-2 space-y-1">
               {navigation.map(({ label, route, icon: Icon }) => {
                  const isActive = checkIsLinkActive(pathname, route)

                  return (
                     <Button
                        key={label}
                        variant={isActive ? 'secondary' : 'ghost'}
                        onClick={() => {
                           if (isMobile) setMobileMenuOpen(false)
                           navigate(route)
                        }}
                        className={cn(
                           'w-full justify-start select-none',
                           'hover:bg-emerald-50! hover:text-emerald-800',
                           isActive && 'bg-emerald-800 hover:bg-emerald-800 text-white'
                        )}
                     >
                        <Icon className="h-5! w-5!" />
                        {label}
                     </Button>
                  )
               })}
            </nav>

            <div className="p-4 border-t border-gray-200">
               <Button
                  variant="ghost"
                  className="w-full justify-start text-destructive hover:text-red-700 hover:bg-red-50!"
                  onClick={async () => {
                     await logout()
                     navigate(routesConfig.ADMIN_LOGIN)
                  }}
               >
                  <LogOut className="mr-2 h-4 w-4" />
                  Cerrar Sesión
               </Button>
            </div>
         </aside>

         {/* Backdrop solo en mobile */}
         {isMobile && mobileMenuOpen && (
            <div
               className="fixed inset-0 z-40 bg-black/40"
               onClick={() => setMobileMenuOpen(false)}
            />
         )}
      </>
   )
}

export default SidebarAdmin
