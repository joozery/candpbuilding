import express from 'express';
import asyncHandler from 'express-async-handler';
import User from '../models/User.js';

const router = express.Router();

// @desc    Get all users (admins)
// @route   GET /api/users
router.get('/', asyncHandler(async (req, res) => {
    const users = await User.find().sort({ createdAt: -1 });
    res.json({
        success: true,
        data: users
    });
}));

// @desc    Create new admin
// @route   POST /api/users
router.post('/', asyncHandler(async (req, res) => {
    const { name, email, password, role } = req.body;

    const emailExists = await User.findOne({ email });
    if (emailExists) {
        res.status(400);
        throw new Error('อีเมลนี้ถูกใช้งานแล้ว');
    }

    const user = await User.create({ name, email, password, role });
    res.status(201).json({
        success: true,
        data: user
    });
}));

// @desc    Delete an admin
// @route   DELETE /api/users/:id
router.delete('/:id', asyncHandler(async (req, res) => {
    const user = await User.findById(req.params.id);

    if (!user) {
        res.status(404);
        throw new Error('ไม่พบข้อมูลผู้ใช้');
    }

    await User.findByIdAndDelete(req.params.id);

    res.json({
        success: true,
        message: 'ลบผู้ดูแลเรียบร้อยแล้ว'
    });
}));

export default router;
