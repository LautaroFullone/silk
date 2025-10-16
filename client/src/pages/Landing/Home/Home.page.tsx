import MiniCarrouselSection from './components/MiniCarrouselSection'
import TestimonialsSection from './components/TestimonialsSection'
import ConfidenceSection from './components/ConfidenceSection'
import FindStyleSection from './components/FindStyleSection'
import PostsSection from './components/PostsSection'
import HeroSection from './components/HeroSection'

const Home = () => {
   return (
      <>
         <HeroSection />
         <MiniCarrouselSection />
         <ConfidenceSection />
         <TestimonialsSection />
         <FindStyleSection />
         <PostsSection />
      </>
   )
}
export default Home
