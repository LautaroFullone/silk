import { useState } from 'react'
import Blog from './components/Blog'
import Modal from './components/Modal'
import Quiz from './components/Quiz'
import Section from './components/Section'
import HeroSection from './components/HeroSection'
import SectionCopy from './components/Section copy'

const Home = () => {
   const [isModalOpen, setIsModalOpen] = useState(false)

   return (
      <>
         <HeroSection onOpenModal={() => setIsModalOpen(true)} />
         <Quiz />
         {/* <Section /> */}
         <SectionCopy />
         <Blog />
         <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
      </>
   )
}
export default Home
