import { RequestStatus } from '@prisma/client'

export interface TimelineEvent {
   id: string
   title: string
   description: string
   date: string
   type: RequestStatus
}

export const generateTimelineEvent = (
   currentTimeline: TimelineEvent[],
   eventType: RequestStatus,
   customDescription?: string
) => {
   const now = new Date().toISOString()
   let newEvent: TimelineEvent

   switch (eventType) {
      case 'PENDING':
         newEvent = {
            id: `event-${Date.now()}`,
            title: 'Solicitud recibida',
            description: customDescription || 'Formulario completado por el cliente',
            date: now,
            type: 'PENDING',
         }
         break

      case 'CONTACTED':
         newEvent = {
            id: `event-${Date.now()}`,
            title: 'Cliente contactado',
            description: customDescription || 'Primer contacto realizado',
            date: now,
            type: 'CONTACTED',
         }
         break

      case 'CONTRACTED':
         newEvent = {
            id: `event-${Date.now()}`,
            title: 'Servicio contratado',
            description: customDescription || 'Cliente ha contratado el servicio',
            date: now,
            type: 'CONTRACTED',
         }
         break

      case 'CANCELLED':
         newEvent = {
            id: `event-${Date.now()}`,
            title: 'Solicitud cancelada',
            description: customDescription || 'La solicitud ha sido cancelada',
            date: now,
            type: 'CANCELLED',
         }
         break

      default:
         return currentTimeline
   }

   return [...currentTimeline, newEvent]
}
