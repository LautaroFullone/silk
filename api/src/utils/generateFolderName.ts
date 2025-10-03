/**
 * Genera un nombre de carpeta seguro y legible a partir de un título.
 * @param title El título a convertir.
 * @returns El nombre de carpeta generado.
 */
export const generateFolderName = (title: string): string => {
   return title
      .toLowerCase() // Convertir a minúsculas
      .trim() // Eliminar espacios al inicio y final
      .replace(/[áàäâ]/g, 'a') // Reemplazar acentos
      .replace(/[éèëê]/g, 'e')
      .replace(/[íìïî]/g, 'i')
      .replace(/[óòöô]/g, 'o')
      .replace(/[úùüû]/g, 'u')
      .replace(/ñ/g, 'n')
      .replace(/[^a-z0-9\s-]/g, '') // Eliminar caracteres especiales excepto espacios y guiones
      .replace(/\s+/g, '-') // Reemplazar espacios con guiones
      .replace(/-+/g, '-') // Reemplazar múltiples guiones con uno solo
      .replace(/^-|-$/g, '') // Eliminar guiones al inicio y final
}
