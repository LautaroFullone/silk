import MiniCarrouselSection from './components/MiniCarrouselSection'
import ConfidenceSection from './components/ConfidenceSection'
import FindStyleSection from './components/FindStyleSection'
import BlogsSection from './components/BlogsSection'
import HeroSection from './components/HeroSection'

const Home = () => {
   return (
      <>
         <HeroSection />
         <FindStyleSection />
         <MiniCarrouselSection />
         <ConfidenceSection />
         <BlogsSection />
         {/*<Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} /> */}
      </>
   )
}
export default Home
