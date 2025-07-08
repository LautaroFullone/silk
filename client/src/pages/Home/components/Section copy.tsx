// import React, { useEffect, useRef, useState } from 'react'
import { useEffect, useRef, useState } from 'react'
import styles from './Section.module.css'

interface Item {
   id: number
   image: string
   title: string
   description: string
}

const items: Item[] = [
   {
      id: 1,
      image: '/Fotos_sección_pre-blog-04.jpg',
      title: 'DIGITALIZAMOS TU CLOSET',
      description:
         'Accede a tu guardarropa desde cualquier lugar con nuestro sistema digital.',
   },
   {
      id: 2,
      image: '/Fotos_sección_pre-blog-05.jpg',
      title: 'ELEVAMOS TU ESTILO',
      description:
         'De la mano de tu estilista personal, creamos looks que reflejan quién sos y potencian tu mejor versión.',
   },
   {
      id: 3,
      image: '/Fotos_sección_pre-blog-06.jpg',
      title: 'EMPODERAMOS TU IMAGEN',
      description:
         'Te ayudamos a proyectar confianza y seguridad a través de un estilo auténtico y único.',
   },
]

const SectionCopy: React.FC = () => {
   const sectionRef = useRef<HTMLDivElement>(null)
   const [isVisible, setIsVisible] = useState(false)

   useEffect(() => {
      const observer = new IntersectionObserver(
         ([entry]) => {
            if (entry.isIntersecting) {
               setIsVisible(true)
               observer.disconnect() // Deja de observar después de activarse
            }
         },
         { threshold: 0.2 } // Detecta cuando el 20% de la sección es visible
      )

      if (sectionRef.current) {
         observer.observe(sectionRef.current)
      }

      return () => observer.disconnect()
   }, [])

   return (
      <div className="bg-[#161616] text-[#F2F0EB] py-16 px-8 min-h-screen">
         <div className="max-w-5xl mx-auto">
            {/* Título principal */}
            <h2 className="font-very-vogue text-[3.5rem] leading-[1.1] tracking-[1px] text-center mb-10">
               En <span className="font-classy-vogue tracking-[1.5px]">SILK</span> creamos
               más que looks:
               <br />
               <span className="font-vogue-italic italic block mt-2 tracking-[1px]">
                  construimos confianza.
               </span>
            </h2>

            <div className="flex flex-wrap justify-center mt-10 gap-8">
               {items.map((item) => (
                  <div key={item.id} className="w-[320px]">
                     <img
                        src={item.image}
                        alt={item.title}
                        className="w-full h-[320px] object-cover object-center mb-4 shadow-lg"
                     />
                     <h3 className="text-lg font-bold mb-2 font-acumin tracking-wide uppercase">
                        {item.title}
                     </h3>
                     <p className="text-[15px] leading-[1.4] font-acumin font-normal">
                        {item.description}
                     </p>
                  </div>
               ))}
            </div>
         </div>
      </div>
   )
}

export default SectionCopy
