import { MockTestimonialsSection } from '../Testimonials/components'
import MiniCarrouselSection from './components/MiniCarrouselSection'
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
         <FindStyleSection />
         <MockTestimonialsSection
            title="Testimonios que inspiran"
            subtitle="Lo que dicen nuestros clientes sobre su transformación"
            showOnlyHighlighted={false}
         />
         {/* <TestimonialsSection
            title="Testimonios que inspiran"
            subtitle="Lo que dicen nuestros clientes sobre su transformación"
            maxItems={6}
            showOnlyHighlighted={false}
            backgroundColor="white"
         /> */}
         <PostsSection />
      </>
   )
}
export default Home
