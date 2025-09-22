export const NOT_FOUND_MESSAGES: Record<string, string> = {
   Testimonial: 'El testimonio no existe',
   Client: 'El cliente no existe',
}

export const UNIQUE_CONSTRAINT_MESSAGES: Record<string, string> = {
   Testimonial: 'Ya existe un testimonio con estas características',
   Client: 'Ya existe un cliente con estos datos',
}

export const FOREIGN_KEY_CONSTRAINT_MESSAGES: Record<string, string> = {
   Testimonial: 'El testimonio referenciado no existe',
   Client: 'El cliente referenciado no existe',
}
