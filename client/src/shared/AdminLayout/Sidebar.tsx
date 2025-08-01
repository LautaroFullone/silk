import { FileText, Home, LogOut, Menu, Settings, X } from 'lucide-react'
import { Link, useLocation } from 'react-router-dom'
import useMobile from '@hooks/useMobile'
import { Button, cn } from '@shadcn'
import { useState } from 'react'

const navigation = [
   { name: 'Dashboard', link: '/admin', icon: Home },
   { name: 'Posts', link: '/admin/posts', icon: FileText },
   // { name: 'Pedidos', link: '/admin/pedidos', icon: ShoppingCart },
   // { name: 'Artículos', link: '/admin/articulos', icon: Archive },
   // { name: 'Pagos', link: '/admin/pagos', icon: DollarSign },
   // { name: 'Configuración', link: '/admin/configuracion', icon: Settings },
]

const Sidebar = () => {
   const isMobile = useMobile()
   const { pathname } = useLocation()
   const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

   return (
      <>
         {/* Header mobile */}
         {isMobile && (
            <div className="fixed top-0 left-0 right-0 z-40 bg-white border-b border-gray-200 shadow-sm h-16">
               <div className="flex items-center justify-between px-4 py-3">
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
                        <h1 className="font-classy-vogue text-secondary text-4xl">
                           SILK
                        </h1>
                        <span className="px-2 bg-emerald-800 text-white text-sm font-light rounded-sm">
                           ADMIN
                        </span>
                     </div>
                  </div>

                  <Button variant="ghost" size="icon" className="hover:bg-gray-100">
                     <Settings className="h-5 w-5" />
                  </Button>
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
               <Link to="/" className="select-none">
                  <div className="flex items-center space-x-2">
                     <h1 className="font-classy-vogue text-secondary text-4xl">SILK</h1>
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

            <nav className="flex-1 px-4 py-4 space-y-2">
               {navigation.map((item) => {
                  const isActive = pathname === item.link
                  return (
                     <Button
                        key={item.name}
                        asChild
                        variant={isActive ? 'secondary' : 'ghost'}
                        disableScale
                        className={cn(
                           'w-full justify-start select-none',
                           'hover:bg-emerald-50! hover:text-emerald-800',
                           isActive && 'bg-emerald-800 hover:bg-emerald-800 text-white'
                        )}
                     >
                        <Link to={item.link} onClick={() => {}}>
                           <item.icon className="mr-2 h-4 w-4" />
                           {item.name}
                        </Link>
                     </Button>
                  )
               })}
            </nav>

            <div className="p-4 border-t border-gray-200">
               <Button
                  variant="ghost"
                  disableScale
                  className="w-full justify-start text-red-600 hover:text-red-700 hover:bg-red-50!"
                  onClick={isMobile ? () => setMobileMenuOpen(false) : undefined}
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

export default Sidebar
