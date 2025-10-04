import { Testimonial } from '@models/Testimonial.model'
import { ServiceRequest } from '@models/Request.model'
import { Post } from '@models/Post.model'

export interface ResponseApi {
   message: string

   testimonial: Testimonial
   testimonials: Testimonial[]

   post: Post
   posts: Post[]
   categories: Record<string, string>

   request: ServiceRequest
   requests: ServiceRequest[]
}
