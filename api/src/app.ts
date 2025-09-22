import testimonialsRouter from './routes/testimonials.router'
import express from 'express'
import morgan from 'morgan'
import dotenv from 'dotenv'
import cors from 'cors'

dotenv.config()

const PORT = process.env.PORT || 3031
const app = express()

app.use(express.json())
app.use(cors())

app.use(morgan('dev'))

app.use('/api/testimonials', testimonialsRouter)

app.listen(PORT, () => {
   console.log(`🚀 Server running on http://localhost:${PORT}`)
})
