import { useFetchTestimonials } from '@hooks/react-query'
import { getPublicImageUrl } from '@utils/getPublicImage'
import { Quote, Star } from 'lucide-react'

const TestimonialsSection = () => {
   const { testimonials, isLoading } = useFetchTestimonials({ onlyActive: true })

   return (
      <section className="bg-gradient-to-br from-silk-tertiary via-silk-tertiary to-silk-tertiary/90 py-20 relative overflow-hidden">
         <div className="max-w-xs sm:max-w-xl lg:max-w-6xl mx-auto text-silk-secondary px-4 relative z-10">
            <div className="text-center mb-16">
               <h2 className="font-very-vogue text-4xl md:text-5xl lg:text-6xl mb-6 leading-tight">
                  Testimonios que inspiran
               </h2>
               <p className="text-silk-secondary/80 text-lg max-w-2xl mx-auto leading-relaxed">
                  Lo que dicen nuestros clientes sobre su transformación
               </p>
            </div>

            {/* Layout masonry único para testimonios */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-min">
               {testimonials.map((testimonial, index) => (
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
                        <div className="absolute inset-0 bg-silk-secondary/5 rounded-2xl transform rotate-1 scale-105 opacity-0 group-hover:opacity-100 transition-all duration-300"></div>

                        {/* Card principal */}
                        <div className="relative bg-white/95 backdrop-blur-sm border border-silk-secondary/10 rounded-2xl shadow-lg hover:shadow-xl transform group-hover:-rotate-1 transition-all duration-500 overflow-hidden flex flex-col">
                           {/* Header con foto y info */}
                           <div className="flex items-center gap-4 p-6 pb-4">
                              <div className="relative">
                                 <div className="w-14 h-14 rounded-full overflow-hidden border-3 border-white shadow-lg ring-2 ring-silk-tertiary/20">
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

                           {/* Rating visual */}

                           {/* Efecto shimmer sutil */}
                           <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none">
                              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 rounded-2xl"></div>
                           </div>
                        </div>
                     </div>
                  </div>
               ))}
            </div>
         </div>
      </section>
   )
}

export default TestimonialsSection
