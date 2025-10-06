export const NOT_FOUND_MESSAGES: Record<string, string> = {
   Testimonial: 'El testimonio no existe',
   Post: 'El post no existe',
   Client: 'El cliente no existe',
   ServiceRequest: 'La solicitud de servicio no existe',
}

export const UNIQUE_CONSTRAINT_MESSAGES: Record<string, string> = {
   Testimonial: 'Ya existe un testimonio con estas características',
   Post: 'Ya existe un post con estas características',
   Client: 'Ya existe un cliente con estos datos',
   ServiceRequest: 'Ya existe una solicitud de servicio con estos datos',
}

export const FOREIGN_KEY_CONSTRAINT_MESSAGES: Record<string, string> = {
   Testimonial: 'El testimonio referenciado no existe',
   Client: 'El cliente referenciado no existe',
   Post: 'El post referenciado no existe',
   ServiceRequest: 'La solicitud de servicio referenciada no existe',
}
