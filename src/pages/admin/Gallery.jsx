import React, { useState, useEffect, useRef } from 'react'
import { Button } from '@/components/ui/button'
import { Upload, Trash2, ImageIcon, CheckCircle2, X, Grid3X3, List, RefreshCw, AlertCircle, Loader2, FileText, Plus } from 'lucide-react'
import { galleryApi } from '@/lib/api'

// ---- Image Component ---- //
function GalleryImage({ image, selected, onClick, view }) {
    if (view === 'grid') {
        return (
            <div
                onClick={onClick}
                className={`relative group cursor-pointer rounded-2xl overflow-hidden border-2 transition-all duration-200 ${selected ? 'border-amber-500 ring-4 ring-amber-400/20 scale-95 shadow-lg' : 'border-transparent hover:border-slate-200 shadow-sm'
                    }`}
            >
                <div className="aspect-square bg-slate-50 overflow-hidden">
                    <img src={image.url} alt={image.name} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                </div>

                {/* Overlay */}
                <div className={`absolute inset-0 bg-black/30 flex items-center justify-center transition-opacity duration-300 ${selected ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'}`}>
                    <div className={`w-8 h-8 rounded-xl flex items-center justify-center transition-all ${selected ? 'bg-amber-500 text-white scale-110' : 'bg-white/90 text-slate-400'}`}>
                        {selected ? <CheckCircle2 className="w-5 h-5" /> : <Plus className="w-4 h-4" />}
                    </div>
                </div>

                {/* File Info On Hover */}
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-3 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                    <p className="text-[10px] text-white font-medium truncate">{image.name}</p>
                    <p className="text-[8px] text-white/60">{(image.size / 1024 / 1024).toFixed(2)} MB</p>
                </div>
            </div>
        )
    }

    return null // Handled in table body
}

