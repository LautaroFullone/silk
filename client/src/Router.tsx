import { BrowserRouter, Routes, Route } from 'react-router-dom'
import ClientLayout from '@shared/ClientLayout'
import AdminLayout from '@shared/AdminLayout'
import { AdminBlogs, Blogs, Dashboard, Faq, Home, Services } from './pages'

const Router = () => {
   return (
      <BrowserRouter>
         <Routes>
            <Route path="/" element={<ClientLayout />}>
               <Route index element={<Home />} />
               <Route path="blogs" element={<Blogs />} />
               <Route path="servicios" element={<Services />} />
               <Route path="preguntas-frecuentes" element={<Faq />} />
               <Route path="nosotros" element={<div>About Page</div>} />
               <Route path="*" element={<div>404 Not Found</div>} />
            </Route>

            <Route path="/admin" element={<AdminLayout />}>
               <Route index element={<Dashboard />} />
               <Route path="blogs" element={<AdminBlogs />} />
               <Route path="*" element={<div>404 Not Found</div>} />
            </Route>
         </Routes>
      </BrowserRouter>
   )
}
export default Router
