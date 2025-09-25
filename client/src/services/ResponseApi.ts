import { Testimonial } from '@models/Testimonial.model'

export interface ResponseApi {
   message: string

   testimonial: Testimonial
   testimonials: Testimonial[]

   categories: Record<string, string>
}
