import Blog from './components/Blog'
import HeroSection from './components/HeroSection'
import ConfidenceSection from './components/ConfidenceSection'
import FindStyleSection from './components/FindStyleSection'
import MiniCarrouselSection from './components/MiniCarrouselSection'

const Home = () => {
   return (
      <>
         <HeroSection />
         <FindStyleSection />
         <MiniCarrouselSection />
         <ConfidenceSection />
         <Blog />
         {/*<Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} /> */}
      </>
   )
}
export default Home
