import MiniCarrouselSection from './components/MiniCarrouselSection'
import TestimonialsSection from './components/TestimonialsSection'
import ConfidenceSection from './components/ConfidenceSection'
import FindStyleSection from './components/FindStyleSection'
import PostsSection from './components/PostsSection'
import HeroSection from './components/HeroSection'
import { Seo } from '@shared'

const homeJsonLd = {
   '@context': 'https://schema.org',
   '@type': 'ProfessionalService',
   name: 'Estudio Silk - Colorimetría y Estilismo Personal',
   description:
      'Especialistas en colorimetría, asesoría de imagen y estilismo personal. Transformamos tu estilo en una herramienta de confianza.',
   url: 'https://estudiosilk.com',
   serviceType: ['Colorimetría', 'Asesoría de imagen', 'Estilismo personal'],
   areaServed: 'Argentina',
   hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Servicios de Estilismo',
      itemListElement: [
         {
            '@type': 'Offer',
            itemOffered: {
               '@type': 'Service',
               name: 'Asesoría de Imagen Integral',
               description: 'Análisis completo de colorimetría y estilo personal',
            },
         },
      ],
   },
}

const Home = () => {
   return (
      <>
         <Seo
            title="Inicio"
            description="Descubre tu estilo único con SILK. Especialistas en colorimetría, asesoría de imagen y transformación personal. Digitalizamos tu closet y potenciamos tu confianza."
            url="https://estudiosilk.com/"
            keywords={[
               'colorimetría argentina',
               'asesoría de imagen',
               'estilismo personal',
               'transformación de imagen',
               'consultoría de moda',
               'estilo personal',
               'digitalización closet',
               'confianza personal',
            ]}
            jsonLd={homeJsonLd}
         />
         <HeroSection />
         <MiniCarrouselSection />
         <ConfidenceSection />
         <TestimonialsSection />
         <FindStyleSection />
         <PostsSection />
      </>
   )
}
export default Home