// ---- Main ---- //
export default function AdminGallery() {
    const [images, setImages] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)
    const [selectedIds, setSelectedIds] = useState([])
    const [view, setView] = useState('grid')
    const [uploading, setUploading] = useState(false)
    const fileRef = useRef()

    const loadData = async () => {
        try {
            setLoading(true)
            const res = await galleryApi.getAll({ limit: 100 })
            setImages(res.data || [])
        } catch (err) {
            setError(err.message || 'โหลดรูปภาพไม่สำเร็จ')
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => { loadData() }, [])

    const toggleSelect = (id) => {
        setSelectedIds(p => p.includes(id) ? p.filter(x => x !== id) : [...p, id])
    }

    const clearSelection = () => setSelectedIds([])

    const deleteSelected = async () => {
        if (!window.confirm(`ต้องการลบ ${selectedIds.length} รูปที่เลือกหรือไม่?`)) return
        setLoading(true)
        try {
            await galleryApi.deleteBulk(selectedIds)
            setImages(p => p.filter(img => !selectedIds.includes(img._id)))
            setSelectedIds([])
        } catch (err) {
            alert('ลบไม่สำเร็จ: ' + err.message)
        } finally {
            setLoading(false)
        }
    }

    const handleFileChange = async (e) => {
        const files = Array.from(e.target.files)
        if (files.length === 0) return

        setUploading(true)
        const fd = new FormData()
        files.forEach(f => fd.append('images', f))

        try {
            await galleryApi.upload(fd)
            await loadData()
        } catch (err) {
            alert('อัปโหลดไม่สำเร็จ: ' + err.message)
        } finally {
            setUploading(false)
            if (fileRef.current) fileRef.current.value = ''
        }
    }

    const totalSize = images.reduce((acc, current) => acc + (current.size || 0), 0)
    const totalSizeMB = (totalSize / 1024 / 1024).toFixed(1)

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-extrabold text-slate-900">จัดการแกลลอรี่</h1>
                    <p className="text-sm text-slate-400 mt-1 font-medium">รวมรูปภาพโครงการทั้งหมดไว้ในที่เดียว</p>
                </div>
                <div className="flex items-center gap-2">
                    {selectedIds.length > 0 && (
                        <>
                            <Button variant="ghost" onClick={clearSelection} className="h-10 text-sm text-slate-500 font-bold px-4">
                                ยกเลิก ({selectedIds.length})
                            </Button>
                            <Button onClick={deleteSelected} className="h-10 text-sm bg-red-500 hover:bg-red-600 text-white gap-2 shadow-lg shadow-red-500/20 font-bold px-5">
                                <Trash2 className="w-4 h-4" /> ลบที่เลือก
                            </Button>
                        </>
                    )}
                    <Button
                        disabled={uploading}
                        onClick={() => fileRef.current?.click()}
                        className="bg-amber-500 hover:bg-amber-600 text-white gap-2 h-10 text-sm shadow-lg shadow-amber-500/20 font-bold px-6"
                    >
                        {uploading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Upload className="w-4 h-4" />}
                        {uploading ? 'กำลังอัปโหลด...' : 'อัปโหลดรูป'}
                    </Button>
                    <input ref={fileRef} type="file" multiple accept="image/*" className="hidden" onChange={handleFileChange} />
                </div>
            </div>

            {error && (
                <div className="bg-red-50 border border-red-100 p-4 rounded-2xl flex items-center justify-between text-red-600">
                    <div className="flex items-center gap-3 font-medium">
                        <AlertCircle className="w-5 h-5" />
                        {error}
                    </div>
                    <Button variant="ghost" size="sm" onClick={loadData} className="text-red-600 hover:bg-red-100">ลองใหม่</Button>
                </div>
            )}

            {/* Summary */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {[
                    { label: 'รูปทั้งหมด', value: loading ? '...' : images.length, color: 'text-slate-900', bg: 'bg-white' },
                    { label: 'เลือกอยู่', value: selectedIds.length, color: 'text-amber-600', bg: 'bg-amber-50/20' },
                    { label: 'พื้นที่ใช้รวม', value: loading ? '...' : `${totalSizeMB} MB`, color: 'text-blue-600', bg: 'bg-blue-50/20' },
                    { label: 'อัปโหลดลาสุด', value: images[0] ? new Date(images[0].createdAt).toLocaleDateString('th-TH', { day: 'numeric', month: 'short' }) : '-', color: 'text-slate-600', bg: 'bg-slate-50' },
                ].map(s => (
                    <div key={s.label} className={`${s.bg} rounded-2xl border border-slate-100 shadow-sm px-6 py-5`}>
                        <p className={`text-2xl font-extrabold ${s.color}`}>{s.value}</p>
                        <p className="text-[10px] text-slate-400 mt-1 font-bold uppercase tracking-widest">{s.label}</p>
                    </div>
                ))}
            </div>

            {/* Toolbar */}
            <div className="flex items-center justify-between bg-white rounded-2xl border border-slate-100 shadow-sm px-5 py-3">
                <div className="flex items-center gap-4">
                    <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">แสดงผล: {images.length} ไฟล์</p>
                    {loading && <Loader2 className="w-4 h-4 text-amber-500 animate-spin" />}
                </div>
                <div className="flex gap-1 p-1 bg-slate-50 rounded-xl">
                    <button
                        onClick={() => setView('grid')}
                        className={`w-9 h-9 rounded-lg flex items-center justify-center transition-all ${view === 'grid' ? 'bg-white text-amber-500 shadow-sm' : 'text-slate-400 hover:text-slate-600'}`}
                    ><Grid3X3 className="w-4 h-4" /></button>
                    <button
                        onClick={() => setView('list')}
                        className={`w-9 h-9 rounded-lg flex items-center justify-center transition-all ${view === 'list' ? 'bg-white text-amber-500 shadow-sm' : 'text-slate-400 hover:text-slate-600'}`}
                    ><List className="w-4 h-4" /></button>
                </div>
            </div>

            {/* Gallery Main */}
            {loading && images.length === 0 ? (
                <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-4">
                    {[...Array(16)].map((_, i) => (
                        <div key={i} className="aspect-square bg-white rounded-2xl border border-slate-100 animate-pulse" />
                    ))}
                </div>
            ) : images.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-24 text-center bg-white rounded-3xl border border-slate-100 border-dashed">
                    <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center mb-4">
                        <ImageIcon className="w-8 h-8 text-slate-200" />
                    </div>
                    <p className="text-slate-500 font-bold text-lg">ยังไม่มีรูปภาพในคลัง</p>
                    <p className="text-slate-400 text-sm mt-1">เริ่มอัปโหลดรูปภาพเพื่อใช้งานในส่วนต่างๆ ของเว็บไซต์</p>
                </div>
            ) : view === 'grid' ? (
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
                    {images.map(img => (
                        <GalleryImage
                            key={img._id}
                            image={img}
                            view={view}
                            selected={selectedIds.includes(img._id)}
                            onClick={() => toggleSelect(img._id)}
                        />
                    ))}
                </div>
            ) : (
                <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
                    <table className="w-full text-sm">
                        <thead>
                            <tr className="bg-slate-50/70 border-b border-slate-100">
                                <th className="w-10 px-5 py-4 text-left">
                                    <input type="checkbox"
                                        checked={selectedIds.length === images.length && images.length > 0}
                                        onChange={() => selectedIds.length === images.length ? clearSelection() : setSelectedIds(images.map(i => i._id))}
                                        className="accent-amber-500 w-4 h-4"
                                    />
                                </th>
                                <th className="text-left px-4 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest">ไฟล์</th>
                                <th className="text-left px-4 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest">ขนาด</th>
                                <th className="text-left px-4 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest">วันที่อัปโหลด</th>
                                <th className="text-right px-6 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest">จัดการ</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-50">
                            {images.map(img => (
                                <tr key={img._id} className={`group hover:bg-slate-50/60 transition-colors ${selectedIds.includes(img._id) ? 'bg-amber-50/30' : ''}`}>
                                    <td className="px-5 py-4">
                                        <input type="checkbox" checked={selectedIds.includes(img._id)} onChange={() => toggleSelect(img._id)} className="accent-amber-500 w-4 h-4" />
                                    </td>
                                    <td className="px-4 py-4">
                                        <div className="flex items-center gap-4">
                                            <div className="w-12 h-12 rounded-xl border border-slate-100 overflow-hidden bg-slate-50 shadow-sm">
                                                <img src={img.url} className="w-full h-full object-cover" />
                                            </div>
                                            <span className="font-bold text-slate-700 text-sm truncate max-w-[200px]">{img.name}</span>
                                        </div>
                                    </td>
                                    <td className="px-4 py-4 text-xs font-medium text-slate-500">{(img.size / 1024 / 1024).toFixed(2)} MB</td>
                                    <td className="px-4 py-4 text-xs text-slate-400">
                                        {new Date(img.createdAt).toLocaleDateString('th-TH', { day: 'numeric', month: 'short', year: 'numeric' })}
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="flex justify-end opacity-0 group-hover:opacity-100 transition-opacity">
                                            <button
                                                onClick={async () => {
                                                    if (!window.confirm('ลบรูปนี้?')) return;
                                                    await galleryApi.delete(img._id);
                                                    setImages(p => p.filter(i => i._id !== img._id));
                                                }}
                                                className="w-8 h-8 rounded-lg bg-red-50 text-red-500 hover:bg-red-500 hover:text-white transition-all flex items-center justify-center border border-red-100"
                                            ><Trash2 className="w-4 h-4" /></button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    )
}
