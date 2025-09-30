export interface Testimonial {
   id: string
   personName: string
   personRole: string
   description: string
   isHighlight: boolean
   isActive: boolean
   avatarImagePath?: string
}

export interface TestimonialFormData {
   personName: string
   personRole: string
   description: string
   isHighlight: boolean
   isActive: boolean
   avatarFile?: File
}
