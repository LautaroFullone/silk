import React from 'react'

const footerLinks = [
   { href: '#nosotros', label: 'NOSOTROS' },
   { href: '#contacto', label: 'CONTACTO' },
]

const legalLinks = [
   { href: '#terms', label: 'Términos & Condiciones' },
   { href: '#privacy', label: 'Privacy Policy' },
]

const socialLinks = [
   {
      href: 'https://www.instagram.com/estudiosilk/',
      imgSrc: '/instagram.png',
      alt: 'Instagram',
   },
   {
      href: 'https://www.facebook.com/profile.php?id=61565777219419',
      imgSrc: '/facebook.png',
      alt: 'Facebook',
   },
   {
      href: 'https://www.tiktok.com/@estudiosilk',
      imgSrc: '/tik-tok.png',
      alt: 'TikTok',
   },
]

const Footer = () => {
   return (
      <footer
         className="bg-primary px-20 py-10 mt-auto font-acumin text-base
            md:px-10 md:py-6"
      >
         <div className="flex flex-col gap-6 max-w-5xl mx-auto w-full">
            {/* Logo y descripción */}
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

            {/* Links y redes */}
            <div className="flex flex-col md:flex-row md:justify-between items-center mb-[-10px]">
               {/* Links */}
               <div className="flex gap-4 text-base mt-2 md:mt-0">
                  {footerLinks.map((link, idx) => (
                     <React.Fragment key={link.href}>
                        <a href={link.href} className="hover:underline">
                           {link.label}
                        </a>
                        {idx < footerLinks.length - 1 && (
                           <span className="text-[#f2f0eb]">|</span>
                        )}
                     </React.Fragment>
                  ))}
               </div>
               {/* Socials */}
               <div className="flex gap-6 mt-3 md:mt-0">
                  {socialLinks.map((social) => (
                     <a
                        key={social.href}
                        href={social.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-[30px] h-[30px] flex items-center justify-center transition-transform duration-300 hover:scale-110"
                     >
                        <img
                           src={social.imgSrc}
                           alt={social.alt}
                           className="w-full h-full object-contain"
                        />
                     </a>
                  ))}
               </div>
            </div>

            {/* Divider */}
            <div className="w-full h-[1px] bg-[#f2f0eb] opacity-20" />

            {/* Legales */}
            <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-2 text-xs opacity-70 pb-2">
               <p className="m-0">©2025 ESTUDIOSILK. TODOS LOS DERECHOS RESERVADOS</p>
               <div className="flex gap-3">
                  {legalLinks.map((link) => (
                     <a key={link.href} href={link.href} className="hover:underline">
                        {link.label}
                     </a>
                  ))}
               </div>
            </div>
         </div>
      </footer>
   )
}
export default Footer
