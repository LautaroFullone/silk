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
   RequestsPanel,
} from './pages'

const Router = () => {
   return (
      <BrowserRouter>
         <Routes>
            <Route path="/" element={<ClientLayout />}>
               <Route index element={<Home />} />
               <Route path="blog" element={<Blog />} />
               <Route
                  path="quiz"
                  element={<div className="flex justify-center text-primary">Quiz</div>}
               />
               <Route path="servicios" element={<Services />} />
               <Route path="preguntas-frecuentes" element={<Faq />} />
               <Route path="nosotros" element={<div>About Page</div>} />
               <Route
                  path="*"
                  element={
                     <div className="flex justify-center text-primary">404 Not Found</div>
                  }
               />
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

               <Route path="requests">
                  <Route index element={<RequestsPanel />} />
               </Route>

               <Route
                  path="*"
                  element={
                     <div className="flex justify-center text-secondary">
                        404 Not Found
                     </div>
                  }
               />
            </Route>
         </Routes>
      </BrowserRouter>
   )
}
export default Router
