import mongoose from 'mongoose'

const articleSchema = new mongoose.Schema(
    {
        title: { type: String, required: true, trim: true },
        slug: { type: String, unique: true },
        summary: { type: String, required: true },
        content: { type: String, required: true },
        author: { type: String, default: 'ทีม C&P' },
        category: { type: String, required: true },
        readTime: { type: String, default: '5 นาที' },
        status: { type: String, enum: ['published', 'draft'], default: 'draft' },
        gradient: { type: String, default: 'from-blue-500 to-purple-600' },
        image: {
            url: { type: String, default: null },
            publicId: { type: String, default: null },
        },
        views: { type: Number, default: 0 },
    },
    { timestamps: true }
)

// Auto-generate slug from title before save
articleSchema.pre('save', async function (next) {
    if (!this.isModified('title')) return next()
    const { default: slugify } = await import('slugify')
    let slug = slugify(this.title, { lower: true, strict: false, locale: 'th' })
    // fallback: use timestamp if slug is empty after slugify (Thai chars)
    if (!slug || slug.length < 2) {
        slug = `article-${Date.now()}`
    }
    this.slug = slug
    next()
})

export default mongoose.model('Article', articleSchema)
