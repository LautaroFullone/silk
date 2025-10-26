import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import ProtectedRoute from './components/ProtectedRoute'
import { routesConfig } from '@config/routesConfig'
import ClientLayout from '@layouts/Client.layout'
import AdminLayout from '@layouts/Admin.layout'
import AuthLayout from '@layouts/AuthLayout'
import { ScrollToTop } from '@shared'
import {
   About,
   Blog,
   Dashboard,
   Home,
   Services,
   PostsPanel,
   PostForm,
   TestimonialsPanel,
   TestimonialForm,
   RequestsPanel,
   NotFound,
   Quiz,
   PostDetails,
   Login,
} from './pages'

const Router = () => (
   <BrowserRouter>
      <ScrollToTop />
      <Routes>
         {/* CLIENT Routes */}
         <Route path={routesConfig.CLIENT_HOME} element={<ClientLayout />}>
            <Route index element={<Home />} />

            <Route path={routesConfig.CLIENT_BLOG}>
               <Route index element={<Blog />} />
               <Route path={routesConfig.CLIENT_BLOG_POST} element={<PostDetails />} />
            </Route>

            <Route path={routesConfig.CLIENT_QUIZ} element={<Quiz />} />
            <Route path={routesConfig.CLIENT_SERVICES} element={<Services />} />
            <Route path={routesConfig.CLIENT_ABOUT} element={<About />} />
            <Route path="*" element={<Navigate to={routesConfig.CLIENT_HOME} />} />
         </Route>

         {/* AUTH Routes */}
         <Route element={<AuthLayout />}>
            <Route path={routesConfig.ADMIN_LOGIN} element={<Login />} />
         </Route>

         {/* ADMIN Routes | Protected */}
         <Route
            path={routesConfig.ADMIN_DASHBOARD}
            element={
               <ProtectedRoute>
                  <AdminLayout />
               </ProtectedRoute>
            }
         >
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

export default Router
