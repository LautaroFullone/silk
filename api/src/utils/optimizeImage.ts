import sharp from 'sharp'

export interface OptimizeImageOptions {
   maxWidth?: number
   maxHeight?: number
   quality?: number
   format?: 'webp' | 'jpeg' | 'png'
}

/**
 * Optimiza una imagen usando Sharp
 * @param buffer Buffer de la imagen original
 * @param options Opciones de optimización
 * @returns Buffer optimizado y extensión del archivo
 */
export async function optimizeImage(buffer: Buffer, options: OptimizeImageOptions = {}) {
   const { maxWidth = 800, maxHeight = 600, quality = 100, format = 'webp' } = options

   try {
      let sharpInstance = sharp(buffer)

      // Redimensionar manteniendo aspect ratio
      sharpInstance = sharpInstance.resize(maxWidth, maxHeight, {
         fit: 'inside',
         withoutEnlargement: true,
      })

      // Aplicar formato y calidad
      let optimizedBuffer: Buffer
      let extension: string

      switch (format) {
         case 'webp':
            optimizedBuffer = await sharpInstance.webp({ quality }).toBuffer()
            extension = 'webp'
            break

         case 'jpeg':
            optimizedBuffer = await sharpInstance.jpeg({ quality }).toBuffer()
            extension = 'jpg'
            break

         case 'png':
            optimizedBuffer = await sharpInstance.png({ quality }).toBuffer()
            extension = 'png'
            break

         default:
            throw new Error(`Formato no soportado: ${format}`)
      }

      return { buffer: optimizedBuffer, extension }
   } catch (error) {
      console.error('Error optimizando imagen:', error)
      // Si falla la optimización, devolver imagen original
      const originalExt = getOriginalExtension(buffer)
      return { buffer, extension: originalExt }
   }
}

/**
 * Obtiene la extensión original de una imagen basándose en sus magic bytes
 */
function getOriginalExtension(buffer: Buffer): string {
   // Verificar magic bytes para determinar el formato
   if (buffer[0] === 0xff && buffer[1] === 0xd8) return 'jpg'
   if (buffer[0] === 0x89 && buffer[1] === 0x50) return 'png'
   if (buffer[0] === 0x52 && buffer[1] === 0x49) return 'webp'

   // Fallback
   return 'jpg'
}
