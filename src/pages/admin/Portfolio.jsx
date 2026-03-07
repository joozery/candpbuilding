import React, { useState, useEffect, useRef } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
    Plus, Search, Edit2, Trash2, X,
    MapPin, Calendar, Tag, Briefcase, Image as ImageIcon, Loader2, AlertCircle, RefreshCw
} from 'lucide-react'
import { portfolioApi } from '@/lib/api'

const CATEGORIES = ['บ้านพักอาศัย', 'วิลล่า', 'เชิงพาณิชย์', 'บ้านสำเร็จรูป', 'งานออกแบบ']

const categoryColors = {
    'บ้านพักอาศัย': 'bg-blue-50 text-blue-600',
    'วิลล่า': 'bg-violet-50 text-violet-600',
    'เชิงพาณิชย์': 'bg-orange-50 text-orange-600',
    'บ้านสำเร็จรูป': 'bg-teal-50 text-teal-600',
    'งานออกแบบ': 'bg-pink-50 text-pink-600',
}

const EMPTY_FORM = {
    title: '',
    location: '',
    year: '',
    category: 'บ้านพักอาศัย',
    status: 'active',
    description: ''
}

// ---- Modal ---- //
function PortfolioModal({ item, onClose, onSave, saving }) {
    const [form, setForm] = useState(EMPTY_FORM)
    const [imageFiles, setImageFiles] = useState([])
    const [previews, setPreviews] = useState([])
    const fileInputRef = useRef(null)

    useEffect(() => {
        if (item) {
            setForm({
                title: item.title || '',
                location: item.location || '',
                year: item.year || '',
                category: item.category || 'บ้านพักอาศัย',
                status: item.status || 'active',
                description: item.description || ''
            })
            setPreviews(item.images?.map(img => img.url) || [])
        } else {
            setForm(EMPTY_FORM)
            setPreviews([])
        }
        setImageFiles([])
    }, [item])

    const handleChange = (k, v) => setForm(p => ({ ...p, [k]: v }))

    const handleImageChange = (e) => {
        const files = Array.from(e.target.files)
        if (files.length > 0) {
            setImageFiles(prev => [...prev, ...files])

            files.forEach(file => {
                const reader = new FileReader()
                reader.onloadend = () => {
                    setPreviews(prev => [...prev, reader.result])
                }
                reader.readAsDataURL(file)
            })
        }
    }

    const removePreview = (index) => {
        setPreviews(prev => prev.filter((_, i) => i !== index))
        // Note: If it was an existing image from server, we might need special handling, 
        // but for now, if user uploads new files, they replace the whole set on save in current API design.
    }

    const handleSaveClick = () => {
        if (!form.title.trim()) return alert('กรุณากรอกชื่อโครงการ')
        onSave(form, imageFiles)
    }

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4">
            <div className="bg-white rounded-2xl shadow-2xl w-full max-w-xl max-h-[90vh] flex flex-col overflow-hidden">
                <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 flex-shrink-0">
                    <h2 className="text-base font-semibold text-slate-800">
                        {item ? 'แก้ไขผลงาน' : 'เพิ่มผลงานใหม่'}
                    </h2>
                    <button onClick={onClose} disabled={saving} className="w-8 h-8 flex items-center justify-center rounded-lg text-slate-400 hover:bg-slate-100 transition-all">
                        <X className="w-4 h-4" />
                    </button>
                </div>

                <div className="flex-1 overflow-y-auto px-6 py-5 space-y-5">
                    {/* Images Section */}
                    <div>
                        <Label className="text-xs font-semibold text-slate-600 mb-2 block">รูปภาพผลงาน (เลือกได้หลายรูป)</Label>
                        <div className="grid grid-cols-4 gap-2">
                            {previews.map((url, idx) => (
                                <div key={idx} className="relative aspect-square rounded-lg overflow-hidden border border-slate-200 group">
                                    <img src={url} alt="Preview" className="w-full h-full object-cover" />
                                    <button
                                        onClick={() => removePreview(idx)}
                                        className="absolute top-1 right-1 w-5 h-5 bg-red-500 text-white rounded-md flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity transform hover:scale-110"
                                    >
                                        <X className="w-3 h-3" />
                                    </button>
                                </div>
                            ))}
                            <button
                                onClick={() => fileInputRef.current?.click()}
                                className="aspect-square rounded-lg border-2 border-dashed border-slate-200 flex flex-col items-center justify-center text-slate-400 hover:border-amber-300 hover:text-amber-500 transition-all bg-slate-50"
                            >
                                <Plus className="w-5 h-5 mb-1" />
                                <span className="text-[10px] font-medium">เพิ่มรูป</span>
                            </button>
                        </div>
                        <input type="file" hidden multiple ref={fileInputRef} onChange={handleImageChange} accept="image/*" />
                    </div>

                    <div>
                        <Label className="text-xs font-semibold text-slate-600 mb-1.5 block">ชื่อโครงการ</Label>
                        <Input value={form.title} onChange={e => handleChange('title', e.target.value)}
                            placeholder="เช่น Villa Sunset ชะอำ"
                            className="border-slate-200 text-sm h-10 focus:border-amber-400" />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <Label className="text-xs font-semibold text-slate-600 mb-1.5 block">สถานที่</Label>
                            <Input value={form.location} onChange={e => handleChange('location', e.target.value)}
                                placeholder="เช่น กรุงเทพฯ"
                                className="border-slate-200 text-sm h-10 focus:border-amber-400" />
                        </div>
                        <div>
                            <Label className="text-xs font-semibold text-slate-600 mb-1.5 block">ปีที่ก่อสร้าง</Label>
                            <Input value={form.year} onChange={e => handleChange('year', e.target.value)}
                                placeholder="เช่น 2024"
                                className="border-slate-200 text-sm h-10 focus:border-amber-400" />
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <Label className="text-xs font-semibold text-slate-600 mb-1.5 block">หมวดหมู่</Label>
                            <select
                                value={form.category}
                                onChange={e => handleChange('category', e.target.value)}
                                className="w-full border border-slate-200 rounded-lg text-sm px-3 h-10 bg-white text-slate-700 outline-none focus:border-amber-400"
                            >
                                {CATEGORIES.map(c => <option key={c}>{c}</option>)}
                            </select>
                        </div>
                        <div>
                            <Label className="text-xs font-semibold text-slate-600 mb-1.5 block">การแสดงผล</Label>
                            <div className="flex gap-4 h-10 items-center">
                                {['active', 'inactive'].map(s => (
                                    <label key={s} className="flex items-center gap-2 cursor-pointer group">
                                        <input type="radio" name="status" value={s} checked={form.status === s}
                                            onChange={() => handleChange('status', s)}
                                            className="accent-amber-500 w-4 h-4" />
                                        <span className="text-sm text-slate-600 group-hover:text-amber-600 transition-colors">
                                            {s === 'active' ? 'แสดงหน้าเว็บ' : 'ซ่อนไว้'}
                                        </span>
                                    </label>
                                ))}
                            </div>
                        </div>
                    </div>

                    <div>
                        <Label className="text-xs font-semibold text-slate-600 mb-1.5 block">รายละเอียดเพิ่มเติม</Label>
                        <textarea
                            value={form.description}
                            onChange={e => handleChange('description', e.target.value)}
                            rows={4}
                            placeholder="รายละเอียดโครงการ..."
                            className="w-full border border-slate-200 rounded-lg p-3 text-sm focus:outline-none focus:border-amber-400 resize-none"
                        />
                    </div>
                </div>

                <div className="px-6 py-4 border-t border-slate-50 bg-slate-50/50 flex justify-end gap-3 flex-shrink-0">
                    <Button variant="ghost" onClick={onClose} disabled={saving} className="text-slate-500 h-10 text-sm">ยกเลิก</Button>
                    <Button onClick={handleSaveClick} disabled={saving} className="bg-amber-500 hover:bg-amber-600 text-white min-w-[120px] h-10 text-sm shadow shadow-amber-500/20 font-bold">
                        {saving ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : <Save className="w-4 h-4 mr-2" />}
                        {item ? 'บันทึกการแก้ไข' : 'สร้างโครงการ'}
                    </Button>
                </div>
            </div>
        </div>
    )
}

