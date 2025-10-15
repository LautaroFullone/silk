import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { routesConfig } from '@config/routesConfig'
import ClientLayout from '@layouts/Client.layout'
import AdminLayout from '@layouts/Admin.layout'
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
   NotFound,
   Quiz,
} from './pages'

const Router = () => {
   return (
      <BrowserRouter>
         <Routes>
            {/* CLIENT Routes */}
            <Route path={routesConfig.CLIENT_HOME} element={<ClientLayout />}>
               <Route index element={<Home />} />

               <Route path={routesConfig.CLIENT_BLOG} element={<Blog />} />

               <Route path={routesConfig.CLIENT_QUIZ} element={<Quiz />} />

               <Route path={routesConfig.CLIENT_SERVICES} element={<Services />} />

               {/* <Route path={routesConfig.CLIENT_FAQ} element={<Faq />} /> */}
               <Route path={routesConfig.CLIENT_ABOUT} element={<div>About Page</div>} />

               <Route path="*" element={<Navigate to={routesConfig.CLIENT_HOME} />} />
            </Route>

            {/* ADMIN Routes */}
            <Route path={routesConfig.ADMIN_DASHBOARD} element={<AdminLayout />}>
               <Route index element={<Dashboard />} />

               <Route path={routesConfig.ADMIN_POST_LIST}>
                  <Route index element={<PostsPanel />} />
                  <Route path={routesConfig.ADMIN_POST_NEW} element={<PostForm />} />
                  <Route path={routesConfig.ADMIN_POST_EDIT} element={<PostForm />} />
               </Route>

               <Route path={routesConfig.ADMIN_TESTIMONIAL_LIST}>
                  <Route index element={<TestimonialsPanel />} />
                  <Route
                     path={routesConfig.ADMIN_TESTIMONIAL_NEW}
                     element={<TestimonialForm />}
                  />
                  <Route
                     path={routesConfig.ADMIN_TESTIMONIAL_EDIT}
                     element={<TestimonialForm />}
                  />
               </Route>

               <Route path={routesConfig.ADMIN_REQUEST_LIST}>
                  <Route index element={<RequestsPanel />} />
               </Route>

               <Route path="*" element={<NotFound />} />
            </Route>
         </Routes>
      </BrowserRouter>
   )
}
export default Router
