import { Outlet } from 'react-router-dom'
import Header from './Header'
import Footer from './Footer'

const ClientLayout = () => {
   return (
      <>
         <Header />

         {/* <main className="flex-1">
            <div className="container px-4 mx-auto"> */}
         <Outlet />
         {/* </div>
         </main> */}

         <Footer />
      </>
   )
}
export default ClientLayout
