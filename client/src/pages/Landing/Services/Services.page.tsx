import ServiceCard from './components/ServiceCard'
import FaqSection from './components/FaqSection'
import { ChevronRight } from 'lucide-react'
import { PageTitleLanding } from '@shared'
import { Button } from '@shadcn'

const services = [
   {
      id: 1,
      image: 'personal-shopping.jpg',
      title: 'Personal Shopping',
      description:
         'Un servicio 100% personalizado para actualizar, renovar o construir tu armario desde cero. Ya sea que necesites armar tu guardarropa para una nueva temporada, encontrar el look ideal para un evento o planificar outfits para tus viajes, elegimos las piezas justas para vos.',
      options: [
         {
            id: 'incluye',
            label: '¿QUÉ INCLUYE?',
            content: (
               <ul className="list-disc pl-5 space-y-1">
                  <li>
                     Entrevista inicial para fijar objetivos de compra, estilo y
                     presupuesto.
                  </li>
                  <li>
                     <b>Presencial:</b> Acompañamiento en tiendas x 3hs + coffee break.
                  </li>
                  <li>
                     <b>Online:</b> Guía de Shopping (con tips y sugerencias) + Lista de
                     compras personalizada (marcas, tiendas y productos con link de
                     compra).
                  </li>
                  <li>
                     <b>Guía post-shopping:</b> Armado de outfits con las compras
                     realizadas para que nunca te quedes sin ideas.
                  </li>
               </ul>
            ),
         },
         {
            id: 'para-quien',
            label: '¿PARA QUIÉN ES?',
            content: (
               <ul className="list-disc pl-5 space-y-1">
                  <li>
                     Personas que deseen un armario resolutivo, eficaz y adaptado a su
                     estilo, ya sea para el día a día o para un evento particular.
                  </li>
                  <li>Elegí la modalidad online si…</li>
                  <li>Viajás y querés renovar tu closet en el exterior.</li>
                  <li>No te gusta o no tenés tiempo para ir de shopping.</li>
                  <li>Vivís fuera de CABA o AMBA.</li>
               </ul>
            ),
         },
         {
            id: 'inversion',
            label: 'LA INVERSIÓN',
            content: (
               <p>
                  Cada uno de nuestros clientes tiene necesidades diferentes, por lo que
                  el precio se ajusta según lo que requieras. ¡Agendá una llamada con
                  nosotros y armemos algo a tu medida!
               </p>
            ),
         },
      ],
   },
   {
      id: 2,
      image: 'transform-image.jpg',
      title: 'Asesoramiento de Imagen',
      description:
         'El servicio de asesoramiento de imagen está diseñado para ayudarte a descubrir y potenciar tu estilo único. A través de un análisis personalizado, definimos tu paleta de colores ideal, identificamos las prendas que mejor te favorecen y creamos una guía de estilo acorde a tu personalidad, estilo de vida y objetivos.',

      options: [
         {
            id: 'incluye',
            label: '¿QUÉ INCLUYE?',
            content: (
               <ul className="list-disc pl-5 space-y-1">
                  <li>2 sesiones de asesoramiento por Zoom (o más si es necesario)</li>
                  <li>Análisis de figura, rostro y estilo.</li>
                  <li>Colorimetría: Tu paleta ideal y cómo combinarla.</li>
                  <li>Sugerencias de estilismo, cabello y make-up.</li>
                  <li>Armado de un armario cápsula con 12 outfits.</li>
                  <li>Lista de compras con links a tiendas.</li>
               </ul>
            ),
         },
         {
            id: 'para-quien',
            label: '¿PARA QUIÉN ES?',
            content: (
               <ul className="list-disc pl-5 space-y-1">
                  <li>Personas que deseen construir su estilo personal desde cero.</li>
                  <li>Quienes buscan alinear su guardarropa con sus objetivos.</li>
                  <li>Personas en cambios de vida (embarazo, ascenso, mudanza).</li>
                  <li>
                     Quienes quieran perfeccionar su estilo y conocer sus colores ideales.
                  </li>
               </ul>
            ),
         },
         {
            id: 'inversion',
            label: 'LA INVERSIÓN',
            content: (
               <p>
                  A partir de <b>ARS$490.000</b> | <b>USD$500</b>
               </p>
            ),
         },
      ],
   },
   {
      id: 3,
      image: 'transform-life.jpg',
      title: 'Transformación Integral',
      comingSoon: true,
      description:
         'Un enfoque integral que une el asesoramiento de imagen con herramientas de coaching ontológico para trabajar tu imagen desde dentro hacia afuera. Más que elegir ropa que te quede bien, se trata de construir una relación sólida con vos mismo/a, una que esté alineada la identidad, autoestima y estilo de vida que deseás.',

      options: [
         {
            id: 'incluye',
            label: '¿QUÉ INCLUYE?',
            content: (
               <ul className="list-disc pl-5 space-y-1">
                  <li>
                     <b>Sesión 1</b>: Entrevista inicial. Autoconocimiento y fijación de
                     objetivos.
                  </li>
                  <li>
                     <b>Sesión 2</b>: Trabajo sobre la percepción corporal y estilismo.
                  </li>
                  <li>
                     <b>Sesión 3</b>: Uso del color, análisis de colorimetría y
                     combinaciones.
                  </li>
                  <li>
                     <b>Sesión 4</b>: Entrega de dossier con recomendaciones
                     personalizadas.
                  </li>
               </ul>
            ),
         },
         {
            id: 'para-quien',
            label: '¿PARA QUIÉN ES?',
            content: (
               <ul className="list-disc pl-5 space-y-1">
                  <li>
                     Personas que buscan desarrollar confianza a través de su imagen.
                  </li>
                  <li>
                     Quienes desean mejorar su relación con el espejo y su autoestima.
                  </li>
                  <li>Personas en busca de evolución y transformación personal.</li>
                  <li>
                     Quienes quieran perfeccionar su estilo y conocer sus colores ideales.
                  </li>
               </ul>
            ),
         },
         {
            id: 'inversion',
            label: 'LA INVERSIÓN',
            content: (
               <>
                  <p>¡Próximamente!</p>
               </>
            ),
         },
      ],
   },
]

