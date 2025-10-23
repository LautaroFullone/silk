import Marquee from 'react-fast-marquee'

const miniImages = [
   'cher-cap-mini.webp',
   'battlo-sandals-mini.webp',
   'anita-ring-mini.webp',
   'adidas-shoes-mini.webp',
   'bottega-bag-mini.webp',
]

const MiniCarrouselSection = () => (
   <Marquee autoFill gradient={false} speed={30} loop={0} className="py-5 sm:py-10">
      {miniImages.map((img, i) => (
         <img
            key={img + i}
            src={`/mini-images/${img}`}
            alt={`Prenda ${i + 1}`}
            className="mx-2 w-20 sm:w-24 h-auto object-contain"
         />
      ))}
   </Marquee>
)

export default MiniCarrouselSection
