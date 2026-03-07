import React, { useState, useEffect, useRef } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { X, Save, Eye, FileText, Tag, User, Clock, Image as ImageIcon, Loader2 } from 'lucide-react'

const CATEGORIES = ['ออกแบบ', 'วัสดุ', 'เคล็ดลับ', 'นวัตกรรม', 'ข่าวสาร']
const GRADIENTS = [
    { label: 'ม่วง-น้ำเงิน', value: 'from-blue-500 to-purple-600' },
    { label: 'เขียว-มรกต', value: 'from-green-500 to-emerald-600' },
    { label: 'แอมเบอร์-ส้ม', value: 'from-amber-500 to-orange-600' },
    { label: 'ม่วง-ชมพู', value: 'from-purple-500 to-pink-600' },
    { label: 'ฟ้า-ฟ้าเข้ม', value: 'from-sky-500 to-blue-600' },
    { label: 'แดง-ชมพู', value: 'from-rose-400 to-pink-500' },
]

const EMPTY_FORM = {
    title: '',
    summary: '',
    content: '',
    author: 'ทีม C&P',
    category: 'ออกแบบ',
    readTime: '5 นาที',
    status: 'draft',
    gradient: 'from-blue-500 to-purple-600',
}

/**
 * ArticleFormDrawer
 *
 * Props:
 *   open        bool       — whether the drawer is open
 *   article     object|null — if null = add mode, if object = edit mode
 *   onClose     fn         — close drawer
 *   onSave      fn(data, imgFile) — save callback
 *   saving      bool       — loading state
 */