function Save({ className }) {
    return <path className={className} d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z" />
}

// ---- Card ---- //
function PortfolioCard({ item, onEdit, onDelete }) {
    const mainImage = item.images?.[0]?.url || null

    return (
        <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden group hover:shadow-xl transition-all duration-300">
            <div className="relative aspect-[4/3] bg-slate-100 flex items-center justify-center overflow-hidden">
                {mainImage ? (
                    <img src={mainImage} alt={item.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                ) : (
                    <Briefcase className="w-10 h-10 text-slate-300" />
                )}

                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                    <button onClick={() => onEdit(item)} className="w-10 h-10 rounded-xl bg-white shadow-lg flex items-center justify-center text-amber-500 hover:scale-110 transition-all">
                        <Edit2 className="w-4 h-4" />
                    </button>
                    <button onClick={() => onDelete(item._id)} className="w-10 h-10 rounded-xl bg-white shadow-lg flex items-center justify-center text-red-500 hover:scale-110 transition-all">
                        <Trash2 className="w-4 h-4" />
                    </button>
                </div>

                <div className="absolute top-3 left-3">
                    <span className={`text-[10px] font-bold px-2.5 py-1 rounded-lg backdrop-blur-md ${item.status === 'active' ? 'bg-emerald-500/80 text-white' : 'bg-slate-500/80 text-white'}`}>
                        {item.status === 'active' ? '● ONLINE' : '○ HIDDEN'}
                    </span>
                </div>

                {item.images?.length > 1 && (
                    <div className="absolute bottom-3 right-3 bg-black/50 text-white text-[10px] px-2 py-1 rounded-md backdrop-blur-sm">
                        +{item.images.length - 1} รูปภาพ
                    </div>
                )}
            </div>

            <div className="p-5">
                <span className={`inline-block text-[10px] font-bold px-2 py-1 rounded-md mb-3 ${categoryColors[item.category] ?? 'bg-slate-100 text-slate-500'} uppercase tracking-wider`}>
                    {item.category}
                </span>
                <h3 className="text-base font-bold text-slate-800 line-clamp-1 group-hover:text-primary-600 transition-colors mb-2">{item.title}</h3>
                <div className="flex items-center gap-4 text-slate-400">
                    <span className="flex items-center gap-1.5 text-xs"><MapPin className="w-3.5 h-3.5 text-primary-500" />{item.location}</span>
                    <span className="flex items-center gap-1.5 text-xs"><Calendar className="w-3.5 h-3.5 text-primary-500" />{item.year || '-'}</span>
                </div>
            </div>
        </div>
    )
}

// ---- Main ---- //
export default function AdminPortfolio() {
    const [items, setItems] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)
    const [search, setSearch] = useState('')
    const [modal, setModal] = useState(null)
    const [saving, setSaving] = useState(false)

    const loadData = async () => {
        try {
            setLoading(true)
            const res = await portfolioApi.getAll()
            setItems(res.data || [])
        } catch (err) {
            setError(err.message || 'Error loading portfolio')
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => { loadData() }, [])

    const filtered = items.filter(i => i.title.toLowerCase().includes(search.toLowerCase()))

    const handleSave = async (formData, images) => {
        setSaving(true)
        try {
            const fd = new FormData()
            Object.entries(formData).forEach(([k, v]) => fd.append(k, v))
            images.forEach(img => fd.append('images', img))

            if (modal === 'add') {
                await portfolioApi.create(fd)
            } else {
                await portfolioApi.update(modal._id, fd)
            }

            setModal(null)
            await loadData()
        } catch (err) {
            alert('บันทึกไม่สำเร็จ: ' + err.message)
        } finally {
            setSaving(false)
        }
    }

    const handleDelete = async (id) => {
        if (!window.confirm('ต้องการลบผลงานนี้หรือไม่? เมื่อลบแล้วข้อมูลภาพจะถูกลบออกจาก Cloudinary ด้วย')) return
        try {
            await portfolioApi.delete(id)
            setItems(p => p.filter(i => i._id !== id))
        } catch (err) {
            alert('ลบไม่สำเร็จ: ' + err.message)
        }
    }

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-extrabold text-slate-900">จัดการผลงาน</h1>
                    <p className="text-sm text-slate-400 mt-1 font-medium">คลังโปรเจคงานฝีมือของ C&P Building</p>
                </div>
                <div className="flex gap-2">
                    <Button variant="outline" onClick={loadData} disabled={loading} className="h-10 border-slate-200">
                        <RefreshCw className={`w-4 h-4 text-slate-400 ${loading ? 'animate-spin' : ''}`} />
                    </Button>
                    <Button onClick={() => setModal('add')} className="bg-amber-500 hover:bg-amber-600 text-white gap-2 h-10 text-sm shadow-lg shadow-amber-500/20 font-bold px-6">
                        <Plus className="w-5 h-5" /> เพิ่มผลงาน
                    </Button>
                </div>
            </div>

            {error && (
                <div className="bg-red-50 border border-red-100 p-4 rounded-2xl flex items-center justify-between text-red-600">
                    <div className="flex items-center gap-3">
                        <AlertCircle className="w-5 h-5" />
                        <span className="text-sm font-medium">{error}</span>
                    </div>
                    <Button size="sm" variant="ghost" onClick={loadData} className="text-red-600 hover:bg-red-100 h-8">ลองใหม่</Button>
                </div>
            )}

            {/* Summary Strip */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {[
                    { label: 'ผลงานทั้งหมด', value: items.length, color: 'text-slate-900', bg: 'bg-white' },
                    { label: 'บทความแนะนำ', value: items.filter(i => i.status === 'active').length, color: 'text-emerald-600', bg: 'bg-emerald-50/30' },
                    { label: 'ซ่อนอยู่', value: items.filter(i => i.status === 'inactive').length, color: 'text-amber-600', bg: 'bg-amber-50/30' },
                    { label: 'หมวดหมู่', value: CATEGORIES.length, color: 'text-blue-600', bg: 'bg-blue-50/30' },
                ].map(s => (
                    <div key={s.label} className={`${s.bg} rounded-2xl border border-slate-100 shadow-sm px-6 py-5`}>
                        <p className={`text-2xl font-extrabold ${s.color}`}>{loading ? '—' : s.value}</p>
                        <p className="text-[11px] text-slate-400 mt-1 font-bold uppercase tracking-widest">{s.label}</p>
                    </div>
                ))}
            </div>

            {/* Toolbar */}
            <div className="flex items-center justify-between bg-white p-4 rounded-2xl border border-slate-100 shadow-sm">
                <div className="relative w-full max-w-sm">
                    <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-300" />
                    <input
                        type="text"
                        value={search}
                        onChange={e => setSearch(e.target.value)}
                        placeholder="ค้นหาโครงการหรือสถานที่..."
                        className="pl-11 pr-4 py-2.5 w-full bg-slate-50 border-none text-slate-700 placeholder:text-slate-300 text-sm rounded-xl focus:ring-2 focus:ring-amber-100 transition-all outline-none"
                    />
                </div>
            </div>

            {/* Grid */}
            {loading ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {[1, 2, 3, 4, 5, 6].map(i => (
                        <div key={i} className="bg-white rounded-2xl h-80 border border-slate-100 animate-pulse" />
                    ))}
                </div>
            ) : filtered.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-24 text-center bg-white rounded-3xl border border-slate-100 border-dashed">
                    <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center mb-4">
                        <Briefcase className="w-8 h-8 text-slate-200" />
                    </div>
                    <p className="text-slate-500 font-bold text-lg">ไม่พบข้อมูลผลงาน</p>
                    <p className="text-slate-400 text-sm mt-1 max-w-xs mx-auto">ยังไม่มีข้อมูลโครงการที่ท่านค้นหา เพิ่มโปรเจคใหม่ได้ที่ปุ่มด้านบน</p>
                </div>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-6">
                    {filtered.map(item => (
                        <PortfolioCard key={item._id} item={item} onEdit={setModal} onDelete={handleDelete} />
                    ))}
                </div>
            )}

            {/* Modal / Drawer */}
            {modal && (
                <PortfolioModal
                    item={modal === 'add' ? null : modal}
                    onClose={() => setModal(null)}
                    onSave={handleSave}
                    saving={saving}
                />
            )}
        </div>
    )
}
