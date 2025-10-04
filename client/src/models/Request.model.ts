export type RequestStatus = 'PENDING' | 'CONTACTED' | 'CONTRACTED' | 'CANCELLED'

export interface ServiceRequest {
   id: string
   name: string
   age: number
   email: string
   ubication: string
   phone: string
   services: string[]
   budget: string
   startMoment: string
   status: RequestStatus
   createdAt: string
}
