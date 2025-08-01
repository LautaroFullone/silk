import { Link } from 'react-router-dom'

const Footer = () => {
   return (
      <footer className="bg-primary py-20">
         <div className="max-w-xs sm:max-w-xl lg:max-w-5xl mx-auto">
            <div className="flex flex-col items-start">
               <img
                  src="/silk_logo-02.png"
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
                  <Link to="/blog">BLOG</Link>|<Link to="/quiz">QUIZ</Link>|
                  <Link to="/services">SERVICIOS</Link>|<Link to="/faq">FAQ</Link>|
                  <Link to="/about-us">NOSOTROS</Link>
               </div>

               <div className="flex gap-6">
                  <Link
                     to="/"
                     target="_blank"
                     rel="noopener noreferrer"
                     className="w-[30px] h-[30px] transition-transform duration-200 hover:scale-105"
                  >
                     <img
                        src="/instagram.png"
                        alt="Instagram"
                        className="w-full h-full object-contain"
                     />
                  </Link>

                  <Link
                     to="/"
                     target="_blank"
                     rel="noopener noreferrer"
                     className="w-[30px] h-[30px] transition-transform duration-200 hover:scale-105"
                  >
                     <img
                        src="/facebook.png"
                        alt="Facebook"
                        className="w-full h-full object-contain"
                     />
                  </Link>

                  <Link
                     to="/"
                     target="_blank"
                     rel="noopener noreferrer"
                     className="w-[30px] h-[30px] transition-transform duration-200 hover:scale-105"
                  >
                     <img
                        src="/tik-tok.png"
                        alt="TikTok"
                        className="w-full h-full object-contain"
                     />
                  </Link>
               </div>
            </div>

            <div className="w-full h-[1px] bg-tertiary/40 my-5" />

            <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-2 text-xs opacity-70 pb-2">
               <p className="m-0">©2025 ESTUDIOSILK. TODOS LOS DERECHOS RESERVADOS</p>
               <div className="flex gap-3">
                  <Link to="/" className="hover:underline">
                     Términos y condiciones
                  </Link>

                  <Link to="/" className="hover:underline">
                     Privacy Policy
                  </Link>
               </div>
            </div>
         </div>
      </footer>
   )
}
export default Footer
