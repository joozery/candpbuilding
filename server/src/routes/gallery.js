import express from 'express'
import asyncHandler from 'express-async-handler'
import Gallery from '../models/Gallery.js'
import { uploadMiddleware, uploadManyToCloudinary, deleteImage } from '../middleware/upload.js'

const router = express.Router()

// ---- GET /api/gallery ---- //
router.get('/', asyncHandler(async (req, res) => {
    const { page = 1, limit = 50 } = req.query
    const skip = (Number(page) - 1) * Number(limit)
    const total = await Gallery.countDocuments()
    const items = await Gallery.find().sort({ createdAt: -1 }).skip(skip).limit(Number(limit)).lean()
    res.json({ total, page: Number(page), data: items })
}))

// ---- POST /api/gallery (upload images) ---- //
router.post('/', uploadMiddleware.array('images', 20), asyncHandler(async (req, res) => {
    if (!req.files || req.files.length === 0) {
        return res.status(400).json({ message: 'ไม่พบไฟล์รูปภาพ' })
    }
    const uploaded = await uploadManyToCloudinary(req.files, 'gallery')
    const docs = req.files.map((f, i) => ({
        name: f.originalname,
        url: uploaded[i].url,
        publicId: uploaded[i].publicId,
        size: f.size || 0,
        folder: 'gallery',
    }))
    const saved = await Gallery.insertMany(docs)
    res.status(201).json({ count: saved.length, data: saved })
}))

// ---- DELETE /api/gallery/:id ---- //
router.delete('/:id', asyncHandler(async (req, res) => {
    const img = await Gallery.findById(req.params.id)
    if (!img) return res.status(404).json({ message: 'ไม่พบรูปภาพ' })
    await deleteImage(img.publicId)
    await img.deleteOne()
    res.json({ message: 'ลบรูปภาพเรียบร้อยแล้ว' })
}))

// ---- DELETE /api/gallery (bulk delete) ---- //
router.delete('/', asyncHandler(async (req, res) => {
    const { ids } = req.body
    if (!ids || !Array.isArray(ids)) return res.status(400).json({ message: 'ส่ง ids มาด้วย' })
    const items = await Gallery.find({ _id: { $in: ids } })
    for (const img of items) await deleteImage(img.publicId)
    await Gallery.deleteMany({ _id: { $in: ids } })
    res.json({ message: `ลบ ${items.length} รูปเรียบร้อยแล้ว` })
}))

export default router
