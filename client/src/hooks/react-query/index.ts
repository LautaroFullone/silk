import useCreateTestimonial from './Testimonials/useCreateTestimonial'
import useDeleteTestimonial from './Testimonials/useDeleteTestimonial'
import useFetchTestimonials from './Testimonials/useFetchTestimonials'
import useFetchTestimonial from './Testimonials/useFetchTestimonial'
import useUpdateTestimonial from './Testimonials/useUpdateTestimonial'

import useCreateRequest from './Requests/useCreateRequest'
import useDeleteRequests from './Requests/useDeleteRequests'
import useFetchRequestDetails from './Requests/useFetchRequestDetails'
import useFetchRequests from './Requests/useFetchRequests'

import useCreatePost from './Posts/useCreatePost'
import useDeletePost from './Posts/useDeletePost'
import useFetchPosts from './Posts/useFetchPosts'
import useFetchPost from './Posts/useFetchPost'
import useUpdatePost from './Posts/useUpdatePost'

export {
   // Testimonials
   useCreateTestimonial,
   useDeleteTestimonial,
   useFetchTestimonials,
   useFetchTestimonial,
   useUpdateTestimonial,

   // Requests
   useCreateRequest,
   useFetchRequestDetails,
   useDeleteRequests,
   useFetchRequests,

   // Posts
   useCreatePost,
   useDeletePost,
   useFetchPosts,
   useFetchPost,
   useUpdatePost,
}
