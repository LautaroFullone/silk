import Blog from './components/Blog'
import Quiz from './components/Quiz'
import HeroSection from './components/HeroSection'
import ConfidenceSection from './components/ConfidenceSection'

const Home = () => {
   return (
      <>
         <HeroSection />
         <Quiz />
         <ConfidenceSection />
         <Blog />
         {/*<Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} /> */}
      </>
   )
}
export default Home
