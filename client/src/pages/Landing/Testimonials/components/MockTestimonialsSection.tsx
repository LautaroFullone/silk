import TestimonialCard from './TestimonialCard'
import { mockTestimonials } from './mockTestimonials'
import {
   Carousel,
   CarouselContent,
   CarouselItem,
   CarouselNext,
   CarouselPrevious,
} from '@shadcn/carousel'

interface MockTestimonialsSectionProps {
   title?: string
   subtitle?: string
   maxItems?: number
   showOnlyHighlighted?: boolean
   backgroundColor?: 'silk-tertiary' | 'white' | 'silk-secondary'
}

const MockTestimonialsSection: React.FC<MockTestimonialsSectionProps> = ({
   title = 'Lo que dicen nuestros clientes',
   subtitle = 'Historias reales de transformación y confianza',
   maxItems = 6,
   showOnlyHighlighted = false,
   backgroundColor = 'silk-tertiary',
}) => {
   // Usar testimonios mock para prueba visual
   const filteredTestimonials = mockTestimonials
      .filter((testimonial) => testimonial.isActive)
      .filter((testimonial) => !showOnlyHighlighted || testimonial.isHighlight)
      .slice(0, maxItems)

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
                  <div className="px-8 relative">
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

export default MockTestimonialsSection
