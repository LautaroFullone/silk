import multer from 'multer'

const IMAGE_MAX_MB = 5 // Incrementamos para imágenes no optimizadas

const ALLOWED_MIME_TYPES = [
   'image/jpeg',
   'image/jpg', 
   'image/png',
   'image/webp'
]

export const uploadImage = multer({
   storage: multer.memoryStorage(),
   limits: { 
      fileSize: IMAGE_MAX_MB * 1024 * 1024,
      files: 1 // Solo un archivo por request
   },
   fileFilter: (_req, file, cb) => {
      if (!ALLOWED_MIME_TYPES.includes(file.mimetype)) {
         cb(new Error(`Formato no permitido. Usa: ${ALLOWED_MIME_TYPES.join(', ')}`))
         return
      }
      cb(null, true)
   },
})
