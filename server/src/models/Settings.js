import mongoose from 'mongoose'

const settingsSchema = new mongoose.Schema({
    siteName: { type: String, default: 'C&P Building' },
    siteTagline: { type: String, default: 'สร้างบ้านและก่อสร้างอย่างมืออาชีพ' },
    siteUrl: { type: String, default: 'https://cpbuilding.com' },
    phone: { type: String, default: '02-xxx-xxxx' },
    email: { type: String, default: 'contact@cpbuilding.com' },
    address: { type: String, default: '123 ถ.สุขุมวิท กรุงเทพฯ 10110' },
    facebookUrl: { type: String, default: 'https://facebook.com/cpbuilding' },
    youtubeUrl: { type: String, default: '' },
    lineUrl: { type: String, default: '' },
    articlesPerPage: { type: Number, default: 9 },
    enableComments: { type: Boolean, default: false },
    maintenanceMode: { type: Boolean, default: false },
    seoTitle: { type: String, default: 'C&P Building | รับสร้างบ้านและก่อสร้าง' },
    seoDesc: { type: String, default: 'รับสร้างบ้าน ออกแบบบ้าน และงานก่อสร้างทุกประเภทด้วยทีมงานมืออาชีพ' },
    heroImageUrl: { type: String, default: '' },
    heroTitle: { type: String, default: 'สร้างอาคารที่คุณต้องการให้เป็นจริง' },
    heroSubtitle: { type: String, default: 'C&P Building Houses คือผู้เชี่ยวชาญด้านการก่อสร้างและสถาปัตยกรรม ที่มีความรับผิดชิดเป็นมิตรกับสิ่งแวดล้อมมากที่สุดสำหรับทุกรูปแบบโครงการ' },
}, { timestamps: true })

const Settings = mongoose.model('Settings', settingsSchema)

export default Settings
