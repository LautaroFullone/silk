import { checkIsLinkActive } from '@utils/checkIsLinkActive'
import { useState, useEffect, forwardRef } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { routesConfig } from '@config/routesConfig'
import { cn } from '@shadcn'

const navLinks = [
   { label: 'NOSOTROS', route: routesConfig.CLIENT_ABOUT },
   { label: 'BLOG', route: routesConfig.CLIENT_BLOG },
   { label: 'SERVICIOS', route: routesConfig.CLIENT_SERVICES },
   { label: 'QUIZ', route: routesConfig.CLIENT_QUIZ },
   // { label: 'FAQ', route: routesConfig.CLIENT_FAQ },
]

const NavbarClient = forwardRef<HTMLElement>((_, ref) => {
   const [isScrolled, setIsScrolled] = useState(false)
   const [isScrollingUp, setIsScrollingUp] = useState(false)
   const [lastScrollY, setLastScrollY] = useState(0)
   const { pathname } = useLocation()

   useEffect(() => {
      const handleScroll = () => {
         const currentScrollY = window.scrollY

         // Detectar dirección del scroll
         const scrollingUp = currentScrollY < lastScrollY
         setIsScrollingUp(scrollingUp)

         // Mantener la lógica original para isScrolled
         setIsScrolled(currentScrollY > 50)

         setLastScrollY(currentScrollY)
      }

      window.addEventListener('scroll', handleScroll)
      return () => window.removeEventListener('scroll', handleScroll)
   }, [lastScrollY])

   const scrollToTop = () => {
      window.scrollTo({ top: 0, behavior: 'smooth' })
   }

   return (
      <header
         ref={ref}
         className={cn(
            'fixed top-0 left-0 w-full z-50 flex-col items-center transition-all duration-300',
            'bg-silk-secondary font-acumin select-none',
            isScrollingUp && 'pb-2'
         )}
      >
         <div className="flex justify-center transition-all duration-300 py-2">
            <Link to="/" onClick={scrollToTop}>
               <img
                  src="/silk-main-logo.png"
                  alt="Logo de Estudio Silk"
                  className={`transition-all duration-300 
                     ${isScrolled ? 'h-10' : 'h-15'}
            `}
               />
            </Link>
         </div>

         <div
            className={`w-screen h-[1px] bg-[#e0e0e0] mb-2 transition-opacity duration-300 
               ${isScrolled && !isScrollingUp ? 'hidden' : 'block'}`}
         />

         <nav
            className={`w-full flex justify-center transition-all duration-300
               ${isScrolled && !isScrollingUp ? 'hidden' : 'block'}`}
         >
            <ul className="flex gap-9 justify-center items-center w-full m-0 p-0 list-none">
               {navLinks.map(({ label, route }, index) => {
                  const isActive = checkIsLinkActive(pathname, route)

                  return (
                     <li key={`nav-link-${index}`} className="relative group">
                        <Link
                           to={route}
                           className={`text-base text-silk-tertiary transition-colors duration-300
                              inline-block relative ${isActive && 'font-semibold'}`}
                        >
                           {label}

                           <span
                              className={`block absolute left-0 -bottom-2 h-[1px] bg-silk-tertiary transition-all duration-300
                                    ${isActive ? 'w-full' : 'w-0'} group-hover:w-full`}
                           />
                        </Link>
                     </li>
                  )
               })}

               {/* {process.env.NODE_ENV !== 'production' && (
                  <li className="relative group">
                     <Link
                        to={routesConfig.ADMIN_DASHBOARD}
                        className="text-base text-silk-tertiary transition-colors duration-300 inline-block relative"
                     >
                        ADMIN
                        <span className="block absolute left-0 -bottom-2 h-[1px] bg-silk-tertiary transition-all duration-300 w-0 group-hover:w-full" />
                     </Link>
                  </li>
               )} */}
            </ul>
         </nav>
      </header>
   )
})

export default NavbarClient
