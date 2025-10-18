import { useRef, useEffect, useState } from 'react'
import ColorimetryModal from './ColorimetryModal'
import { ChevronRight } from 'lucide-react'
import { PageTitleLanding } from '@shared'
import { Button } from '@shadcn'

const images = [
   'banner-hero-1.png',
   'banner-hero-2.png',
   'banner-hero-3.png',
   'banner-hero-4.png',
   'banner-hero-5.png',
]

const HeroSection = () => {
   const [isColorimetryModalOpen, setIsColorimetryModalOpen] = useState(false)
   const [currentImage, setCurrentImage] = useState(0)
   const [isPaused, setIsPaused] = useState(false)
   const bannerRef = useRef(null)

   useEffect(() => {
      if (isPaused) return

      const interval = setInterval(() => {
         setCurrentImage((prev) => (prev + 1) % images.length)
      }, 5000)
      return () => clearInterval(interval)
   }, [isPaused])

   return (
      <section
         ref={bannerRef}
         onMouseEnter={() => setIsPaused(true)}
         onMouseLeave={() => setIsPaused(false)}
      >
         <div className="flex items-center justify-center relative transition-all duration-1000 h-[600px]">
            {images.map((img, idx) => (
               <img
                  key={`hero-image-${img}`}
                  src={`hero-images/${img}`}
                  alt={`Transformación de imagen ${idx + 1}`}
                  className={`absolute h-full w-full object-cover transition-opacity duration-1000 ease-in-out
                  ${idx === currentImage ? 'opacity-100 z-10' : 'opacity-0 z-0'}`}
               />
            ))}

            <div className="absolute inset-0 bg-silk-secondary/70 z-20 pointer-events-none" />

            {/* Carousel Indicators */}
            <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 z-30 flex gap-2">
               {images.map((_, idx) => (
                  <button
                     key={idx}
                     onClick={() => setCurrentImage(idx)}
                     className={`w-2 h-2 rounded-full transition-all duration-300 
                     ${
                        idx === currentImage
                           ? 'bg-silk-tertiary w-8'
                           : 'bg-white/50 hover:bg-white/80'
                     }`}
                     aria-label={`Ir a imagen ${idx + 1}`}
                  />
               ))}
            </div>

            <div className="z-30 w-full">
               <div className="container py-15 md:py-20 flex flex-col items-center justify-center ">
                  <PageTitleLanding
                     textColor="text-silk-tertiary"
                     title={
                        <>
                           Desbloqueá tu versión
                           <br />
                           más segura y{' '}
                           <span className="italic font-light">auténtica</span>
                        </>
                     }
                     description={
                        <>
                           Descubrí los colores que realmente te favorecen y transformá tu
                           imagen con nuestro análisis personalizado{' '}
                           <span className="underline">gratuito</span>
                        </>
                     }
                  />

                  <Button
                     onClick={() => setIsColorimetryModalOpen(true)}
                     variant="primary"
                     size="xl"
                     className="mt-8 group relative overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300"
                  >
                     <span className="relative z-10 flex items-center">
                        OBTENER MI ANÁLISIS GRATIS
                        <ChevronRight
                           className="ml-2 group-hover:translate-x-1 transition-transform duration-200"
                           size={19}
                        />
                     </span>
                     <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
                  </Button>

                  <p className="mt-3 text-sm opacity-70">
                     Asesores certificados y con experiencia internacional
                  </p>
               </div>
            </div>
         </div>

         <ColorimetryModal
            isModalOpen={isColorimetryModalOpen}
            onClose={() => setIsColorimetryModalOpen(false)}
         />
      </section>
   )
}

export default HeroSection