const Services = () => {
   return (
      <div className="container py-15 md:py-20 space-y-10">
         <PageTitleLanding
            title={
               <>
                  Descubrí nuestros <span className="italic font-light">servicios</span>
               </>
            }
            description="En Silk, creemos que la moda es una herramienta poderosa para expresar
               quién sos. Nuestros servicios están diseñados para ayudarte a descubrir y
               potenciar tu estilo único, alineando tu imagen con tus objetivos personales
               y profesionales."
         />

         {/* Inspirational Quote */}
         {/* <h2 className="text-silk-primary font-very-vogue text-right text-2xl sm:text-4xl lg:text-5xl leading-normal">
            <span className="block">
               "Un armario que <span className="italic font-light">te inspira</span>
               ."
            </span>
            <span className="block">
               "Una imagen que <span className="italic font-light">te representa</span>
               ."
            </span>
            <span className="block">
               "Una confianza que{' '}
               <span className="italic font-light">transforma realidades</span>
               ."
            </span>
         </h2> */}

         {/* Services Grid Section */}
         <section>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
               {services.map((service) => (
                  <ServiceCard key={service.id} service={service} />
               ))}
            </div>
         </section>

         <section className="py-20">
            {/* Contact Form Section */}
            <div className="text-center">
               <h3 className="font-very-vogue text-4xl md:text-5xl text-silk-secondary mb-4">
                  ¿Listo para <span className="italic font-light">transformar</span> tu
                  imagen?
               </h3>

               <p className="text-silk-secondary/80 text-lg leading-relaxed max-w-2xl mx-auto">
                  Contános sobre tus objetivos y necesidades. Nuestro equipo te ayudará a
                  elegir el servicio ideal para vos.
               </p>
            </div>

            {/* <div className="max-w-xl mx-auto">
               <ContactForm isServiceInputEnabled />
            </div> */}

            <div className="flex justify-center">
               <Button
                  onClick={() => {}}
                  variant="primary"
                  size="xl"
                  className="mt-8 group relative overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300"
               >
                  <span className="relative z-10 flex items-center">
                     QUIERO CONTACTARME
                     <ChevronRight
                        className="ml-2 group-hover:translate-x-1 transition-transform duration-200"
                        size={19}
                     />
                  </span>
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
               </Button>
            </div>
         </section>

         <FaqSection />
      </div>
   )
}

export default Services
