import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@shadcn'
import { JSX } from 'react'

interface ServiceCardProps {
   service: {
      id: number
      image: string
      title: string
      description: string
      options: {
         id: string
         label: string
         content: JSX.Element
      }[]
   }
}

const ServiceCard = ({ service }: ServiceCardProps) => {
   return (
      <div className="group bg-white rounded-lg shadow-sm border border-silk-primary/10 overflow-hidden hover:shadow-lg transition-all duration-300">
         {/* Image Container with Overlay Effect */}
         <div className="relative overflow-hidden aspect-[4/5] bg-silk-tertiary/20">
            <img
               src={`services-images/${service.image}`}
               alt={service.title}
               className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-silk-secondary/0 group-hover:bg-silk-secondary/10 transition-colors duration-300"></div>
         </div>

         {/* Content Container */}
         <div className="p-6">
            <h3 className="font-very-vogue text-2xl lg:text-3xl text-silk-primary mb-3 leading-tight">
               {service.title}
            </h3>

            <p className="text-silk-secondary/90 leading-relaxed mb-6 text-base">
               {service.description}
            </p>

            <Accordion type="single" collapsible className="w-full">
               {service.options.map((option) => (
                  <AccordionItem
                     withBorder
                     key={option.id}
                     value={option.id}
                     className="border-silk-primary/20"
                  >
                     <AccordionTrigger className="font-semibold text-silk-primary py-4 text-base transition-colors hover:text-silk-primary/80 [&[data-state=open]]:text-silk-primary">
                        {option.label}
                     </AccordionTrigger>

                     <AccordionContent className="pb-6 pt-2 text-silk-secondary/80 text-base leading-relaxed">
                        {option.content}
                     </AccordionContent>
                  </AccordionItem>
               ))}
            </Accordion>
         </div>
      </div>
   )
}
export default ServiceCard
