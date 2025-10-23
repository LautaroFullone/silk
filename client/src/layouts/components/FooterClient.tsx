import { routesConfig } from '@config/routesConfig'
import { Link } from 'react-router-dom'

const navLinks = [
   { label: 'NOSOTROS', route: routesConfig.CLIENT_ABOUT },
   { label: 'BLOG', route: routesConfig.CLIENT_BLOG },
   { label: 'SERVICIOS', route: routesConfig.CLIENT_SERVICES },
   { label: 'QUIZ', route: routesConfig.CLIENT_QUIZ },
   // { label: 'FAQ', route: routesConfig.CLIENT_FAQ },
]

const FooterClient = () => {
   return (
      <footer className="bg-silk-primary py-20">
         <div className="max-w-xs sm:max-w-xl lg:max-w-5xl mx-auto">
            <div className="flex flex-col items-start">
               <img
                  src="/silk-main-logo.webp"
                  alt="Logo de Estudiosilk footer"
                  className="w-[100px] mb-2"
               />
               <p className="text-base leading-relaxed max-w-[650px] mb-4">
                  Combinamos creatividad y estrategia para transformar tu estilo en una
                  herramienta de confianza y autenticidad, ayudándote a proyectar tu mejor
                  versión cada día.
               </p>
            </div>

            <div className="flex flex-col md:flex-row md:justify-between items-center gap-4">
               <div className="flex gap-4 ">
                  {navLinks.map(({ label, route }) => (
                     <Link key={label} to={route}>
                        {label}
                     </Link>
                  ))}
               </div>

               <div className="flex gap-6">
                  <Link
                     to="https://www.instagram.com/estudiosilk/?hl=es"
                     target="_blank"
                     rel="noopener noreferrer"
                     className="size-7"
                  >
                     <img
                        src="/socials-images/instagram.webp"
                        alt="Instagram"
                        className="w-full h-full object-contain"
                     />
                  </Link>

                  <Link
                     to="https://www.facebook.com/profile.php?id=61565342986870"
                     target="_blank"
                     rel="noopener noreferrer"
                     className="size-7"
                  >
                     <img
                        src="/socials-images/facebook.webp"
                        alt="Facebook"
                        className="w-full h-full object-contain"
                     />
                  </Link>

                  <Link
                     to="https://www.tiktok.com/@lucasccontardi"
                     target="_blank"
                     rel="noopener noreferrer"
                     className="size-7"
                  >
                     <img
                        src="/socials-images/tik-tok.webp"
                        alt="TikTok"
                        className="w-full h-full object-contain"
                     />
                  </Link>
               </div>
            </div>

            <div className="w-full h-[1px] bg-silk-tertiary/40 my-5" />

            <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-2 text-xs opacity-70 pb-2">
               <p className="m-0">ESTUDIOSILK. TODOS LOS DERECHOS RESERVADOS</p>
               <div className="flex gap-3">
                  <span className="cursor-pointer hover:underline">
                     Términos y condiciones
                  </span>

                  <span className="cursor-pointer hover:underline">Privacy Policy</span>

                  <Link
                     to={routesConfig.ADMIN_LOGIN}
                     className="cursor-pointer hover:underline"
                  >
                     Acceso
                  </Link>
               </div>
            </div>
         </div>
      </footer>
   )
}
export default FooterClient
