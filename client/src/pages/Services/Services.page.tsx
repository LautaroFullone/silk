import {
   Accordion,
   AccordionContent,
   AccordionItem,
   AccordionTrigger,
} from '@shadcn/accordion'

const servicios = [
   {
      id: 1,
      image: '/service-personal-shopping.png',
      opciones: [
         {
            id: 'incluye',
            titulo: '¿QUÉ INCLUYE?',
            contenido: (
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
            titulo: '¿PARA QUIÉN ES?',
            contenido: (
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
            titulo: 'LA INVERSIÓN',
            contenido: (
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
      image: '/service-transform-image.png',
      opciones: [
         {
            id: 'incluye',
            titulo: '¿QUÉ INCLUYE?',
            contenido: (
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
            titulo: '¿PARA QUIÉN ES?',
            contenido: (
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
            titulo: 'LA INVERSIÓN',
            contenido: (
               <p>
                  A partir de <b>ARS$490.000</b> | <b>USD$500</b>
               </p>
            ),
         },
      ],
   },
   {
      id: 3,
      image: '/service-transform-life.png',
      opciones: [
         {
            id: 'incluye',
            titulo: '¿QUÉ INCLUYE?',
            contenido: (
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
            titulo: '¿PARA QUIÉN ES?',
            contenido: (
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
            titulo: 'LA INVERSIÓN',
            contenido: (
               <>
                  <p>
                     ¡Próximamente! Anotate en la lista de espera y obtené una guía gratis
                     de <b>Cómo utilizar el color a tu favor.</b>
                  </p>
                  <button className="bg-primary text-white mt-3 px-4 py-2 rounded-lg text-base hover:bg-primary/90 transition">
                     Lista de Espera
                  </button>
               </>
            ),
         },
      ],
   },
]

const Services = () => {
   return (
      <section className="max-w-xs sm:max-w-xl lg:max-w-5xl mx-auto py-12">
         <p className="text-primary font-bold text-xl mb-6 text-center">
            NUESTROS SERVICIOS
         </p>

         <h2 className="font-very-vogue text-left text-3xl sm:text-5xl text-primary mb-12 ml-0">
            <span>
               "Un armario que{' '}
               <span className="italic font-vogue-text-italic">te inspira</span>
               ."
            </span>
            <br />
            <span>
               "Una imagen que{' '}
               <span className="italic font-vogue-text-italic">te representa</span>
               ."
            </span>
            <br />
            <span>
               "Una confianza que{' '}
               <span className="italic font-vogue-text-italic">
                  transforma realidades
               </span>
               ."
            </span>
         </h2>

         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mb-16 ">
            {servicios.map((servicio) => (
               <div key={servicio.id} className="max-w-[350px] text-primary ">
                  {/* TODO: pasaria imagen a codigo */}
                  <img
                     src={servicio.image}
                     className="w-full rounded-xl mb-5 transition-transform duration-200 hover:scale-105"
                  />

                  <Accordion type="single" collapsible className="w-full mt-2">
                     {servicio.opciones.map((opcion) => (
                        <AccordionItem withBorder key={opcion.id} value={opcion.id}>
                           <AccordionTrigger className="font-semibold pl-1 text-primary py-2 text-base transition cursor-pointer ">
                              {opcion.titulo}
                           </AccordionTrigger>
                           <AccordionContent className="pb-4 pt-1 pl-1 text-base cursor-default">
                              {opcion.contenido}
                           </AccordionContent>
                        </AccordionItem>
                     ))}
                  </Accordion>
               </div>
            ))}
         </div>

         {/* <div className="flex justify-center ">
            <button
               onClick={() => alert('Hacer el quiz!')}
               className="bg-primary px-5 py-2 sm:px-6 sm:py-3 rounded-md shadow-lg hover:scale-105          
                  flex items-center cursor-pointer transition-all"
            >
               COMENZÁ HOY
            </button>
         </div> */}
      </section>
   )
}

export default Services