export default function ArticleFormDrawer({ open, article, onClose, onSave, saving }) {
    const [form, setForm] = useState(EMPTY_FORM)
    const [errors, setErrors] = useState({})
    const [tab, setTab] = useState('content') // 'content' | 'meta'
    const [imageFile, setImageFile] = useState(null)
    const [imagePreview, setImagePreview] = useState(null)
    const fileInputRef = useRef(null)

    // Populate form when editing
    useEffect(() => {
        if (article) {
            setForm({
                title: article.title || '',
                summary: article.summary || '',
                content: article.content || '',
                author: article.author || 'ทีม C&P',
                category: article.category || 'ออกแบบ',
                readTime: article.readTime || '5 นาที',
                status: article.status || 'draft',
                gradient: article.gradient || EMPTY_FORM.gradient,
            })
            setImagePreview(article.image?.url || null)
        } else {
            setForm(EMPTY_FORM)
            setImagePreview(null)
        }
        setImageFile(null)
        setErrors({})
        setTab('content')
    }, [article, open])

    const set = (key, val) => {
        setForm(p => ({ ...p, [key]: val }))
        if (errors[key]) setErrors(p => ({ ...p, [key]: null }))
    }

    const handleImageChange = (e) => {
        const file = e.target.files[0]
        if (file) {
            setImageFile(file)
            const reader = new FileReader()
            reader.onloadend = () => {
                setImagePreview(reader.result)
            }
            reader.readAsDataURL(file)
        }
    }

    const validate = () => {
        const e = {}
        if (!form.title.trim()) e.title = 'กรุณากรอกชื่อบทความ'
        if (!form.summary.trim()) e.summary = 'กรุณากรอกคำอธิบายสั้น'
        if (!form.content.trim()) e.content = 'กรุณากรอกเนื้อหาบทความ'
        setErrors(e)
        return Object.keys(e).length === 0
    }

    const handleSave = (status) => {
        if (!validate()) return
        onSave({ ...form, status }, imageFile)
    }

    if (!open) return null

    const isEdit = !!article

    return (
        <>
            {/* Backdrop */}
            <div
                className="fixed inset-0 z-40 bg-black/30 backdrop-blur-sm"
                onClick={onClose}
            />

            {/* Drawer */}
            <div className="fixed right-0 top-0 bottom-0 z-50 w-full max-w-2xl bg-white shadow-2xl flex flex-col transition-transform duration-300">

                {/* Header */}
                <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 flex-shrink-0">
                    <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-lg bg-amber-50 flex items-center justify-center">
                            <FileText className="w-4 h-4 text-amber-500" />
                        </div>
                        <div>
                            <h2 className="text-base font-semibold text-slate-800">
                                {isEdit ? 'แก้ไขบทความ' : 'เพิ่มบทความใหม่'}
                            </h2>
                            <p className="text-xs text-slate-400">
                                {isEdit ? `แก้ไข: ${article.title.slice(0, 30)}...` : 'กรอกข้อมูลบทความด้านล่าง'}
                            </p>
                        </div>
                    </div>
                    <button
                        onClick={onClose}
                        className="w-8 h-8 rounded-lg flex items-center justify-center text-slate-400 hover:bg-slate-100 hover:text-slate-600 transition-all"
                    >
                        <X className="w-4 h-4" />
                    </button>
                </div>

                {/* Tabs */}
                <div className="flex border-b border-slate-100 px-6 flex-shrink-0">
                    {[
                        { key: 'content', label: 'เนื้อหา' },
                        { key: 'meta', label: 'ข้อมูลเพิ่มเติม' },
                    ].map(t => (
                        <button
                            key={t.key}
                            onClick={() => setTab(t.key)}
                            className={`px-4 py-3 text-sm font-medium border-b-2 transition-colors ${tab === t.key
                                    ? 'border-amber-500 text-amber-600'
                                    : 'border-transparent text-slate-400 hover:text-slate-600'
                                }`}
                        >{t.label}</button>
                    ))}
                </div>

                {/* Body */}
                <div className="flex-1 overflow-y-auto px-6 py-5">
                    {tab === 'content' ? (
                        <div className="space-y-5">
                            {/* Image Upload */}
                            <div>
                                <Label className="text-xs font-semibold text-slate-600 mb-1.5 block">รูปหน้าปก</Label>
                                <div
                                    onClick={() => fileInputRef.current.click()}
                                    className={`relative aspect-video rounded-xl border-2 border-dashed flex flex-col items-center justify-center cursor-pointer transition-all overflow-hidden bg-slate-50 ${imagePreview ? 'border-amber-400' : 'border-slate-200 hover:border-amber-300'
                                        }`}
                                >
                                    {imagePreview ? (
                                        <>
                                            <img src={imagePreview} alt="Preview" className="w-full h-full object-cover" />
                                            <div className="absolute inset-0 bg-black/40 opacity-0 hover:opacity-100 transition-opacity flex items-center justify-center">
                                                <p className="text-white text-xs font-medium bg-black/50 px-3 py-1.5 rounded-full">เปลี่ยนรูป</p>
                                            </div>
                                        </>
                                    ) : (
                                        <div className="text-center p-6 text-slate-400">
                                            <ImageIcon className="w-8 h-8 mx-auto mb-2 opacity-50" />
                                            <p className="text-xs font-medium">คลิกเพื่ออัปโหลดรูปหน้าปก</p>
                                            <p className="text-[10px] mt-1">ขนาดแนะนำ 1200 x 630 px (JPG, PNG, WEBP)</p>
                                        </div>
                                    )}
                                </div>
                                <input
                                    type="file"
                                    hidden
                                    ref={fileInputRef}
                                    onChange={handleImageChange}
                                    accept="image/*"
                                />
                            </div>

                            {/* Title */}
                            <div>
                                <Label className="text-xs font-semibold text-slate-600 mb-1.5 block">
                                    ชื่อบทความ <span className="text-red-400">*</span>
                                </Label>
                                <Input
                                    value={form.title}
                                    onChange={e => set('title', e.target.value)}
                                    placeholder="เช่น 5 เทรนด์การออกแบบบ้านปี 2025"
                                    className={`border-slate-200 text-sm h-10 focus:border-amber-400 ${errors.title ? 'border-red-300 bg-red-50' : ''}`}
                                />
                                {errors.title && <p className="text-xs text-red-500 mt-1">{errors.title}</p>}
                            </div>

                            {/* Summary */}
                            <div>
                                <Label className="text-xs font-semibold text-slate-600 mb-1.5 block">
                                    คำอธิบายสั้น (Summary) <span className="text-red-400">*</span>
                                </Label>
                                <textarea
                                    value={form.summary}
                                    onChange={e => set('summary', e.target.value)}
                                    rows={3}
                                    placeholder="สรุปเนื้อหาบทความสั้นๆ ใช้แสดงในรายการบทความ..."
                                    className={`w-full border rounded-lg px-3 py-2 text-sm resize-none focus:outline-none focus:border-amber-400 ${errors.summary ? 'border-red-300 bg-red-50' : 'border-slate-200'
                                        }`}
                                />
                                {errors.summary && <p className="text-xs text-red-500 mt-1">{errors.summary}</p>}
                                <p className="text-[11px] text-slate-300 mt-1 text-right">{form.summary.length}/200</p>
                            </div>

                            {/* Content */}
                            <div>
                                <Label className="text-xs font-semibold text-slate-600 mb-1.5 block">
                                    เนื้อหาบทความ <span className="text-red-400">*</span>
                                </Label>
                                <textarea
                                    value={form.content}
                                    onChange={e => set('content', e.target.value)}
                                    rows={12}
                                    placeholder="เขียนเนื้อหาบทความที่นี่... (รองรับ Markdown)"
                                    className={`w-full border rounded-lg px-3 py-2 text-sm resize-none focus:outline-none focus:border-amber-400 font-mono leading-relaxed ${errors.content ? 'border-red-300 bg-red-50' : 'border-slate-200'
                                        }`}
                                />
                                {errors.content && <p className="text-xs text-red-500 mt-1">{errors.content}</p>}
                                <div className="flex justify-between mt-1">
                                    <p className="text-[10px] text-slate-400 italic">💡 รองรับ Markdown เช่น **หนา**, *เอียง*, - รายการ</p>
                                    <p className="text-[11px] text-slate-300">{form.content.length} ตัวอักษร</p>
                                </div>
                            </div>
                        </div>
                    ) : (
                        <div className="space-y-5">
                            {/* Category */}
                            <div>
                                <Label className="text-xs font-semibold text-slate-600 mb-1.5 block">
                                    <Tag className="inline w-3 h-3 mr-1" /> หมวดหมู่
                                </Label>
                                <div className="flex flex-wrap gap-2">
                                    {CATEGORIES.map(cat => (
                                        <button
                                            key={cat}
                                            type="button"
                                            onClick={() => set('category', cat)}
                                            className={`px-3.5 py-1.5 rounded-full text-xs font-medium border transition-all ${form.category === cat
                                                    ? 'bg-amber-500 text-white border-amber-500 shadow-sm shadow-amber-500/20'
                                                    : 'bg-white text-slate-500 border-slate-200 hover:border-amber-300 hover:text-amber-600'
                                                }`}
                                        >{cat}</button>
                                    ))}
                                </div>
                            </div>

                            {/* Author + ReadTime */}
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <Label className="text-xs font-semibold text-slate-600 mb-1.5 block">
                                        <User className="inline w-3 h-3 mr-1" /> ผู้เขียน
                                    </Label>
                                    <Input
                                        value={form.author}
                                        onChange={e => set('author', e.target.value)}
                                        placeholder="เช่น ทีมสถาปนิก C&P"
                                        className="border-slate-200 text-sm h-9 focus:border-amber-400"
                                    />
                                </div>
                                <div>
                                    <Label className="text-xs font-semibold text-slate-600 mb-1.5 block">
                                        <Clock className="inline w-3 h-3 mr-1" /> เวลาอ่าน
                                    </Label>
                                    <Input
                                        value={form.readTime}
                                        onChange={e => set('readTime', e.target.value)}
                                        placeholder="เช่น 5 นาที"
                                        className="border-slate-200 text-sm h-9 focus:border-amber-400"
                                    />
                                </div>
                            </div>

                            {/* Cover Style (Gradient fallback if no image) */}
                            <div>
                                <Label className="text-xs font-semibold text-slate-600 mb-2 block text-slate-400 italic">พื้นหลังสำรอง (กรณีไม่มีรูป)</Label>
                                <div className="grid grid-cols-3 gap-3">
                                    {GRADIENTS.map(g => (
                                        <button
                                            key={g.value}
                                            type="button"
                                            onClick={() => set('gradient', g.value)}
                                            className={`relative h-16 rounded-xl bg-gradient-to-br ${g.value} transition-all ${form.gradient === g.value
                                                    ? 'ring-2 ring-amber-500 ring-offset-2 scale-105'
                                                    : 'opacity-70 hover:opacity-100'
                                                }`}
                                        >
                                            <span className="absolute bottom-1.5 left-0 right-0 text-center text-[10px] font-medium text-white/90">
                                                {g.label}
                                            </span>
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Status */}
                            <div>
                                <Label className="text-xs font-semibold text-slate-600 mb-2 block">สถานะ</Label>
                                <div className="flex gap-3">
                                    {[
                                        { value: 'draft', label: 'บันทึกเป็นร่าง', desc: 'ยังไม่เผยแพร่' },
                                        { value: 'published', label: 'เผยแพร่ทันที', desc: 'Public เลย' },
                                    ].map(s => (
                                        <label
                                            key={s.value}
                                            className={`flex-1 flex items-start gap-3 p-3.5 rounded-xl border-2 cursor-pointer transition-all ${form.status === s.value
                                                    ? 'border-amber-400 bg-amber-50'
                                                    : 'border-slate-200 hover:border-slate-300'
                                                }`}
                                        >
                                            <input
                                                type="radio"
                                                name="status"
                                                value={s.value}
                                                checked={form.status === s.value}
                                                onChange={() => set('status', s.value)}
                                                className="mt-0.5 accent-amber-500"
                                                disabled={saving}
                                            />
                                            <div>
                                                <p className="text-sm font-medium text-slate-700">{s.label}</p>
                                                <p className="text-xs text-slate-400">{s.desc}</p>
                                            </div>
                                        </label>
                                    ))}
                                </div>
                            </div>
                        </div>
                    )}
                </div>

                {/* Footer */}
                <div className="flex items-center justify-between px-6 py-4 border-t border-slate-100 bg-slate-50/50 flex-shrink-0">
                    <Button variant="ghost" onClick={onClose} disabled={saving} className="text-slate-500 h-9 text-sm">
                        ยกเลิก
                    </Button>
                    <div className="flex gap-2">
                        <Button
                            variant="outline"
                            disabled={saving}
                            onClick={() => handleSave('draft')}
                            className="text-slate-600 border-slate-200 h-9 text-sm gap-2 hover:bg-slate-100"
                        >
                            {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
                            บันทึกร่าง
                        </Button>
                        <Button
                            disabled={saving}
                            onClick={() => handleSave('published')}
                            className="bg-amber-500 hover:bg-amber-600 text-white h-9 text-sm gap-2 shadow shadow-amber-500/20"
                        >
                            {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Eye className="w-4 h-4" />}
                            เผยแพร่
                        </Button>
                    </div>
                </div>
            </div>
        </>
    )
}
