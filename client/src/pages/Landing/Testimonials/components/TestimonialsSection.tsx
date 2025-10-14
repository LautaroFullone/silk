import { useFetchTestimonials } from '@hooks/react-query'
import TestimonialCard from './TestimonialCard'
import {
   Carousel,
   CarouselContent,
   CarouselItem,
   CarouselNext,
   CarouselPrevious,
} from '@shadcn/carousel'

interface TestimonialsSectionProps {
   title?: string
   subtitle?: string
   maxItems?: number
   showOnlyHighlighted?: boolean
   backgroundColor?: 'silk-tertiary' | 'white' | 'silk-secondary'
}

const TestimonialsSection: React.FC<TestimonialsSectionProps> = ({
   title = 'Lo que dicen nuestros clientes',
   subtitle = 'Historias reales de transformación y confianza',
   maxItems = 6,
   showOnlyHighlighted = false,
   backgroundColor = 'silk-tertiary',
}) => {
   const { testimonials, isLoading } = useFetchTestimonials()

   // Filtrar testimonios activos y opcionalmente solo destacados
   const filteredTestimonials = testimonials
      .filter((testimonial) => testimonial.isActive)
      .filter((testimonial) => !showOnlyHighlighted || testimonial.isHighlight)
      .slice(0, maxItems)

   if (isLoading) {
      return (
         <section className={`bg-${backgroundColor} py-20`}>
            <div className="max-w-xs sm:max-w-xl lg:max-w-5xl mx-auto">
               <div className="text-center mb-10">
                  <div className="h-12 bg-gray-200 rounded animate-pulse mb-4 w-2/3 mx-auto" />
                  <div className="h-6 bg-gray-200 rounded animate-pulse w-1/2 mx-auto" />
               </div>
               <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {[...Array(3)].map((_, index) => (
                     <div
                        key={index}
                        className="h-64 bg-gray-200 rounded animate-pulse"
                     />
                  ))}
               </div>
            </div>
         </section>
      )
   }

   if (!filteredTestimonials.length) {
      return (
         <section className={`bg-${backgroundColor} py-20`}>
            <div className="max-w-xs sm:max-w-xl lg:max-w-5xl mx-auto text-center">
               <h2 className="font-very-vogue text-5xl text-silk-secondary mb-4">
                  {title}
               </h2>
               <p className="text-muted-foreground text-xl">
                  Próximamente encontrarás testimonios de nuestros clientes.
               </p>
            </div>
         </section>
      )
   }

   const showCarousel = filteredTestimonials.length > 3

   return (
      <section className={`bg-${backgroundColor} py-20`}>
         <div className="max-w-xs sm:max-w-xl lg:max-w-5xl mx-auto text-silk-secondary">
            <div className="text-center mb-10">
               <h2 className="font-very-vogue text-5xl mb-4">{title}</h2>
               <p className="text-muted-foreground text-xl">{subtitle}</p>
            </div>

            {showCarousel ? (
               <>
                  <div className="text-center mb-6 text-xs text-muted-foreground">
                     Desliza para ver más testimonios
                  </div>
                  <div className="px-8 relative py-4">
                     <Carousel
                        opts={{
                           align: 'start',
                           loop: true,
                        }}
                        className="w-full"
                     >
                        <CarouselContent className="-ml-4">
                           {filteredTestimonials.map((testimonial) => (
                              <CarouselItem
                                 key={testimonial.id}
                                 className="pl-4 md:basis-1/2 lg:basis-1/3"
                              >
                                 <div className="h-[300px] ">
                                    <TestimonialCard testimonial={testimonial} />
                                 </div>
                              </CarouselItem>
                           ))}
                        </CarouselContent>
                        <CarouselPrevious className="text-silk-secondary hover:bg-silk-secondary hover:text-white border-silk-secondary/20 -left-4 bg-white/80 backdrop-blur-sm" />
                        <CarouselNext className="text-silk-secondary hover:bg-silk-secondary hover:text-white border-silk-secondary/20 -right-4 bg-white/80 backdrop-blur-sm" />
                     </Carousel>
                  </div>
               </>
            ) : (
               <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {filteredTestimonials.map((testimonial) => (
                     <div key={testimonial.id} className="h-[300px]">
                        <TestimonialCard testimonial={testimonial} />
                     </div>
                  ))}
               </div>
            )}
         </div>
      </section>
   )
}

export default TestimonialsSection
