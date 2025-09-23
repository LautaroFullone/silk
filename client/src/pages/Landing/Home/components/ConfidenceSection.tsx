const items = [
   {
      image: '/Fotos_sección_pre-blog-04.jpg',
      title: 'DIGITALIZAMOS TU CLOSET',
      description:
         'Accede a tu guardarropa desde cualquier lugar con nuestro sistema digital.',
   },
   {
      image: '/Fotos_sección_pre-blog-05.jpg',
      title: 'ELEVAMOS TU ESTILO',
      description:
         'De la mano de tu estilista personal, creamos looks que reflejan quién sos y potencian tu mejor versión.',
   },
   {
      image: '/Fotos_sección_pre-blog-06.jpg',
      title: 'EMPODERAMOS TU IMAGEN',
      description:
         'Te ayudamos a proyectar confianza y seguridad a través de un estilo auténtico y único.',
   },
   {
      image: '/recomendacion-lauti.png',
      title: 'RECOMENDACIÓN DEV',
      description:
         'Agregando una imagen más en esa seccion, la grilla se ve mejor cuando hay 2 columnas (pantalla más chica) ',
   },
]

const ConfidenceSection = () => {
   return (
      <section className="bg-silk-secondary py-20">
         <div className="max-w-xs sm:max-w-xl lg:max-w-5xl mx-auto">
            <h2 className="font-very-vogue text-6xl text-center mb-10">
               En <span className="font-classy-vogue">SILK</span> creamos más que looks:
               <br />
               <span className="italic">construimos confianza</span>
            </h2>

            <div
               className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4
                  gap-8 justify-items-center"
            >
               {items.map((item, index) => (
                  <div
                     key={`confidence-image-${index}`}
                     className="w-full flex flex-col items-start"
                  >
                     <div className="w-full aspect-[4/5] rounded-sm overflow-hidden mb-4">
                        <img
                           src={item.image}
                           alt={item.title}
                           className="w-full h-full object-cover object-center transition-transform duration-200 hover:scale-105"
                        />
                     </div>

                     <h3 className="text-xl font-bold mb-1 tracking-wide uppercase">
                        {item.title}
                     </h3>

                     <p>{item.description}</p>
                  </div>
               ))}
            </div>
         </div>
      </section>
   )
}

export default ConfidenceSection
