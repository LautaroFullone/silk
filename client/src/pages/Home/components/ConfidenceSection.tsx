interface Item {
   image: string
   title: string
   description: string
}

const items: Item[] = [
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
]

const ConfidenceSection = () => {
   return (
      <div className="bg-secondary py-20">
         <div className="max-w-5xl mx-auto">
            <h2 className="font-very-vogue text-6xl text-center mb-10">
               En <span className="font-classy-vogue">SILK</span> creamos más que looks:
               <br />
               <span className="italic">construimos confianza.</span>
            </h2>

            <div
               className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3
                  gap-12 justify-items-center "
            >
               {items.map((item) => (
                  <div key={`image-${item.title}`}>
                     <img
                        src={item.image}
                        alt={item.title}
                        className="w-full h-[320px] object-cover object-center 
                           mb-4 shadow-lg rounded-sm"
                     />

                     <h3 className="text-xl mb-2 tracking-wide uppercase">
                        {item.title}
                     </h3>

                     <p>{item.description}</p>
                  </div>
               ))}
            </div>
         </div>
      </div>
   )
}

export default ConfidenceSection
