import Home from '@pages/Home/Home'
import ClientLayout from '@shared/ClientLayout/ClientLayout'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

const Router = () => {
   return (
      <BrowserRouter>
         <Routes>
            <Route element={<ClientLayout />}>
               <Route path="/" element={<Home />} />
               <Route path="/blogs" element={<div>Blogs Page</div>} />
               <Route path="/servicios" element={<div>About Page</div>} />
               <Route path="/nosotros" element={<div>About Page</div>} />
               <Route path="*" element={<div>404 Not Found</div>} />
            </Route>
         </Routes>
      </BrowserRouter>
   )
}
export default Router
