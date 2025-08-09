import { useState, useEffect, forwardRef } from 'react'
import { Link, useLocation } from 'react-router-dom'

const navLinks = [
   { label: 'BLOG', to: '/blog' },
   { label: 'QUIZ', to: '/quiz' },
   { label: 'SERVICIOS', to: '/servicios' },
   { label: 'FAQ', to: '/preguntas-frecuentes' },
   { label: 'NOSOTROS', to: '/nosotros' },
   { label: 'test', to: '/nosotros' },
]

const Header = forwardRef<HTMLElement>((_, ref) => {
   const [isScrolled, setIsScrolled] = useState(false)
   const location = useLocation()

   const link = navLinks.find((link) => link.to === '/admin')
   if (!link) navLinks.push({ label: 'ADMIN', to: '/admin' })

   useEffect(() => {
      const handleScroll = () => {
         setIsScrolled(window.scrollY > 50)
      }
      window.addEventListener('scroll', handleScroll)
      return () => window.removeEventListener('scroll', handleScroll)
   }, [])

   const scrollToTop = () => {
      window.scrollTo({ top: 0, behavior: 'smooth' })
   }

   return (
      <header
         ref={ref}
         className={`fixed top-0 left-0 w-full z-50 flex-col items-center transition-all duration-300
            bg-secondary font-acumin ${isScrolled ? 'py-4' : 'py-2'} select-none`}
      >
         <div className="flex justify-center transition-all duration-300">
            <Link to="/" onClick={scrollToTop}>
               <img
                  src="/silk_logo-02.png"
                  alt="Logo de Estudio Silk"
                  className={`transition-all duration-300 
                     ${isScrolled ? 'h-10' : 'h-15'}
            `}
               />
            </Link>
         </div>

         <div
            className={`w-screen h-[1px] bg-[#e0e0e0] my-2 transition-opacity duration-300 
               ${isScrolled ? 'hidden' : 'block'}`}
         />

         <nav
            className={`w-full flex justify-center transition-all duration-300
               ${isScrolled ? 'hidden' : 'block'}`}
         >
            <ul className="flex gap-9 justify-center items-center w-full m-0 p-0 list-none">
               {navLinks.map((link, index) => {
                  const isActive = location.pathname === link.to

                  return (
                     <li key={`nav-link-${index}`} className="relative group">
                        <Link
                           to={link.to}
                           className={`text-base text-tertiary transition-colors duration-300
                              inline-block relative ${isActive && 'font-semibold'}`}
                        >
                           {link.label}

                           <span
                              className={`block absolute left-0 -bottom-2 h-[1px] bg-tertiary transition-all duration-300
                                    ${isActive ? 'w-full' : 'w-0'} group-hover:w-full`}
                           />
                        </Link>
                     </li>
                  )
               })}
            </ul>
         </nav>
      </header>
   )
})

export default Header
