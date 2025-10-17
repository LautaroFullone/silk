import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@shadcn'

const questions = [
   {
      question: '¿CÓMO SÉ QUÉ SERVICIO ES EL ADECUADO PARA MÍ?',
      answer:
         'Cada servicio está diseñado para diferentes necesidades. Si no estás seguro, completá el formulario de contacto y te ayudamos a elegir el mejor para vos.',
   },
   {
      question: '¿QUÉ PASA SI NO ME GUSTA LO QUE PREPARARON?',
      answer:
         'Eso es imposible, porque trabajamos en cada detalle hasta que estés 100% conforme. Durante la segunda consulta, te presentamos un primer borrador para que des tu feedback y podamos hacer ajustes. Nuestro trabajo no termina hasta que estés feliz y enamorado del resultado.',
   },
   {
      question: '¿CUÁLES SON LAS FORMAS DE PAGO?',
      answer: 'Aceptamos efectivo, transferencias y cripto (ARS, USD & USDT).',
   },
   {
      question: '¿TRABAJAN CON HOMBRES Y MUJERES?',
      answer:
         'Sí, nuestros servicios están diseñados para cualquier persona que quiera mejorar su imagen personal.',
   },
   {
      question: '¿EL SERVICIO DE PERSONAL SHOPPER INCLUYE EL COSTO DE LAS PRENDAS?',
      answer:
         'No, el costo de las prendas no está incluido en la tarifa del servicio. Te ayudamos a elegir lo mejor según tu presupuesto.',
   },
   {
      question: '¿VAN A PERSONALIZAR TODO SEGÚN MI TIPO DE CUERPO Y PREFERENCIAS?',
      answer:
         '¡Por supuesto! Todo el servicio está diseñado para vos. Cada recomendación se adapta a tu tipo de cuerpo, estilo de vida y gustos personales. Nada es impuesto, vos tenés la última palabra en cada elección.',
   },
   {
      question: '¿CUÁNTO PRESUPUESTO NECESITO PARA ROPA?',
      answer:
         'El presupuesto puede variar según el tipo de ropa y la cantidad que necesites. Te recomendamos definir un rango de precios y nosotros te ayudaremos a encontrar las mejores opciones dentro de ese presupuesto.',
   },
   {
      question: '¿TRABAJAN SOLO EN CABA?',
      answer:
         'Ofrecemos asesoramiento para clientes de cualquier parte de Argentina y del exterior. Trabajamos de manera virtual mediante encuentros por Zoom o presencialmente a domicilio (viáticos no incluidos).',
   },
]

const FaqSection = () => {
   return (
      <section className="space-y-10">
         <div className="flex items-center justify-center ">
            <div className="w-full max-w-4xl mx-auto">
               <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                     <div className="w-full border-t border-silk-primary/20"></div>
                  </div>

                  <div className="relative flex justify-center text-lg">
                     <span className="bg-silk-tertiary border border-silk-primary/20 text-silk-secondary px-6 py-2">
                        Preguntas Frecuentes
                     </span>
                  </div>
               </div>
            </div>
         </div>

         {/* Main content with new layout */}
         <div className="max-w-4xl mx-auto">
            <Accordion type="single" collapsible className="w-full">
               <div className="space-y-4">
                  {questions.map((item, index) => (
                     <AccordionItem
                        withBorder
                        key={index}
                        value={String(index)}
                        className="border-silk-primary/20"
                     >
                        <AccordionTrigger className="text-base text-silk-secondary hover:text-silk-primary  hover:border-silk-primary/20 [&[data-state=open]]:text-silk-primary [&[data-state=open]]:font-semibold">
                           {item.question}
                        </AccordionTrigger>

                        <AccordionContent className="text-silk-secondary/80 text-base leading-relaxed pb-6">
                           {item.answer}
                        </AccordionContent>
                     </AccordionItem>
                  ))}
               </div>
            </Accordion>
         </div>

         <div className="text-center border-silk-primary/10">
            <p className="text-silk-secondary/60 text-sm">
               ¿Tenés otra consulta?{' '}
               <span className="font-medium text-silk-primary transition-colors cursor-pointer  hover:underline">
                  Escribinos
               </span>
            </p>
         </div>
      </section>
   )
}
export default FaqSection
