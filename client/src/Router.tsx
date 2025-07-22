import { BrowserRouter, Routes, Route } from 'react-router-dom'
import ClientLayout from '@shared/ClientLayout/ClientLayout'
import ServicesPage from '@pages/Services/Services.page'
import HomePage from '@pages/Home/Home.page'
import FaqPage from '@pages/Faq/Faq.page'
import BlogsPage from '@pages/Blogs/Blog.page'

const Router = () => {
   return (
      <BrowserRouter>
         <Routes>
            <Route element={<ClientLayout />}>
               <Route path="/" element={<HomePage />} />
               <Route path="/blogs" element={<BlogsPage />} />
               <Route path="/servicios" element={<ServicesPage />} />
               <Route path="/preguntas-frecuentes" element={<FaqPage />} />
               <Route path="/nosotros" element={<div>About Page</div>} />
               <Route path="*" element={<div>404 Not Found</div>} />
            </Route>
         </Routes>
      </BrowserRouter>
   )
}
export default Router
