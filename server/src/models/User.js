import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'กรุณากรอกชื่อ-นามสกุล']
    },
    email: {
        type: String,
        required: [true, 'กรุณากรอกอีเมล'],
        unique: true,
        lowercase: true
    },
    password: {
        type: String,
        required: [true, 'กรุณากรอกรหัสผ่าน'],
        select: false
    },
    role: {
        type: String,
        enum: ['admin', 'editor'],
        default: 'admin'
    },
    lastLogin: {
        type: Date
    }
}, {
    timestamps: true
});

// Hash password before saving
userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) return next();
    this.password = await bcrypt.hash(this.password, 12);
    next();
});

// Method to compare password
userSchema.methods.comparePassword = async function (candidatePassword, userPassword) {
    return await bcrypt.compare(candidatePassword, userPassword);
};

const User = mongoose.model('User', userSchema);
export default User;
