import { PageTitleLanding } from '@shared'
import { Link } from 'react-router-dom'
import { Mail } from 'lucide-react'

const teamMembers = [
   {
      id: 1,
      name: 'Lucas Contardi',
      role: 'Asesor de Imagen & Co-fundador',
      image: 'lucas-perfil.webp',
      bio: 'Con más de 8 años de experiencia en asesoramiento de imagen, Lucas se especializa en transformaciones corporativas y personal branding. Su enfoque combina técnicas clásicas con tendencias contemporáneas.',
      specialties: ['Asesoramiento Corporativo', 'Personal Branding', 'Colorimetría'],
      education: 'Certificado en Asesoramiento de Imagen • Fashion Styling Institute',
      social: {
         instagram: 'https://www.instagram.com/lucasccontardi/',
         mail: 'lucas@estudiosilk.com',
         tiktok: 'https://www.tiktok.com/@lucasccontardi',
      },
   },
   {
      id: 2,
      name: 'Magalí Cruz Frezzini',
      role: 'Asesora de Imagen & Co-fundadora',
      image: 'maggie-perfil.webp',
      bio: 'Especialista en transformación integral con formación en psicología de la imagen. Magalí se enfoca en el coaching ontológico aplicado al desarrollo de la imagen personal y la autoestima.',
      specialties: ['Transformación Integral', 'Coaching de Imagen', 'Personal Shopping'],
      education: 'Master en Asesoramiento de Imagen • Coaching Ontológico Certificado',
      social: {
         instagram: 'https://www.instagram.com/magalicruzfrezzini/',
         mail: 'maggie@estudiosilk.com',
         tiktok: 'https://www.tiktok.com/@magalicruzfrezzini',
      },
   },
]

const TeamSection = () => {
   return (
      <section className="bg-silk-tertiary">
         <div className="container py-15 md:py-20 space-y-10">
            <PageTitleLanding
               title={
                  <>
                     Conocé el equipo detrás de{' '}
                     <span className="font-classy-vogue">SILK</span>
                  </>
               }
               description="Somos asesores de imagen apasionados por ayudarte a descubrir y potenciar tu estilo único. Nuestra misión es transformar la manera en que te ves y te sientes con vos mismo."
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
               {teamMembers.map((member) => (
                  <div
                     key={member.id}
                     className="bg-white backdrop-blur-sm rounded-2xl p-8 border border-silk-primary/20 hover:bg-white transition-all duration-300 shadow-lg hover:shadow-xl"
                  >
                     <div className="text-center mb-6">
                        <div className="relative inline-block">
                           <img
                              src={`/team-images/${member.image}`}
                              alt={`Foto de ${member.name}`}
                              className="w-32 h-32 md:w-40 md:h-40 rounded-full object-cover mx-auto border-4 border-silk-primary/90"
                           />
                           <div className="absolute inset-0 rounded-full bg-gradient-to-t from-silk-secondary/10 to-transparent"></div>
                        </div>

                        <h3 className="font-very-vogue text-3xl md:text-4xl text-silk-secondary mt-4 mb-2">
                           {member.name}
                        </h3>
                        <p className="text-silk-secondary/80 font-medium uppercase tracking-wide text-sm">
                           {member.role}
                        </p>
                     </div>

                     <div className="space-y-4">
                        <p className="text-silk-secondary/90 leading-relaxed text-center">
                           {member.bio}
                        </p>

                        <div className="bg-white/80 backdrop-blur-sm rounded-md p-4 border border-silk-primary/20">
                           <h4 className="font-semibold text-silk-primary mb-2">
                              Formación
                           </h4>
                           <p className="text-silk-secondary/90 text-sm">
                              {member.education}
                           </p>
                        </div>

                        <div className="flex justify-center items-center space-x-4 py-2 bg-silk-primary rounded-md">
                           <Link
                              to={member.social.instagram}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="size-7"
                           >
                              <img
                                 src="/socials-images/instagram.webp"
                                 alt="Instagram"
                                 className="w-full h-full object-contain"
                              />
                           </Link>

                           <a href={`mailto:${member.social.mail}`} className="size-7">
                              <Mail className="size-7" />
                           </a>

                           <Link
                              to={member.social.tiktok}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="size-7"
                           >
                              <img
                                 src="/socials-images/tik-tok.webp"
                                 alt="TikTok"
                                 className="w-full h-full object-contain"
                              />
                           </Link>
                        </div>
                     </div>
                  </div>
               ))}
            </div>
         </div>
      </section>
   )
}

export default TeamSection
