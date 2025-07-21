import { Button } from '@shadcn'
import { useRef, useEffect, useState } from 'react'

const images = [
   '/Banner-1.png',
   '/Banner-2.png',
   '/Banner-3.png',
   '/Banner-4.png',
   '/Banner-5.png',
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
         className="flex items-center justify-center relative transition-all duration-1000 h-[600px] select-none"
      >
         {images.map((img, idx) => (
            <img
               key={`hero-image-${img}`}
               src={img}
               className={`absolute h-full w-full object-cover transition-opacity duration-1000 ease-in-out
                  ${idx === currentImage ? 'opacity-100 z-10' : 'opacity-0 z-0'}`}
            />
         ))}

         <div className="absolute inset-0 bg-secondary/70 z-20 pointer-events-none" />

         <div className="z-30 w-full">
            <div className="max-w-5xl mx-auto flex flex-col items-center justify-center px-4 py-10">
               <p className="mb-4 text-lg opacity-80 font-light tracking-wide text-center">
                  Estilistas Personales de Argentina
               </p>

               <h1 className="font-very-vogue text-center leading-tight text-5xl lg:text-6xl font-normal mb-2">
                  Desbloqueá tu versión
                  <br />
                  más segura y <span className="italic font-light">auténtica</span>
               </h1>

               <p className="mt-6 text-base text-center">
                  <span className="border-b border-tertiary/70 hover:border-tertiary transition-all">
                     EMPEZÁ HOY CON UN ANÁLISIS DE COLOR GRATIS
                  </span>
               </p>

               <Button
                  onClick={() => alert('Hacer el quiz!')}
                  className="mt-8"
                  variant="tertiary"
                  size="xl"
               >
                  COMENZAR
               </Button>
            </div>
         </div>
      </section>
   )
}

export default HeroSection
