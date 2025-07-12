import Blog from './components/Blog'
import HeroSection from './components/HeroSection'
import ConfidenceSection from './components/ConfidenceSection'
import FindStyleSection from './components/FindStyleSection'

const quizImages = [
   'Gorra - Cher.png',
   'Sandalias - Battlo.png',
   'Anita Ko - Pinky Zodiac Ring.png',
   'Adidas - Beige Sambas.png',
   'Bottega Veneta - Large Hop Black Bag.png',
]

const Home = () => {
   return (
      <>
         <HeroSection />
         <FindStyleSection />

         <div className="w-full h-[250px] bg-tertiary flex justify-center items-center gap-20 mt-10">
            {quizImages.map((img, i) => (
               <div key={i} className="flex justify-center items-center">
                  <img
                     src={`/${img}`}
                     alt={`Prenda ${i + 1}`}
                     className="w-[100px] h-auto object-contain transition-transform duration-300 hover:scale-120"
                  />
               </div>
            ))}
         </div>

         <ConfidenceSection />
         <Blog />
         {/*<Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} /> */}
      </>
   )
}
export default Home
