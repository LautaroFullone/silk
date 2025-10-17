import useDinamicHeight from '@hooks/useDinamicHeight'
import NavbarClient from './components/NavbarClient'
import FooterClient from './components/FooterClient'
import { Outlet } from 'react-router-dom'

const ClientLayout = () => {
   const { ref: headerRef, height: headerHeight } = useDinamicHeight()

   return (
      <div className="font-acumin text-silk-tertiary flex flex-col min-h-screen bg-silk-secondary">
         <NavbarClient ref={headerRef} />

         <main
            className="flex-1 transition-[margin] duration-300 bg-silk-tertiary"
            style={{ marginTop: headerHeight }}
         >
            <Outlet />
         </main>

         <FooterClient />
      </div>
   )
}
export default ClientLayout
