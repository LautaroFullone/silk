import { Post } from '@models/Post.model'
import { Testimonial } from '@models/Testimonial.model'

export interface ResponseApi {
   message: string

   testimonial: Testimonial
   testimonials: Testimonial[]

   post: Post
   posts: Post[]

   categories: Record<string, string>
}
