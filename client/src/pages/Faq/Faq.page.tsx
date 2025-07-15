import {
   Accordion,
   AccordionContent,
   AccordionItem,
   AccordionTrigger,
} from '@shadcn/accordion'

const preguntasFrecuentes = [
   {
      id: 1,
      pregunta: '¿CÓMO SÉ QUÉ SERVICIO ES EL ADECUADO PARA MÍ?',
      respuesta:
         'Cada servicio está diseñado para diferentes necesidades. Si no estás seguro, completá el formulario de contacto y te ayudamos a elegir el mejor para vos.',
   },
   {
      id: 2,
      pregunta: '¿EL SERVICIO DE PERSONAL SHOPPER INCLUYE EL COSTO DE LAS PRENDAS?',
      respuesta:
         'No, el costo de las prendas no está incluido en la tarifa del servicio. Te ayudamos a elegir lo mejor según tu presupuesto.',
   },
   {
      id: 3,
      pregunta: '¿QUÉ PASA SI NO ME GUSTA LO QUE PREPARARON?',
      respuesta:
         'Eso es imposible, porque trabajamos en cada detalle hasta que estés 100% conforme. Durante la segunda consulta, te presentamos un primer borrador para que des tu feedback y podamos hacer ajustes. Nuestro trabajo no termina hasta que estés feliz y enamorado del resultado.',
   },
   {
      id: 4,
      pregunta: '¿CUÁLES SON LAS FORMAS DE PAGO?',
      respuesta: 'Aceptamos efectivo, transferencias y cripto (ARS, USD & USDT).',
   },
   {
      id: 5,
      pregunta: '¿TRABAJAN CON HOMBRES Y MUJERES?',
      respuesta:
         'Sí, nuestros servicios están diseñados para cualquier persona que quiera mejorar su imagen personal.',
   },
   {
      id: 6,
      pregunta: '¿VAN A PERSONALIZAR TODO SEGÚN MI TIPO DE CUERPO Y PREFERENCIAS?',
      respuesta:
         '¡Por supuesto! Todo el servicio está diseñado para vos. Cada recomendación se adapta a tu tipo de cuerpo, estilo de vida y gustos personales. Nada es impuesto, vos tenés la última palabra en cada elección.',
   },
   {
      id: 7,
      pregunta: '¿CUÁNTO PRESUPUESTO NECESITO PARA ROPA?',
      respuesta:
         'Ofrecemos asesoramiento para clientes de cualquier parte de Argentina y del exterior. Trabajamos de manera virtual mediante encuentros por Zoom o presencialmente a domicilio (viáticos no incluidos).',
   },
   {
      id: 8,
      pregunta: '¿TRABAJAN SOLO EN CABA?',
      respuesta:
         '¡Por supuesto! Todo el servicio está diseñado para vos. Cada recomendación se adapta a tu tipo de cuerpo, estilo de vida y gustos personales. Nada es impuesto, vos tenés la última palabra en cada elección.',
   },
]

const Faq = () => {
   return (
      <section className="max-w-xs sm:max-w-xl lg:max-w-5xl mx-auto py-12 text-[#3a2e1f]">
         <h2 className="font-very-vogue text-3xl sm:text-5xl mb-12 ml-0  text-center">
            Preguntas Frecuentes
         </h2>

         <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Accordion type="multiple" className="w-full mt-2">
               {preguntasFrecuentes.slice(0, 4).map((item) => (
                  <AccordionItem
                     key={item.id}
                     value={String(item.id)}
                     className="bg-[#e3ddd1] rounded-md shadow-sm mb-6"
                  >
                     <AccordionTrigger className="py-4 px-6 font-semibold text-base rounded-md uppercase transition hover:bg-[#e3ddd1]/10 cursor-pointer">
                        {item.pregunta}
                     </AccordionTrigger>
                     <AccordionContent className="px-6 pb-4 text-base cursor-default">
                        {item.respuesta}
                     </AccordionContent>
                  </AccordionItem>
               ))}
            </Accordion>

            <Accordion type="multiple" className="w-full mt-2">
               {preguntasFrecuentes.slice(4).map((item) => (
                  <AccordionItem
                     key={item.id}
                     value={String(item.id)}
                     className="bg-[#e3ddd1] rounded-md shadow-sm mb-6"
                  >
                     <AccordionTrigger className="py-4 px-6 font-semibold text-base rounded-md uppercase transition hover:bg-[#e3ddd1]/10 cursor-pointer">
                        {item.pregunta}
                     </AccordionTrigger>
                     <AccordionContent className="px-6 pb-4 text-base cursor-default">
                        {item.respuesta}
                     </AccordionContent>
                  </AccordionItem>
               ))}
            </Accordion>
         </div>
      </section>
   )
}
export default Faq
