import mongoose from 'mongoose';

const contactSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'กรุณากรอกชื่อ-นามสกุล']
    },
    phone: {
        type: String,
        required: [true, 'กรุณากรอกเบอร์โทรศัพท์']
    },
    email: {
        type: String,
        required: [true, 'กรุณากรอกอีเมล']
    },
    service: {
        type: String,
        required: [true, 'กรุณาเลือกบริการที่สนใจ']
    },
    message: {
        type: String,
        required: [true, 'กรุณากรอกรายละเอียดโครงการ']
    },
    status: {
        type: String,
        enum: ['new', 'read', 'contacted'],
        default: 'new'
    }
}, {
    timestamps: true
});

const Contact = mongoose.model('Contact', contactSchema);
export default Contact;
