import mongoose from 'mongoose'

const gallerySchema = new mongoose.Schema(
    {
        name: { type: String, required: true },
        url: { type: String, required: true },
        publicId: { type: String, required: true },
        size: { type: Number, default: 0 },       // bytes
        folder: { type: String, default: 'gallery' },
        alt: { type: String, default: '' },
    },
    { timestamps: true }
)

export default mongoose.model('Gallery', gallerySchema)
