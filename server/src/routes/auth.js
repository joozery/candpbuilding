import express from 'express';
import jwt from 'jsonwebtoken';
import asyncHandler from 'express-async-handler';
import User from '../models/User.js';

const router = express.Router();

const signToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET || 'fallback-secret', {
        expiresIn: '7d'
    });
};

// @desc    Login user
// @route   POST /api/auth/login
router.post('/login', asyncHandler(async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        res.status(400);
        throw new Error('กรุณากรอกอีเมลและรหัสผ่าน');
    }

    const user = await User.findOne({ email }).select('+password');

    if (!user || !(await user.comparePassword(password, user.password))) {
        res.status(401);
        throw new Error('อีเมลหรือรหัสผ่านไม่ถูกต้อง');
    }

    user.lastLogin = Date.now();
    await user.save({ validateBeforeSave: false });

    const token = signToken(user._id);

    res.json({
        success: true,
        token,
        data: {
            id: user._id,
            name: user.name,
            email: user.email,
            role: user.role
        }
    });
}));

// Temporary Register - To be used only for initial setup or by admin
router.post('/register-initial', asyncHandler(async (req, res) => {
    const userCount = await User.countDocuments();
    if (userCount > 0) {
        res.status(403);
        throw new Error('ระบบมีผู้ดูแลอยู่แล้ว ไม่สามารถสมัครแบบอิสระได้');
    }

    const { name, email, password } = req.body;
    const user = await User.create({ name, email, password, role: 'admin' });

    const token = signToken(user._id);
    res.status(201).json({ success: true, token, data: user });
}));

export default router;
