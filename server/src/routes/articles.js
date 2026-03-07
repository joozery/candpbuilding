import express from 'express'
import asyncHandler from 'express-async-handler'
import Article from '../models/Article.js'
import { uploadMiddleware, uploadToCloudinary, deleteImage } from '../middleware/upload.js'

const router = express.Router()

// ---- GET /api/articles ---- //
router.get('/', asyncHandler(async (req, res) => {
    const { status, category, search, page = 1, limit = 20 } = req.query
    const filter = {}
    if (status) filter.status = status
    if (category) filter.category = category
    if (search) filter.title = { $regex: search, $options: 'i' }

    const skip = (Number(page) - 1) * Number(limit)
    const total = await Article.countDocuments(filter)
    const items = await Article.find(filter)
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(Number(limit))
        .lean()

    res.json({ total, page: Number(page), pages: Math.ceil(total / Number(limit)), data: items })
}))

// ---- GET /api/articles/:id ---- //
router.get('/:id', asyncHandler(async (req, res) => {
    const article = await Article.findById(req.params.id).lean()
    if (!article) return res.status(404).json({ message: 'ไม่พบบทความ' })
    await Article.findByIdAndUpdate(req.params.id, { $inc: { views: 1 } })
    res.json(article)
}))

// ---- POST /api/articles ---- //
router.post('/', uploadMiddleware.single('image'), asyncHandler(async (req, res) => {
    const { title, summary, content, author, category, readTime, status, gradient } = req.body
    let image = { url: null, publicId: null }
    if (req.file) {
        image = await uploadToCloudinary(req.file.buffer, 'articles')
    }
    const article = await Article.create({ title, summary, content, author, category, readTime, status, gradient, image })
    res.status(201).json(article)
}))

// ---- PUT /api/articles/:id ---- //
router.put('/:id', uploadMiddleware.single('image'), asyncHandler(async (req, res) => {
    const article = await Article.findById(req.params.id)
    if (!article) return res.status(404).json({ message: 'ไม่พบบทความ' })

    const { title, summary, content, author, category, readTime, status, gradient } = req.body
    Object.assign(article, { title, summary, content, author, category, readTime, status, gradient })

    if (req.file) {
        await deleteImage(article.image?.publicId)
        article.image = await uploadToCloudinary(req.file.buffer, 'articles')
    }

    await article.save()
    res.json(article)
}))

// ---- DELETE /api/articles/:id ---- //
router.delete('/:id', asyncHandler(async (req, res) => {
    const article = await Article.findById(req.params.id)
    if (!article) return res.status(404).json({ message: 'ไม่พบบทความ' })
    await deleteImage(article.image?.publicId)
    await article.deleteOne()
    res.json({ message: 'ลบบทความเรียบร้อยแล้ว' })
}))

export default router
