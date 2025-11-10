import { lazy } from 'react'

// Landing Pages - Lazy Loading
const About = lazy(() => import('./Landing/About/About.page'))
const Blog = lazy(() => import('./Landing/Blog/Blog.page'))
const PostDetails = lazy(() => import('./Landing/Blog/PostDetails.page'))
const Home = lazy(() => import('./Landing/Home/Home.page'))
const Quiz = lazy(() => import('./Landing/Quiz/Quiz.page'))
const Services = lazy(() => import('./Landing/Services/Services.page'))

// Admin Pages - Lazy Loading
const Login = lazy(() => import('./Admin/Auth/Login.page'))
const Dashboard = lazy(() => import('./Admin/Dashboard/Dashboard.page'))
const PostsPanel = lazy(() => import('./Admin/Posts/PostsPanel.page'))
const PostForm = lazy(() => import('./Admin/Posts/PostForm.page'))
const TestimonialsPanel = lazy(
   () => import('./Admin/Testimonials/TestimonialsPanel.page')
)
const TestimonialForm = lazy(() => import('./Admin/Testimonials/TestimonialForm.page'))
const RequestsPanel = lazy(() => import('./Admin/Requests/RequestsPanel.page'))
const NotFound = lazy(() => import('./Admin/NotFound.page'))

export {
   About,
   Blog,
   PostDetails,
   Home,
   Quiz,
   Login,
   Services,
   Dashboard,
   PostsPanel,
   PostForm,
   TestimonialsPanel,
   TestimonialForm,
   RequestsPanel,
   NotFound,
}
