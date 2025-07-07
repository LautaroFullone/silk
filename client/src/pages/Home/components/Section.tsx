// import React, { useEffect, useRef, useState } from 'react'
// import styles from './Section.module.css'

// interface Item {
//    id: number
//    image: string
//    title: string
//    description: string
// }

// const items: Item[] = [
//    {
//       id: 1,
//       image: '/Fotos_sección_pre-blog-04.jpg',
//       title: 'DIGITALIZAMOS TU CLOSET',
//       description:
//          'Accede a tu guardarropa desde cualquier lugar con nuestro sistema digital.',
//    },
//    {
//       id: 2,
//       image: '/Fotos_sección_pre-blog-05.jpg',
//       title: 'ELEVAMOS TU ESTILO',
//       description:
//          'De la mano de tu estilista personal, creamos looks que reflejan quién sos y potencian tu mejor versión.',
//    },
//    {
//       id: 3,
//       image: '/Fotos_sección_pre-blog-06.jpg',
//       title: 'EMPODERAMOS TU IMAGEN',
//       description:
//          'Te ayudamos a proyectar confianza y seguridad a través de un estilo auténtico y único.',
//    },
// ]

// const Section: React.FC = () => {
//    const sectionRef = useRef<HTMLDivElement>(null)
//    const [isVisible, setIsVisible] = useState(false)

//    useEffect(() => {
//       const observer = new IntersectionObserver(
//          ([entry]) => {
//             if (entry.isIntersecting) {
//                setIsVisible(true)
//                observer.disconnect() // Deja de observar después de activarse
//             }
//          },
//          { threshold: 0.2 } // Detecta cuando el 20% de la sección es visible
//       )

//       if (sectionRef.current) {
//          observer.observe(sectionRef.current)
//       }

//       return () => observer.disconnect()
//    }, [])

//    return (
//       <div
//          ref={sectionRef}
//          className={`${styles.sectionContainer} ${isVisible ? styles.fadeIn : ''}`}
//       >
//          <h2>
//             En <span className={styles.silk}>SILK</span> creamos más que looks:
//             <br />
//             <em>construimos confianza.</em>
//          </h2>
//          <div className={styles.sectionGrid}>
//             {items.map((item) => (
//                <div key={item.id} className={styles.sectionItem}>
//                   <img
//                      src={item.image}
//                      alt={item.title}
//                      className={styles.sectionImage}
//                   />
//                   <h3>{item.title}</h3>
//                   <p>{item.description}</p>
//                </div>
//             ))}
//          </div>
//       </div>
//    )
// }

// export default Section

import React, { useEffect, useRef, useState } from 'react'

const items = [
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

const Section: React.FC = () => {
   const sectionRef = useRef<HTMLDivElement>(null)
   const [isVisible, setIsVisible] = useState(false)

   useEffect(() => {
      const observer = new IntersectionObserver(
         ([entry]) => {
            if (entry.isIntersecting) {
               setIsVisible(true)
               observer.disconnect()
            }
         },
         { threshold: 0.2 }
      )

      if (sectionRef.current) observer.observe(sectionRef.current)
      return () => observer.disconnect()
   }, [])

   return (
      <div
         ref={sectionRef}
         className={`bg-[#161616] text-[#f2f0eb] text-center px-5 py-16 transition-all duration-[1500ms] ease-out transform ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
         }`}
      >
         <h2 className="text-[2.5rem] md:text-[3.5rem] font-[400] tracking-[1px] leading-[1.1] font-[VeryVogue]">
            En <span className="font-[ClassyVogue] tracking-[1.5px]">SILK</span> creamos
            más que looks:
            <br />
            <em className="block font-[VogueItalic] font-light mt-2">
               construimos confianza.
            </em>
         </h2>

         <div className="flex flex-wrap justify-center gap-[50px] md:gap-[80px] mt-12">
            {items.map((item) => (
               <div key={item.id} className="w-full sm:w-[360px] text-left sm:text-left">
                  <img
                     src={item.image}
                     alt={item.title}
                     className="w-full h-[300px] md:h-[400px] object-cover object-[center_100%] mb-5 shadow-md transition duration-300 ease-out hover:-translate-y-1 hover:shadow-lg"
                  />
                  <h3 className="text-[1.2rem] md:text-[1.5rem] font-[AcuminPro-Bold] mb-2">
                     {item.title}
                  </h3>
                  <p className="text-[0.9rem] md:text-[1rem] font-[AcuminPro-Medium] font-light leading-[1.5] text-[#f2f0eb]">
                     {item.description}
                  </p>
               </div>
            ))}
         </div>
      </div>
   )
}

export default Section
