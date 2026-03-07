import 'dotenv/config'
import express from 'express'
import cors from 'cors'
import mongoose from 'mongoose'

import articleRoutes from './routes/articles.js'
import portfolioRoutes from './routes/portfolio.js'
import galleryRoutes from './routes/gallery.js'
import uploadRoutes from './routes/upload.js'
import contactRoutes from './routes/contacts.js'
import authRoutes from './routes/auth.js'
import userRoutes from './routes/users.js'

const app = express()
const PORT = process.env.PORT || 5000

// ---- Middleware ---- //
app.use(cors({
    origin: process.env.CLIENT_URL || 'http://localhost:3000',
    credentials: true,
}))
app.use(express.json({ limit: '10mb' }))
app.use(express.urlencoded({ extended: true }))

// ---- Routes ---- //
app.use('/api/articles', articleRoutes)
app.use('/api/portfolio', portfolioRoutes)
app.use('/api/gallery', galleryRoutes)
app.use('/api/upload', uploadRoutes)
app.use('/api/contacts', contactRoutes)
app.use('/api/auth', authRoutes)
app.use('/api/users', userRoutes)

// ---- Health Check ---- //
app.get('/api/health', (req, res) => {
    res.json({ status: 'ok', message: 'C&P Building API is running 🚀', time: new Date() })
})

// ---- Error Handler ---- //
app.use((err, req, res, next) => {
    console.error(err.stack)
    res.status(err.status || 500).json({
        message: err.message || 'Internal Server Error',
        ...(process.env.NODE_ENV === 'development' && { stack: err.stack }),
    })
})

// ---- Connect to MongoDB then start server ---- //
mongoose.connect(process.env.MONGODB_URI)
    .then(() => {
        console.log('✅ MongoDB connected')
        app.listen(PORT, () => {
            console.log(`🚀 Server running on http://localhost:${PORT}`)
        })
    })
    .catch(err => {
        console.error('❌ MongoDB connection failed:', err.message)
        process.exit(1)
    })
