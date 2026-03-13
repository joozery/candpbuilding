import express from 'express'
import asyncHandler from 'express-async-handler'
import Settings from '../models/Settings.js'

const router = express.Router()

// @desc    Get website settings
// @route   GET /api/settings
// @access  Public
router.get('/', asyncHandler(async (req, res) => {
    let settings = await Settings.findOne()
    
    if (!settings) {
        // Create default settings if none exist
        settings = await Settings.create({})
    }
    
    res.json(settings)
}))

// @desc    Update website settings
// @route   PUT /api/settings
// @access  Private/Admin
router.put('/', asyncHandler(async (req, res) => {
    let settings = await Settings.findOne()
    
    if (!settings) {
        settings = new Settings(req.body)
    } else {
        // Update fields
        Object.keys(req.body).forEach(key => {
            settings[key] = req.body[key]
        })
    }
    
    const updatedSettings = await settings.save()
    res.json(updatedSettings)
}))

export default router
