import { Outlet } from 'react-router-dom'
import Header from './Header'
import Footer from './Footer'

const ClientLayout = () => {
   return (
      <div className="font-acumin text-tertiary flex flex-col min-h-screen">
         <Header />

         <main className="flex-1">
            <Outlet />
         </main>

         <Footer />
      </div>
   )
}
export default ClientLayout
