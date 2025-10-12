/**
 * Convierte una fecha a formato relativo en español
 *
 * @param dateInput - Fecha en string o Date (UTC, ej: Supabase)
 * @returns string - "Hace X días", "Hace X horas", "Hace unos minutos", etc.
 */
export function formatRelativeTime(dateInput: string | Date | null | undefined): string {
   if (!dateInput) return ''

   const date = typeof dateInput === 'string' ? new Date(dateInput) : dateInput
   const now = new Date()
   const diffMs = now.getTime() - date.getTime()

   // Convertir a diferentes unidades
   const diffMinutes = Math.floor(diffMs / (1000 * 60))
   const diffHours = Math.floor(diffMs / (1000 * 60 * 60))
   const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24))
   const diffWeeks = Math.floor(diffDays / 7)
   const diffMonths = Math.floor(diffDays / 30)
   const diffYears = Math.floor(diffDays / 365)

   // Futuro (fecha posterior a ahora)
   if (diffMs < 0) {
      const absDiffDays = Math.abs(diffDays)
      const absDiffHours = Math.abs(diffHours)
      const absDiffMinutes = Math.abs(diffMinutes)

      if (absDiffDays > 0) {
         return absDiffDays === 1 ? 'En 1 día' : `En ${absDiffDays} días`
      }
      if (absDiffHours > 0) {
         return absDiffHours === 1 ? 'En 1 hora' : `En ${absDiffHours} horas`
      }
      if (absDiffMinutes > 0) {
         return absDiffMinutes === 1 ? 'En 1 minuto' : `En ${absDiffMinutes} minutos`
      }
      return 'En unos momentos'
   }

   // Pasado
   if (diffYears > 0) {
      return diffYears === 1 ? 'Hace 1 año' : `Hace ${diffYears} años`
   }

   if (diffMonths > 0) {
      return diffMonths === 1 ? 'Hace 1 mes' : `Hace ${diffMonths} meses`
   }

   if (diffWeeks > 0) {
      return diffWeeks === 1 ? 'Hace 1 semana' : `Hace ${diffWeeks} semanas`
   }

   if (diffDays > 0) {
      return diffDays === 1 ? 'Hace 1 día' : `Hace ${diffDays} días`
   }

   if (diffHours > 0) {
      return diffHours === 1 ? 'Hace 1 hora' : `Hace ${diffHours} horas`
   }

   if (diffMinutes > 0) {
      return diffMinutes === 1 ? 'Hace 1 minuto' : `Hace ${diffMinutes} minutos`
   }

   return 'Hace unos momentos'
}
