import MiniCarrouselSection from './components/MiniCarrouselSection'
import ConfidenceSection from './components/ConfidenceSection'
import FindStyleSection from './components/FindStyleSection'
import PostsSection from './components/PostsSection'
import HeroSection from './components/HeroSection'
import { MockTestimonialsSection, TestimonialsSection } from '../Testimonials/components'

const Home = () => {
   return (
      <>
         <HeroSection />
         <FindStyleSection />
         <MiniCarrouselSection />
         <ConfidenceSection />
         <MockTestimonialsSection
            title="Testimonios que inspiran"
            subtitle="Lo que dicen nuestros clientes sobre su transformación"
            maxItems={6}
            showOnlyHighlighted={false}
            backgroundColor="white"
         />
         <TestimonialsSection
            title="Testimonios que inspiran"
            subtitle="Lo que dicen nuestros clientes sobre su transformación"
            maxItems={6}
            showOnlyHighlighted={false}
            backgroundColor="white"
         />
         <PostsSection />
      </>
   )
}
export default Home
