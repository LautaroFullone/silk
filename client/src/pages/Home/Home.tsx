import { useState } from 'react'
import Banner from './components/Banner'
import Blog from './components/Blog'
import Modal from './components/Modal'
import Quiz from './components/Quiz'
import Section from './components/Section'

const Home = () => {
   const [isModalOpen, setIsModalOpen] = useState(false)

   return (
      <>
         <Banner onOpenModal={() => setIsModalOpen(true)} />
         <Quiz />
         <Section />
         <Blog />
         <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
      </>
   )
}
export default Home
