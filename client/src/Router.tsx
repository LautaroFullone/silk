import { BrowserRouter, Routes, Route } from 'react-router-dom'
import ClientLayout from '@shared/ClientLayout'
import AdminLayout from '@shared/AdminLayout'
import {
   Blog,
   Dashboard,
   Faq,
   Home,
   Services,
   PostsPanel,
   PostForm,
   TestimonialsPanel,
   TestimonialForm,
} from './pages'

const Router = () => {
   return (
      <BrowserRouter>
         <Routes>
            <Route path="/" element={<ClientLayout />}>
               <Route index element={<Home />} />
               <Route path="blog" element={<Blog />} />
               <Route path="servicios" element={<Services />} />
               <Route path="preguntas-frecuentes" element={<Faq />} />
               <Route path="nosotros" element={<div>About Page</div>} />
               <Route path="*" element={<div>404 Not Found</div>} />
            </Route>

            <Route path="/admin" element={<AdminLayout />}>
               <Route index element={<Dashboard />} />

               <Route path="posts">
                  <Route index element={<PostsPanel />} />
                  <Route path="form" element={<PostForm />} />
               </Route>

               <Route path="testimonials">
                  <Route index element={<TestimonialsPanel />} />
                  <Route path="form" element={<TestimonialForm />} />
               </Route>

               {/* <Route path="products">
                  <Route index element={<ProductsPanel />} />
                  <Route path="form" element={<ProductForm />} />
               </Route> */}

               <Route path="*" element={<div>404 Not Found</div>} />
            </Route>
         </Routes>
      </BrowserRouter>
   )
}
export default Router
