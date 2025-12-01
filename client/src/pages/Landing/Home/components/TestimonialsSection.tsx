import { useFetchTestimonials } from '@hooks/react-query'
import { getPublicImageUrl } from '@utils/getPublicImage'
import { ChevronRight, Quote, Star } from 'lucide-react'
import { routesConfig } from '@config/routesConfig'
import { useNavigate } from 'react-router-dom'
import { PageTitleLanding } from '@shared'
import { Button, Skeleton } from '@shadcn'

const TestimonialsSection = () => {
   const navigate = useNavigate()
   const { testimonials, isLoading } = useFetchTestimonials({
      onlyActive: true,
      count: 6,
   })

   return (
      <section className="bg-silk-tertiary">
         <div className="container py-15 md:py-20 space-y-10">
            <PageTitleLanding
               element="h2"
               title="Testimonios que inspiran"
               description="Lo que dicen nuestros clientes sobre su transformación"
            />

            {/* Layout masonry único para testimonios */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 auto-rows-min">
               {isLoading ? (
                  Array.from({ length: 6 }).map((_, index) => (
                     <TestimonialSkeleton
                        key={`testimonial-skeleton-${index}`}
                        index={index}
                     />
                  ))
               ) : testimonials.length === 0 ? (
                  <div className="col-span-full">
                     <div className="bg-white/10 backdrop-blur-sm p-12 text-center">
                        <Star size={80} className="mx-auto text-silk-secondary/60 mb-4" />
                        <h3 className="font-very-vogue text-2xl text-silk-secondary mb-2">
                           Aún no hay testimonios publicados
                        </h3>
                        <p className="text-silk-secondary/80">
                           Pronto compartiremos las experiencias de nuestros clientes
                        </p>
                     </div>
                  </div>
               ) : (
                  testimonials.map((testimonial, index) => (
                     <div
                        key={testimonial.id}
                        className={`group ${
                           index === 1 ? 'md:mt-8' : index === 4 ? 'lg:mt-12' : ''
                        }`}
                        style={{
                           animationDelay: `${index * 0.1}s`,
                        }}
                     >
                        <div className="relative">
                           {/* Sombra decorativa */}
                           {/* <div className="absolute inset-0 bg-silk-secondary/5 rounded-2xl transform rotate-1 scale-105 opacity-0 group-hover:opacity-100 transition-all duration-300"></div> */}

                           <div className="relative bg-white/95 backdrop-blur-sm border border-silk-secondary/10 rounded-2xl shadow-lg hover:shadow-xl transform group-hover:-rotate-1 transition-all duration-500 overflow-hidden flex flex-col">
                              <div className="flex items-center gap-4 p-6 pb-4">
                                 <div className="relative">
                                    <div className="size-14 rounded-full overflow-hidden border-3 border-white shadow-lg ring-2 ring-silk-tertiary/20">
                                       <img
                                          alt={testimonial.personName}
                                          className="w-full h-full object-cover"
                                          src={getPublicImageUrl(
                                             testimonial.avatarImagePath
                                          )}
                                       />
                                    </div>

                                    {testimonial.isHighlight && (
                                       <div className="absolute -top-1 -right-1 w-6 h-6 bg-gradient-to-r from-amber-400 to-amber-500 rounded-full flex items-center justify-center shadow-lg">
                                          <Star className="w-3 h-3 text-white fill-current" />
                                       </div>
                                    )}
                                 </div>

                                 <div className="flex-1 min-w-0">
                                    <h3 className="font-bold text-silk-secondary text-lg tracking-wide select-none">
                                       {testimonial.personName}
                                    </h3>
                                    <p className="text-sm text-silk-secondary/70 font-medium select-none">
                                       {testimonial.personRole}
                                    </p>
                                 </div>
                              </div>

                              {/* Contenido del testimonio */}
                              <div className="flex flex-col flex-1 px-6 pb-6 relative">
                                 <Quote className="absolute -top-5 right-5 w-6 h-6 text-silk-primary/80" />

                                 <blockquote className="text-silk-secondary/80 flex-1 leading-relaxed italic text-base font-light pt-2 pr-8 select-none">
                                    "{testimonial.description}"
                                 </blockquote>
                              </div>
                           </div>
                        </div>
                     </div>
                  ))
               )}
            </div>

            {/* Separador estético */}
            <div className="h-px bg-silk-secondary/20"></div>

            <div className="text-center text-silk-secondary">
               <p className="text-tertiary/80 text-lg mb-6 max-w-md mx-auto leading-relaxed">
                  ¿Te interesa transformar tu imagen y ganar confianza?
               </p>

               <Button
                  onClick={() => navigate(routesConfig.CLIENT_SERVICES)}
                  variant="primary"
                  size="xl"
                  className="group relative overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300"
               >
                  <span className="relative z-10 flex items-center">
                     NUESTROS SERVICIOS
                     <ChevronRight
                        className="ml-2 group-hover:translate-x-1 transition-transform duration-200"
                        size={19}
                     />
                  </span>
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
               </Button>
            </div>
         </div>
      </section>
   )
}

const TestimonialSkeleton = ({ index }: { index: number }) => {
   return (
      <div className={`group ${index === 1 ? 'md:mt-8' : index === 4 ? 'lg:mt-12' : ''}`}>
         <div className="relative">
            {/* Card principal */}
            <div className="relative bg-white/95 backdrop-blur-sm border border-silk-secondary/10 rounded-2xl shadow-lg overflow-hidden flex flex-col">
               {/* Header con foto y info */}
               <div className="flex items-center gap-4 p-6 pb-4">
                  <div className="relative">
                     <Skeleton className="w-14 h-14 rounded-full" />
                  </div>

                  <div className="flex-1 min-w-0 space-y-2">
                     <Skeleton className="h-5 w-24" />
                     <Skeleton className="h-4 w-32" />
                  </div>
               </div>

               {/* Contenido del testimonio */}
               <div className="flex flex-col flex-1 px-6 pb-6 relative">
                  <div className="space-y-2 pt-2 pr-8">
                     <Skeleton className="h-4 w-full" />
                     <Skeleton className="h-4 w-full" />
                     <Skeleton className="h-4 w-3/4" />
                  </div>
               </div>
            </div>
         </div>
      </div>
   )
}

export default TestimonialsSection
