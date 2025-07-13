import Marquee from 'react-fast-marquee'

const quizImages = [
   'Gorra - Cher.png',
   'Sandalias - Battlo.png',
   'Anita Ko - Pinky Zodiac Ring.png',
   'Adidas - Beige Sambas.png',
   'Bottega Veneta - Large Hop Black Bag.png',
]

const MiniCarrouselSection = () => {
   const images = [...quizImages, ...quizImages, ...quizImages, ...quizImages]

   return (
      <div className="flex justify-center">
         <div className="w-full sm:max-w-5xl py-10">
            <Marquee gradient={false} speed={30}>
               {images.map((img, i) => (
                  <img
                     key={img + i}
                     src={`/${img}`}
                     alt={`Prenda ${i + 1}`}
                     className={`ml-4 w-[80px] sm:w-[100px] h-auto object-contain`}
                  />
               ))}
            </Marquee>
         </div>
      </div>
   )
}

export default MiniCarrouselSection
