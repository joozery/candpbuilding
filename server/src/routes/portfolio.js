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
router.post('/', uploadMiddleware.array('images', 50), asyncHandler(async (req, res) => {
    const { title, category } = req.body
    if (!title || !category) {
        res.status(400)
        throw new Error('กรุณาระบุชื่อโครงการและหมวดหมู่')
    }

    const { location, year, status, description } = req.body
    const images = req.files?.length
        ? await uploadManyToCloudinary(req.files, 'portfolio')
        : []

    const item = await Portfolio.create({
        title,
        location,
        year,
        category,
        status: status || 'active',
        description,
        images
    })
    res.status(201).json(item)
}))

// ---- PUT /api/portfolio/:id ---- //
router.put('/:id', uploadMiddleware.array('images', 50), asyncHandler(async (req, res) => {
    const item = await Portfolio.findById(req.params.id)
    if (!item) return res.status(404).json({ message: 'ไม่พบผลงาน' })

    const { title, location, year, category, status, description, remainingImages } = req.body

    // 1. Update text fields
    if (title) item.title = title
    if (category) item.category = category
    item.location = location || item.location
    item.year = year || item.year
    item.status = status || item.status
    item.description = description || item.description

    // 2. Handle Images
    let finalImages = []

    // If remainingImages is provided, filter out the ones we delete from Cloudinary
    if (remainingImages) {
        const keep = JSON.parse(remainingImages) // Array of objects {url, publicId}
        const keepPublicIds = keep.map(img => img.publicId)

        // Delete images that are NOT in the keep list
        for (const img of item.images) {
            if (!keepPublicIds.includes(img.publicId)) {
                await deleteImage(img.publicId)
            }
        }
        finalImages = keep
    } else {
        // If remainingImages is not sent, we assume we keep current ones unless NEW files are uploaded?
        // Actually it's safer to always send the state from frontend.
        finalImages = item.images
    }

    // Add new uploads if any
    if (req.files && req.files.length > 0) {
        const newUploads = await uploadManyToCloudinary(req.files, 'portfolio')
        finalImages = [...finalImages, ...newUploads]
    }

    item.images = finalImages
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
