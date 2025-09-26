import multer from 'multer'

const IMAGE_MAX_MB = 3

export const uploadImage = multer({
   storage: multer.memoryStorage(),
   limits: { fileSize: IMAGE_MAX_MB * 1024 * 1024 },
   fileFilter: (_req, file, cb) => {
      const ok = file.mimetype.startsWith('image/')
      cb(ok ? null : new Error('Formato de imagen inválido'), ok)
   },
})
