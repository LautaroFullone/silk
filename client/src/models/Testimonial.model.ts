export interface Testimonial {
   id: string
   personName: string
   personRole: string
   description: string
   image: string
   isHighlight: boolean
   isActive: boolean
   avatarImagePath?: string
}

export interface TestimonialFormData {
   personName: string
   personRole: string
   description: string
   image?: string
   imageFile?: File
   isHighlight: boolean
   isActive: boolean
   avatarFile?: File
}
