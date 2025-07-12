import useDinamicHeight from '@hooks/useDinamicHeight'
import { Outlet } from 'react-router-dom'
import Header from './Header'
import Footer from './Footer'

const ClientLayout = () => {
   const { ref: headerRef, height: headerHeight } = useDinamicHeight()

   return (
      <div className="font-acumin text-tertiary flex flex-col min-h-screen">
         <Header ref={headerRef} />

         <main
            className="flex-1 transition-[margin] duration-500"
            style={{ marginTop: headerHeight }}
         >
            <Outlet />
         </main>

         <Footer />
      </div>
   )
}
export default ClientLayout
