import { Blog, Dashboard, Faq, Home, Services, PostsPanel, PostForm } from './pages'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import ClientLayout from '@shared/ClientLayout'
import AdminLayout from '@shared/AdminLayout'

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
               <Route path="posts" element={<PostsPanel />} />
               <Route path="posts/:idPost" element={<PostForm />} />
               <Route path="*" element={<div>404 Not Found</div>} />
            </Route>
         </Routes>
      </BrowserRouter>
   )
}
export default Router
