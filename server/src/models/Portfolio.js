import mongoose from 'mongoose'

const portfolioSchema = new mongoose.Schema(
    {
        title: { type: String, required: true, trim: true },
        location: { type: String, default: '' },
        year: { type: String, default: '' },
        category: { type: String, required: true },
        status: { type: String, enum: ['active', 'inactive'], default: 'active' },
        images: [
            {
                url: String,
                publicId: String,
            }
        ],
        description: { type: String, default: '' },
    },
    { timestamps: true }
)

export default mongoose.model('Portfolio', portfolioSchema)
