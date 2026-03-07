import multer from 'multer'
import streamifier from 'streamifier'
import cloudinary from '../config/cloudinary.js'

// Use memoryStorage — buffer file, then stream to Cloudinary
const storage = multer.memoryStorage()

export const uploadMiddleware = multer({
    storage,
    limits: { fileSize: 10 * 1024 * 1024 }, // 10MB
    fileFilter: (req, file, cb) => {
        const allowed = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp']
        if (allowed.includes(file.mimetype)) cb(null, true)
        else cb(new Error('ไฟล์ต้องเป็น JPG, PNG หรือ WEBP เท่านั้น'))
    },
})

/**
 * Upload a single buffer to Cloudinary
 * @param {Buffer} buffer
 * @param {string} folder  e.g. 'articles', 'gallery'
 * @param {string} [publicId] optional custom public_id
 * @returns Promise<{ url, publicId }>
 */
export const uploadToCloudinary = (buffer, folder = 'cpbuilding', publicId) => {
    return new Promise((resolve, reject) => {
        const opts = {
            folder: `cpbuilding/${folder}`,
            transformation: [{ quality: 'auto', fetch_format: 'auto' }],
            ...(publicId && { public_id: publicId }),
        }
        const stream = cloudinary.uploader.upload_stream(opts, (err, result) => {
            if (err) return reject(err)
            resolve({ url: result.secure_url, publicId: result.public_id })
        })
        streamifier.createReadStream(buffer).pipe(stream)
    })
}

/**
 * Upload multiple buffers to Cloudinary
 */
export const uploadManyToCloudinary = (files, folder) =>
    Promise.all(files.map(f => uploadToCloudinary(f.buffer, folder)))

/**
 * Delete an image from Cloudinary by publicId
 */
export const deleteImage = async (publicId) => {
    if (!publicId) return
    try {
        await cloudinary.uploader.destroy(publicId)
    } catch (err) {
        console.error('Cloudinary delete error:', err.message)
    }
}
