export interface ServiceRequest {
   id: string
   name: string
   email: string
   phone: string
   age: number
   date: string
   services: string[]
   budget: string
   status: 'pending' | 'contacted' | 'contracted' | 'cancelled'
   formData: {
      occupation: string
      location: string
      goals: string
      experience: string
      preferences: string
      availability: string
      additionalInfo: string
   }
}
