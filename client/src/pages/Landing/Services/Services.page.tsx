import ServicesSection from './components/ServicesSection'
import ContactSection from './components/ContactSection'
import FaqSection from './components/FaqSection'
import { Seo } from '@shared'

const servicesJsonLd = {
   '@context': 'https://schema.org',
   '@type': 'Service',
   name: 'Servicios de Colorimetría y Estilismo Personal - SILK',
   description:
      'Servicios profesionales de asesoría de imagen, personal shopping, digitalización de closet y consultoría de estilo personal.',
   provider: {
      '@type': 'LocalBusiness',
      name: 'Estudio Silk',
      url: 'https://estudiosilk.com',
   },
   serviceType: [
      'Asesoría de Imagen Integral',
      'Personal Shopping',
      'Digitalización de Closet',
      'Consultoría de Estilo Personal',
   ],
   areaServed: 'Argentina',
   hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Catálogo de Servicios SILK',
      itemListElement: [
         {
            '@type': 'Offer',
            itemOffered: {
               '@type': 'Service',
               name: 'Personal Shopping',
               description:
                  'Servicio personalizado para actualizar, renovar o construir tu armario desde cero.',
            },
            priceRange: '$$',
         },
         {
            '@type': 'Offer',
            itemOffered: {
               '@type': 'Service',
               name: 'Asesoría de Imagen Integral',
               description:
                  'Análisis completo de colorimetría, estilo personal y transformación de imagen.',
            },
            priceRange: '$$',
         },
      ],
   },
}

const Services = () => {
   return (
      <>
         <Seo
            title="Servicios"
            description="Descubre nuestros servicios especializados: Personal Shopping, Asesoría de Imagen Integral, Digitalización de Closet. Transformamos tu estilo con SILK."
            url="https://estudiosilk.com/servicios"
            keywords={[
               'personal shopping argentina',
               'asesoría de imagen integral',
               'digitalización closet',
               'consultoría de estilo',
               'servicios de estilismo',
               'transformación de imagen',
               'colorimetría profesional',
               'estilo personal',
            ]}
            jsonLd={servicesJsonLd}
         />
         <ServicesSection />
         <ContactSection />
         <FaqSection />
      </>
   )
}

export default Services
