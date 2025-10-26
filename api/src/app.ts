import dotenv from 'dotenv'
dotenv.config() // Cargar variables de entorno al inicio para envitar errores

import serviceRequestsRouter from './routes/serviceRequests.router'
import testimonialsRouter from './routes/testimonials.router'
import dashboardRouter from './routes/dashboard.router'
import postsRouter from './routes/posts.router'
import express from 'express'
import morgan from 'morgan'
import cors from 'cors'

const PORT = process.env.PORT || 3031
const app = express()

app.use(express.json())

// CORS configuration
const corsOptions = {
   origin: process.env.NODE_ENV === 'production' 
      ? process.env.FRONTEND_URL 
      : ['http://localhost:5173', 'http://localhost:5174', 'http://127.0.0.1:5173', 'http://127.0.0.1:5174'],
   credentials: true,
}
app.use(cors(corsOptions))

// Morgan logging - only in development
if (process.env.NODE_ENV !== 'production') {
   app.use(morgan('dev'))
}

app.use('/api/posts', postsRouter)
app.use('/api/service-requests', serviceRequestsRouter)
app.use('/api/testimonials', testimonialsRouter)
app.use('/api/dashboard', dashboardRouter)

app.listen(PORT, () => {
   console.log(`🚀 Server running on http://localhost:${PORT}`)
})
