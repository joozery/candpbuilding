import express from 'express'
import asyncHandler from 'express-async-handler'
import Portfolio from '../models/Portfolio.js'
import { uploadMiddleware, uploadManyToCloudinary, deleteImage } from '../middleware/upload.js'

const router = express.Router()

// ---- GET /api/portfolio ---- //
router.get('/', asyncHandler(async (req, res) => {
    const { status, category } = req.query
    const filter = {}
    if (status) filter.status = status
    if (category) filter.category = category
    const items = await Portfolio.find(filter).sort({ createdAt: -1 }).lean()
    res.json({ total: items.length, data: items })
}))

// ---- GET /api/portfolio/:id ---- //
router.get('/:id', asyncHandler(async (req, res) => {
    const item = await Portfolio.findById(req.params.id).lean()
    if (!item) return res.status(404).json({ message: 'ไม่พบผลงาน' })
    res.json(item)
}))

// ---- POST /api/portfolio ---- //
router.post('/', uploadMiddleware.array('images', 10), asyncHandler(async (req, res) => {
    const { title, location, year, category, status, description } = req.body
    const images = req.files?.length
        ? await uploadManyToCloudinary(req.files, 'portfolio')
        : []
    const item = await Portfolio.create({ title, location, year, category, status, description, images })
    res.status(201).json(item)
}))

// ---- PUT /api/portfolio/:id ---- //
router.put('/:id', uploadMiddleware.array('images', 10), asyncHandler(async (req, res) => {
    const item = await Portfolio.findById(req.params.id)
    if (!item) return res.status(404).json({ message: 'ไม่พบผลงาน' })

    const { title, location, year, category, status, description } = req.body
    Object.assign(item, { title, location, year, category, status, description })

    if (req.files && req.files.length > 0) {
        for (const img of item.images) await deleteImage(img.publicId)
        item.images = await uploadManyToCloudinary(req.files, 'portfolio')
    }

    await item.save()
    res.json(item)
}))

// ---- DELETE /api/portfolio/:id ---- //
router.delete('/:id', asyncHandler(async (req, res) => {
    const item = await Portfolio.findById(req.params.id)
    if (!item) return res.status(404).json({ message: 'ไม่พบผลงาน' })
    for (const img of item.images) await deleteImage(img.publicId)
    await item.deleteOne()
    res.json({ message: 'ลบผลงานเรียบร้อยแล้ว' })
}))

export default router
