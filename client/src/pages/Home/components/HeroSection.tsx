import { useRef, useEffect, useState } from 'react'

const images = [
   '/Banner 1_1.png',
   '/Banner 2_1.png',
   '/Banner 3_1.png',
   '/Banner 4_1.png',
   '/Banner 5_1.png',
]

const HeroSection = () => {
   const [currentImage, setCurrentImage] = useState(0)
   const bannerRef = useRef(null)

   useEffect(() => {
      const interval = setInterval(() => {
         setCurrentImage((prev) => (prev + 1) % images.length)
      }, 5000)
      return () => clearInterval(interval)
   }, [])

   return (
      <section
         ref={bannerRef}
         className={`flex items-center justify-center relative transition-all duration-1000 h-[600px] select-none `}
      >
         {images.map((img, idx) => (
            <img
               key={img}
               src={img}
               alt=""
               draggable={false}
               className={`absolute h-full object-cover transition-opacity duration-1000 ease-in-out
                  ${idx === currentImage ? 'opacity-100 z-10' : 'opacity-0 z-0'}
      `}
            />
         ))}

         <div className="absolute inset-0 bg-secondary/70 z-20 pointer-events-none" />

         <div className="z-30 w-full">
            <div className="max-w-5xl mx-auto flex flex-col items-center justify-center px-4 py-10">
               <p className="mb-4 text-base md:text-lg text-white opacity-80 font-light tracking-wide text-center">
                  Estilistas Personales de Argentina
               </p>

               <h1 className="font-very-vogue text-white text-center leading-tight text-3xl md:text-5xl lg:text-6xl font-normal mb-2">
                  Desbloqueá tu versión
                  <br />
                  más segura y <span className="italic font-light">auténtica</span>
               </h1>

               <p className="mt-6 text-white text-sm md:text-base text-center">
                  <span className="border-b border-white/70 pb-0.5 cursor-pointer hover:border-white transition-all">
                     EMPEZÁ HOY CON UN ANÁLISIS DE COLOR GRATIS
                  </span>
               </p>

               <button
                  onClick={() => alert('Comenzar!')}
                  className="mt-8 px-8 py-3 bg-tertiary text-black text-lg font-bold rounded-md
                     tracking-wider shadow-md transition-transform duration-300 hover:scale-105
                     focus:outline-none cursor-pointer"
               >
                  COMENZAR
               </button>
            </div>
         </div>
      </section>
   )
}

// const HeroSection = () => {
//    const [currentImage, setCurrentImage] = useState(0)
//    const bannerRef = useRef(null)
//    const [isVisible, setIsVisible] = useState(false)

//    // Fade-in al aparecer
//    useEffect(() => {
//       const observer = new IntersectionObserver(
//          ([entry]) => setIsVisible(entry.isIntersecting),
//          { threshold: 0.2 }
//       )
//       if (bannerRef.current) observer.observe(bannerRef.current)
//       return () => observer.disconnect()
//    }, [])

//    // Carrusel automático
//    useEffect(() => {
//       const interval = setInterval(() => {
//          setCurrentImage((prev) => (prev + 1) % images.length)
//       }, 4500)
//       return () => clearInterval(interval)
//    }, [])

//    return (
//       <section
//          ref={bannerRef}
//          className={`mt-40
//         relative w-full min-h-[70vh] flex items-center justify-center
//         transition-all duration-1000
//         ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}

//       `}
//       >
//          {/* Fondo: Imágenes + Overlay */}
//          {images.map((img, idx) => (
//             <img
//                key={img}
//                src={img}
//                alt=""
//                className={`
//             absolute inset-0 w-full h-full object-cover
//             transition-opacity duration-1000 ease-in-out
//             ${idx === currentImage ? 'opacity-100 z-10' : 'opacity-0 z-0'}
//           `}
//                draggable={false}
//             />
//          ))}

//          {/* Overlay negro */}
//          <div className="absolute inset-0 bg-black/70 z-20 pointer-events-none" />

//          {/* Contenido centrado */}
//          <div className="relative z-30 w-full flex flex-col items-center justify-center px-4 md:px-8">
//             <p className="mb-4 text-base md:text-lg text-white opacity-80 font-light tracking-wide text-center">
//                Estilistas Personales de Argentina
//             </p>
//             <h1
//                className="
//             text-white text-center font-serif leading-tight
//             text-3xl md:text-5xl lg:text-6xl font-normal
//           "
//             >
//                Desbloqueá tu versión
//                <br />
//                más segura y <span className="italic font-light">auténtica</span>
//             </h1>
//             <p className="mt-6 text-white text-sm md:text-base text-center">
//                <span className="border-b border-white/70 pb-0.5 cursor-pointer hover:border-white transition-all">
//                   EMPEZÁ HOY CON UN ANÁLISIS DE COLOR GRATIS
//                </span>
//             </p>
//             <button
//                onClick={() => alert('Comenzar!')}
//                className="
//             mt-8 px-8 py-3 bg-[#e2ddd0] text-black text-lg font-bold rounded-md
//             tracking-wider shadow-md transition-transform duration-300 hover:scale-105
//             focus:outline-none
//           "
//             >
//                COMENZAR
//             </button>
//          </div>
//       </section>
//    )
//    //   return (
//    //     <section
//    //       ref={bannerRef}
//    //       className={`
//    //         relative w-full min-h-[70vh] flex items-center justify-center
//    //         transition-all duration-1000
//    //         ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}
//    //         md:min-h-[80vh] lg:min-h-[90vh]
//    //       `}
//    //     >
//    //       {/* Fondo: Imágenes + Overlay */}
//    //       {images.map((img, idx) => (
//    //         <img
//    //           key={img}
//    //           src={img}
//    //           alt=""
//    //           className={`
//    //             absolute inset-0 w-full h-full object-cover
//    //             transition-opacity duration-1000 ease-in-out
//    //             ${idx === currentImage ? "opacity-100 z-10" : "opacity-0 z-0"}
//    //           `}
//    //           draggable={false}
//    //         />
//    //       ))}

//    //       {/* Overlay negro */}
//    //       <div className="absolute inset-0 bg-black/70 z-20 pointer-events-none" />

//    //       {/* Contenido centrado */}
//    //       <div className="relative z-30 w-full flex flex-col items-center justify-center px-4 md:px-8">
//    //         <p className="mb-4 text-base md:text-lg text-white opacity-80 font-light tracking-wide text-center">
//    //           Estilistas Personales de Argentina
//    //         </p>
//    //         <h1 className="
//    //             text-white text-center font-serif leading-tight
//    //             text-3xl md:text-5xl lg:text-6xl font-normal
//    //           ">
//    //           Desbloqueá tu versión<br />
//    //           más segura y <span className="italic font-light">auténtica</span>
//    //         </h1>
//    //         <p className="mt-6 text-white text-sm md:text-base text-center">
//    //           <span className="border-b border-white/70 pb-0.5 cursor-pointer hover:border-white transition-all">
//    //             EMPEZÁ HOY CON UN ANÁLISIS DE COLOR GRATIS
//    //           </span>
//    //         </p>
//    //         <button
//    //           onClick={() => alert("Comenzar!")}
//    //           className="
//    //             mt-8 px-8 py-3 bg-[#e2ddd0] text-black text-lg font-bold rounded-md
//    //             tracking-wider shadow-md transition-transform duration-300 hover:scale-105
//    //             focus:outline-none
//    //           "
//    //         >
//    //           COMENZAR
//    //         </button>
//    //       </div>
//    //     </section>
//    //   );
// }

export default HeroSection
