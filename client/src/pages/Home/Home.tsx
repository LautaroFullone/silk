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
         <h1 className="font-acuminprosemibold text-4xl">SILK</h1>
         <p className="font-acuminprosemibold">construimos confianza</p>
         <h2 className="font-classy tracking-wide">Asesoría</h2>

         <p className="font-acumin text-base">Texto base con Acumin Pro</p>
         <p className="font-acuminBold">Negrita</p>
         <p className="font-acuminThin">Thin</p>
         <p className="font-bodoni italic">Con Bodoni Moda</p>
         <Quiz />
         <Section />
         <Blog />
         <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
      </>
   )
}
export default Home
