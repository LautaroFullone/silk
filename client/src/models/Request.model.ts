export type RequestStatus = 'PENDING' | 'CONTACTED' | 'CONTRACTED' | 'CANCELLED'

export interface TimelineEvent {
   id: string
   title: string
   description: string
   date: string
   type: RequestStatus
}

export interface ServiceRequest {
   id: string
   name: string
   age: number
   email: string
   ubication: string
   phone: string
   service: string
   budget: string
   startMoment: string
   timeline: TimelineEvent[]
   status: RequestStatus
   createdAt: string
   updatedAt?: string
}

export type ServiceRequestFormData = Omit<
   ServiceRequest,
   'id' | 'createdAt' | 'status' | 'timeline' | 'updatedAt'
>
