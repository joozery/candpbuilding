import express from 'express'
import asyncHandler from 'express-async-handler'
import { uploadMiddleware, uploadToCloudinary, uploadManyToCloudinary, deleteImage } from '../middleware/upload.js'

const router = express.Router()

// POST /api/upload/image?folder=articles
router.post('/image', uploadMiddleware.single('image'), asyncHandler(async (req, res) => {
    if (!req.file) return res.status(400).json({ message: 'ไม่พบไฟล์' })
    const folder = req.query.folder || 'general'
    const result = await uploadToCloudinary(req.file.buffer, folder)
    res.json({ ...result, size: req.file.size, name: req.file.originalname })
}))

// POST /api/upload/images?folder=gallery
router.post('/images', uploadMiddleware.array('images', 20), asyncHandler(async (req, res) => {
    if (!req.files || req.files.length === 0) return res.status(400).json({ message: 'ไม่พบไฟล์' })
    const folder = req.query.folder || 'general'
    const results = await uploadManyToCloudinary(req.files, folder)
    const response = req.files.map((f, i) => ({
        ...results[i],
        name: f.originalname,
        size: f.size,
    }))
    res.json(response)
}))

// DELETE /api/upload/image
router.delete('/image', asyncHandler(async (req, res) => {
    const { publicId } = req.body
    if (!publicId) return res.status(400).json({ message: 'ส่ง publicId มาด้วย' })
    await deleteImage(publicId)
    res.json({ message: 'ลบรูปเรียบร้อย' })
}))

export default router
