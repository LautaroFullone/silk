import MissionSection from './components/MissionSection'
import ValuesSection from './components/ValuesSection'
import TeamSection from './components/TeamSection'
import WorkSection from './components/WorkSection'
import { Seo } from '@shared'

const aboutJsonLd = {
   '@context': 'https://schema.org',
   '@type': 'AboutPage',
   name: 'Sobre Nosotros - Estudio Silk',
   description:
      'Conoce al equipo de Estudio Silk: Magalí Cruz Frezzini y Lucas Contardi. Especialistas en colorimetría y estilismo personal con pasión por transformar estilos.',
   mainEntity: {
      '@type': 'Organization',
      name: 'Estudio Silk',
      founder: [
         {
            '@type': 'Person',
            name: 'Magalí Cruz Frezzini',
            jobTitle: 'Especialista en Colorimetría y Estilismo',
         },
         {
            '@type': 'Person',
            name: 'Lucas Contardi',
            jobTitle: 'Especialista en Estilismo Personal',
         },
      ],
      foundingDate: '2024',
      mission:
         'Transformar el estilo de nuestros clientes en una herramienta de confianza y autenticidad',
      serviceArea: 'Argentina',
   },
}

const About = () => {
   return (
      <>
         <Seo
            title="Nosotros"
            description="Conoce a Magalí Cruz Frezzini y Lucas Contardi, fundadores de Estudio Silk. Especialistas apasionados en colorimetría y estilismo personal con años de experiencia."
            url="https://estudiosilk.com/nosotros"
            keywords={[
               'equipo estudio silk',
               'magalí cruz frezzini',
               'lucas contardi',
               'especialistas colorimetría',
               'estilistas argentina',
               'fundadores silk',
               'equipo estilismo personal',
            ]}
            jsonLd={aboutJsonLd}
         />

         <TeamSection />
         <MissionSection />
         <ValuesSection />
         <WorkSection />
      </>
   )
}

export default About
