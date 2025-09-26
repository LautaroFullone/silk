import { de } from 'zod/v4/locales/index.cjs'

/**
 * Obtener la extensión de una imagen a partir de su mime type
 * @param mime mime type de la imagen
 * @returns extensión de la imagen (jpg, png, webp)
 */
function getImageExt(mime: string): 'jpg' | 'png' | 'webp' {
   if (mime === 'image/png') return 'png'
   if (mime === 'image/webp') return 'webp'

   return 'jpg'
}

export default getImageExt
