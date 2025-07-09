import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'

const navLinks = [
   { to: '/blog', label: 'BLOG' },
   { to: '#quiz', label: 'QUIZ', isExternal: true },
   { to: '/servicios', label: 'SERVICIOS' },
   { to: '#we-are', label: 'NOSOTROS', isExternal: true },
]

const Header = () => {
   const [isScrolled, setIsScrolled] = useState(false)
   const location = useLocation()

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
         className={`fixed top-0 left-0 w-full z-50 flex-col items-center transition-all duration-300
                   bg-secondary font-acumin ${isScrolled ? 'py-4' : 'py-2'} `}
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
               {navLinks.map((link, idx) => {
                  const isActive = location.pathname === link.to
                  return (
                     <li key={idx} className="relative group">
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
}
