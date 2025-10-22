import { PageTitleLanding } from '@shared'
import { Heart, Users, Sparkles, Target, Shield, Star } from 'lucide-react'

const values = [
   {
      id: 1,
      icon: Heart,
      title: 'Autenticidad',
      description:
         'Creemos que el verdadero estilo nace de la autenticidad. Te ayudamos a expresar quién realmente sos, no lo que otros esperan que seas.',
   },
   {
      id: 2,
      icon: Users,
      title: 'Personalización',
      description:
         'Cada persona es única y merece un enfoque personalizado. Nuestras consultorías se adaptan 100% a tu estilo de vida, personalidad y objetivos.',
   },
   {
      id: 3,
      icon: Sparkles,
      title: 'Transformación',
      description:
         'No solo cambiamos tu apariencia, transformamos la relación que tenés con tu imagen y potenciamos tu confianza desde adentro hacia afuera.',
   },
   {
      id: 4,
      icon: Target,
      title: 'Resultados',
      description:
         'Nos enfocamos en generar resultados tangibles y duraderos. Queremos que sientas el impacto de nuestro trabajo en tu día a día.',
   },
   {
      id: 5,
      icon: Shield,
      title: 'Confianza',
      description:
         'Trabajamos en un ambiente de total confianza y respeto. Tu comodidad y bienestar son nuestra prioridad en cada sesión.',
   },
   {
      id: 6,
      icon: Star,
      title: 'Excelencia',
      description:
         'Nos comprometemos con la excelencia en cada detalle. Desde la primera consulta hasta el seguimiento, buscamos superar tus expectativas.',
   },
]

const ValuesSection = () => {
   return (
      <section className="bgsilk-tertiary">
         <div className="container py-15 md:py-20 space-y-10">
            <PageTitleLanding
               element="h2"
               textColor="text-silk-secondary"
               title={
                  <>
                     Nuestros <span className="italic font-light">valores</span>
                  </>
               }
               description="Los principios que guían nuestro trabajo y definen la experiencia SILK"
            />

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
               {values.map((value) => {
                  const IconComponent = value.icon
                  return (
                     <div
                        key={value.id}
                        className="bg-white backdrop-blur-sm rounded-md p-6 border border-silk-primary/20 hover:bg-white transition-all duration-300 group shadow-lg hover:shadow-xl"
                     >
                        <div className="flex items-center mb-4">
                           <div className="bg-gradient-to-b from-emerald-600 to-emerald-800 text-white border-none p-3 rounded-lg group-hover:scale-110 transition-transform duration-300">
                              <IconComponent size={24} className="text-white" />
                           </div>
                           <h3 className="font-very-vogue text-2xl text-silk-secondary ml-4">
                              {value.title}
                           </h3>
                        </div>

                        <p className="text-silk-secondary leading-relaxed">
                           {value.description}
                        </p>
                     </div>
                  )
               })}
            </div>
         </div>
      </section>
   )
}

export default ValuesSection
