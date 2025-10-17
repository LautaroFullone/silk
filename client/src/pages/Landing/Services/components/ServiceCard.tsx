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
      <div className="text-silk-primary ">
         {/* TODO: pasaria imagen a codigo */}
         <img
            src={`services-images/${service.image}`}
            alt={service.title}
            className="w-full rounded-sm max-h-96 object-cover mb-5 transition-transform duration-200 hover:scale-105"
         />

         <h3 className="font-semibold text-2xl mt-4">{service.title}</h3>
         <p className=" text-silk-secondary">{service.description}</p>

         <Accordion type="single" collapsible className="w-full mt-2">
            {service.options.map((option) => (
               <AccordionItem withBorder key={option.id} value={option.id}>
                  <AccordionTrigger className="font-semibold pl-1 text-silk-primary py-2 text-base transition cursor-pointer ">
                     {option.label}
                  </AccordionTrigger>

                  <AccordionContent className="pb-4 pt-1 pl-1 text-base cursor-default">
                     {option.content}
                  </AccordionContent>
               </AccordionItem>
            ))}
         </Accordion>
      </div>
   )
}
export default ServiceCard
