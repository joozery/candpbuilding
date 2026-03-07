import express from 'express';
import asyncHandler from 'express-async-handler';
import Contact from '../models/Contact.js';

const router = express.Router();

// @desc    Submit a new contact form
// @route   POST /api/contacts
// @access  Public
router.post('/', asyncHandler(async (req, res) => {
    const { name, phone, email, service, message } = req.body;

    if (!name || !phone || !email || !service || !message) {
        res.status(400);
        throw new Error('กรุณากรอกข้อมูลให้ครบถ้วน');
    }

    const contact = await Contact.create({
        name,
        phone,
        email,
        service,
        message
    });

    res.status(201).json({
        success: true,
        message: 'ส่งข้อความเรียบร้อยแล้ว ทีมงานจะติดต่อกลับโดยเร็วที่สุด',
        data: contact
    });
}));

// @desc    Get all contact submissions
// @route   GET /api/contacts
// @access  Admin (Private eventually)
router.get('/', asyncHandler(async (req, res) => {
    const contacts = await Contact.find().sort({ createdAt: -1 });
    res.json({
        success: true,
        data: contacts
    });
}));

// @desc    Update contact status
// @route   PATCH /api/contacts/:id
// @access  Admin (Private eventually)
router.patch('/:id', asyncHandler(async (req, res) => {
    const { status } = req.body;
    const contact = await Contact.findByIdAndUpdate(
        req.params.id,
        { status },
        { new: true }
    );

    if (!contact) {
        res.status(404);
        throw new Error('ไม่พบข้อมูลการติดต่อ');
    }

    res.json({
        success: true,
        data: contact
    });
}));

// @desc    Delete a contact submission
// @route   DELETE /api/contacts/:id
// @access  Admin (Private eventually)
router.delete('/:id', asyncHandler(async (req, res) => {
    const contact = await Contact.findByIdAndDelete(req.params.id);

    if (!contact) {
        res.status(404);
        throw new Error('ไม่พบข้อมูลการติดต่อ');
    }

    res.json({
        success: true,
        message: 'ลบข้อมูลการติดต่อเรียบร้อยแล้ว'
    });
}));

export default router;
