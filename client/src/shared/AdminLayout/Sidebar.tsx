import { Link, useLocation, useNavigate } from 'react-router-dom'
import { Button, cn, Sheet, SheetContent, SheetTrigger } from '@shadcn'
import {
   Archive,
   DollarSign,
   FileText,
   Home,
   LogOut,
   Menu,
   Settings,
   ShoppingCart,
   X,
} from 'lucide-react'
import useMobile from '@hooks/useMobile'
import { useState } from 'react'

const navigation = [
   { name: 'Dashboard', link: '/admin', icon: Home },
   { name: 'Blogs', link: '/admin/blogs', icon: FileText },
   // { name: 'Pedidos', link: '/admin/pedidos', icon: ShoppingCart },
   // { name: 'Artículos', link: '/admin/articulos', icon: Archive },
   // { name: 'Pagos', link: '/admin/pagos', icon: DollarSign },
   // { name: 'Configuración', link: '/admin/configuracion', icon: Settings },
]
const Sidebar = () => {
   const { pathname } = useLocation()
   const navigate = useNavigate()
   const isMobile = useMobile()
   const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

   const HeaderBrand = () => (
      <div className="flex items-center space-x-2">
         <h1 className="font-classy-vogue text-secondary text-4xl">SILK</h1>
         <span className="px-2 bg-emerald-800 text-white text-sm font-light rounded-sm">
            ADMIN
         </span>
      </div>
   )

   const Navigation = ({ onItemClick }: { onItemClick?: () => void }) => (
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
                  <Link to={item.link} onClick={onItemClick}>
                     <item.icon className="mr-2 h-4 w-4" />
                     {item.name}
                  </Link>
               </Button>
            )
         })}
      </nav>
   )

   const Footer = ({ onClick }: { onClick?: () => void }) => (
      <div className="p-4 border-t border-gray-200">
         <Button
            variant="ghost"
            disableScale
            className="w-full justify-start text-red-600 hover:text-red-700 hover:bg-red-50!"
            onClick={onClick ?? (() => alert('Cerrar sesión'))}
         >
            <LogOut className="mr-2 h-4 w-4" />
            Cerrar Sesión
         </Button>
      </div>
   )

   if (isMobile) {
      return (
         <>
            {/* Top mobile header */}
            <div className="fixed top-0 left-0 right-0 z-40 bg-white border-b border-gray-200 shadow-sm">
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
                        <h1 className="text-xl font-serif tracking-wider text-black">
                           SILK
                        </h1>
                        <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded">
                           ADMIN
                        </span>
                     </div>
                  </div>

                  <Button variant="ghost" size="icon" className="hover:bg-gray-100">
                     <Settings className="h-5 w-5" />
                  </Button>
               </div>
            </div>

            {/* Slide-out sidebar */}
            <div
               className={cn(
                  'fixed top-0 left-0 z-50 h-full w-64 bg-white border-r border-gray-200 shadow-lg transform transition-transform duration-300',
                  mobileMenuOpen ? 'translate-x-0' : '-translate-x-full'
               )}
            >
               <div className="flex items-center justify-between px-4 h-16 border-b border-gray-200">
                  <HeaderBrand />
                  <Button
                     size="icon"
                     variant="ghost"
                     className="hover:bg-gray-100"
                     onClick={() => setMobileMenuOpen(false)}
                  >
                     <X className="h-5 w-5" />
                  </Button>
               </div>
               <Navigation onItemClick={() => setMobileMenuOpen(false)} />
               <Footer onClick={() => setMobileMenuOpen(false)} />
            </div>

            {/* Backdrop */}
            {mobileMenuOpen && (
               <div
                  className="fixed inset-0 z-40 bg-black/40"
                  onClick={() => setMobileMenuOpen(false)}
               />
            )}
         </>
      )
   }

   // Desktop Sidebar
   return (
      <div className="flex flex-col w-64 bg-white border-r border-gray-200 text-gray-700">
         <div className="flex items-center justify-center h-16 px-4 border-b border-gray-200">
            <Link to="/" className="select-none">
               <HeaderBrand />
            </Link>
         </div>
         <Navigation />
         <Footer />
      </div>
   )
}

export default Sidebar

//  return (
//       <div className="flex flex-col w-64 bg-white border-r border-gray-200 text-gray-700">
//          <div className="flex items-center justify-center h-16 px-4 border-b border-gray-200">
//             <Link to="/" className="select-none">
//                <div className="flex items-center space-x-2">
//                   <div className="font-classy-vogue text-secondary text-5xl">SILK</div>
//                   <div className="px-2 bg-emerald-800 text-white font-light rounded-sm flex items-center justify-center">
//                      ADMIN
//                   </div>
//                </div>
//             </Link>
//          </div>

//          <nav className="flex-1 px-4 py-4 space-y-2">
//             {navigation.map((item) => {
//                const isActive = pathname === item.link
//                return (
//                   <Link key={item.name} to={item.link}>
//                      <Button
//                         variant={isActive ? 'secondary' : 'ghost'}
//                         disableScale
//                         className={cn(
//                            'w-full justify-start select-none',
//                            'hover:bg-emerald-50! hover:text-emerald-800',
//                            isActive && 'bg-emerald-800 hover:bg-emerald-800 text-white'
//                         )}
//                      >
//                         <item.icon className="mr-2 h-4 w-4" />
//                         {item.name}
//                      </Button>
//                   </Link>
//                )
//             })}
//          </nav>

//          <div className="p-4 border-t border-gray-200">
//             <Button
//                variant="ghost"
//                disableScale
//                className="w-full justify-start text-red-600 hover:text-red-700 hover:bg-red-50!"
//                onClick={() => alert('Cerrar sesión')}
//             >
//                <LogOut className="mr-2 h-4 w-4" />
//                Cerrar Sesión
//             </Button>
//          </div>
//       </div>
//    )
