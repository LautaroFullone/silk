import Marquee from 'react-fast-marquee'

const miniImages = [
   'cher-cap-mini.png',
   'battlo-sandals-mini.png',
   'anita-ring-mini.png',
   'adidas-shoes-mini.png',
   'bottega-bag-mini.png',
]

const MiniCarrouselSection = () => (
   <div className="flex justify-center">
      <div className="w-full sm:max-w-5xl py-10">
         <Marquee autoFill gradient={false} speed={30} loop={0}>
            {miniImages.map((img, i) => (
               <img
                  key={img + i}
                  src={`/mini-images/${img}`}
                  alt={`Prenda ${i + 1}`}
                  className={`ml-4 w-[80px] sm:w-[100px] h-auto object-contain`}
               />
            ))}
         </Marquee>
      </div>
   </div>
)

export default MiniCarrouselSection
