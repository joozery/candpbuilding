import React, { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Plus, Search, Filter, Eye, Edit2, Trash2, FileText, ChevronDown, RefreshCw, AlertCircle } from 'lucide-react'
import { articlesApi } from '@/lib/api'
import ArticleFormDrawer from '@/components/admin/ArticleFormDrawer'

// ---- Sub-components ---- //
function StatusPill({ status }) {
    const isPublished = status === 'published'
    return (
        <span className={`inline-flex items-center gap-1.5 text-[11px] font-semibold px-2.5 py-1 rounded-full ${isPublished ? 'text-emerald-600 bg-emerald-50' : 'text-amber-600 bg-amber-50'
            }`}>
            <span className={`w-1.5 h-1.5 rounded-full ${isPublished ? 'bg-emerald-500' : 'bg-amber-500'}`} />
            {isPublished ? 'เผยแพร่แล้ว' : 'ฉบับร่าง'}
        </span>
    )
}

function SkeletonRow() {
    return (
        <tr className="border-b border-slate-50">
            {[280, 80, 100, 80, 50, 80].map((w, i) => (
                <td key={i} className="px-5 py-4">
                    <div className={`h-4 bg-slate-100 rounded animate-pulse`} style={{ width: w }} />
                </td>
            ))}
        </tr>
    )
}

function ErrorBanner({ message, onRetry }) {
    return (
        <div className="flex items-center gap-3 p-4 bg-red-50 border border-red-100 rounded-xl text-sm text-red-600">
            <AlertCircle className="w-4 h-4 flex-shrink-0" />
            <span className="flex-1">{message}</span>
            <button onClick={onRetry} className="flex items-center gap-1.5 text-xs font-medium hover:text-red-700">
                <RefreshCw className="w-3.5 h-3.5" /> ลองใหม่
            </button>
        </div>
    )
}

// ---- Main Component ---- //
export default function AdminArticles() {
    const [articles, setArticles] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)
    const [search, setSearch] = useState('')
    const [drawer, setDrawer] = useState({ open: false, article: null })
    const [saving, setSaving] = useState(false)

    const loadArticles = async () => {
        try {
            setLoading(true)
            setError(null)
            const res = await articlesApi.getAll()
            setArticles(res.data || [])
        } catch (err) {
            setError(err.message || 'โหลดข้อมูลไม่ได้')
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => { loadArticles() }, [])

    const openAdd = () => setDrawer({ open: true, article: null })
    const openEdit = (article) => setDrawer({ open: true, article })
    const closeDrawer = () => setDrawer({ open: false, article: null })

    const handleSave = async (data, imageFile) => {
        setSaving(true)
        try {
            const fd = new FormData()
            Object.entries(data).forEach(([k, v]) => fd.append(k, v))
            if (imageFile) fd.append('image', imageFile)

            if (drawer.article) {
                await articlesApi.update(drawer.article._id, fd)
            } else {
                await articlesApi.create(fd)
            }
            closeDrawer()
            await loadArticles()
        } catch (err) {
            alert('บันทึกไม่สำเร็จ: ' + err.message)
        } finally {
            setSaving(false)
        }
    }

    const handleDelete = async (id) => {
        if (!window.confirm('ต้องการลบบทความนี้หรือไม่?')) return
        try {
            await articlesApi.delete(id)
            setArticles(p => p.filter(a => a._id !== id))
        } catch (err) {
            alert('ลบไม่สำเร็จ: ' + err.message)
        }
    }

    const filtered = articles.filter(a =>
        a.title.toLowerCase().includes(search.toLowerCase())
    )

    const totalPublished = articles.filter(a => a.status === 'published').length
    const totalDraft = articles.filter(a => a.status === 'draft').length

    return (
        <>
            <div className="space-y-5">

                {/* Page Header */}
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-xl font-bold text-slate-800">จัดการบทความ</h1>
                        <p className="text-sm text-slate-400 mt-0.5">สร้าง แก้ไข และเผยแพร่บทความทั้งหมด</p>
                    </div>
                    <div className="flex gap-2">
                        <Button variant="outline" onClick={loadArticles} className="h-9 text-slate-500 border-slate-200">
                            <RefreshCw className="w-4 h-4" />
                        </Button>
                        <Button onClick={openAdd} className="bg-amber-500 hover:bg-amber-600 text-white gap-2 h-9 text-sm shadow shadow-amber-500/20">
                            <Plus className="w-4 h-4" /> เพิ่มบทความ
                        </Button>
                    </div>
                </div>

                {error && <ErrorBanner message={error} onRetry={loadArticles} />}

                {/* Summary Strip */}
                <div className="grid grid-cols-3 gap-4">
                    {[
                        { label: 'ทั้งหมด', value: articles.length, accent: 'text-slate-800' },
                        { label: 'เผยแพร่', value: totalPublished, accent: 'text-emerald-600' },
                        { label: 'ฉบับร่าง', value: totalDraft, accent: 'text-amber-600' },
                    ].map(s => (
                        <div key={s.label} className="bg-white rounded-xl border border-slate-100 shadow-sm px-5 py-4">
                            <p className={`text-2xl font-bold ${s.accent}`}>{loading ? '—' : s.value}</p>
                            <p className="text-xs text-slate-400 mt-0.5 font-medium">{s.label}</p>
                        </div>
                    ))}
                </div>

                {/* Table Card */}
                <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
                    {/* Toolbar */}
                    <div className="flex items-center justify-between px-5 py-3 border-b border-slate-100">
                        <div className="relative">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400" />
                            <Input
                                value={search}
                                onChange={e => setSearch(e.target.value)}
                                placeholder="ค้นหาบทความ..."
                                className="pl-9 h-8 w-60 bg-slate-50 border-slate-200 text-sm rounded-lg"
                            />
                        </div>
                        <Button variant="outline" size="sm" className="text-slate-500 border-slate-200 gap-2 h-8 text-xs">
                            <Filter className="w-3.5 h-3.5" /> ตัวกรอง <ChevronDown className="w-3 h-3" />
                        </Button>
                    </div>

                    {/* Table */}
                    <table className="w-full text-sm">
                        <thead>
                            <tr className="bg-slate-50/70 border-b border-slate-100">
                                <th className="text-left px-5 py-3 text-xs font-semibold text-slate-400 uppercase tracking-wider">บทความ</th>
                                <th className="text-left px-4 py-3 text-xs font-semibold text-slate-400 uppercase tracking-wider">หมวดหมู่</th>
                                <th className="text-left px-4 py-3 text-xs font-semibold text-slate-400 uppercase tracking-wider">สถานะ</th>
                                <th className="text-left px-4 py-3 text-xs font-semibold text-slate-400 uppercase tracking-wider">วันที่</th>
                                <th className="text-right px-4 py-3 text-xs font-semibold text-slate-400 uppercase tracking-wider">วิว</th>
                                <th className="text-right px-5 py-3 text-xs font-semibold text-slate-400 uppercase tracking-wider">จัดการ</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-50">
                            {loading ? (
                                Array.from({ length: 5 }).map((_, i) => <SkeletonRow key={i} />)
                            ) : filtered.length === 0 ? (
                                <tr>
                                    <td colSpan={6} className="py-16 text-center text-slate-400 text-sm">
                                        <FileText className="w-8 h-8 text-slate-200 mx-auto mb-2" />
                                        {search ? `ไม่พบบทความที่ค้นหา "${search}"` : 'ยังไม่มีบทความ คลิก "เพิ่มบทความ" เพื่อเริ่มต้น'}
                                    </td>
                                </tr>
                            ) : (
                                filtered.map(article => (
                                    <tr key={article._id} className="group hover:bg-slate-50/60 transition-colors">
                                        <td className="px-5 py-3.5">
                                            <div className="flex items-center gap-3">
                                                {article.image?.url ? (
                                                    <img src={article.image.url} alt={article.title}
                                                        className="w-8 h-8 rounded-lg object-cover flex-shrink-0" />
                                                ) : (
                                                    <div className={`w-8 h-8 rounded-lg bg-gradient-to-br ${article.gradient || 'from-slate-300 to-slate-400'} flex items-center justify-center flex-shrink-0`}>
                                                        <FileText className="w-3.5 h-3.5 text-white" />
                                                    </div>
                                                )}
                                                <span className="font-medium text-slate-700 line-clamp-1 max-w-xs">{article.title}</span>
                                            </div>
                                        </td>
                                        <td className="px-4 py-3.5">
                                            <span className="text-xs text-slate-400">{article.category}</span>
                                        </td>
                                        <td className="px-4 py-3.5">
                                            <StatusPill status={article.status} />
                                        </td>
                                        <td className="px-4 py-3.5">
                                            <span className="text-xs text-slate-400">
                                                {new Date(article.createdAt).toLocaleDateString('th-TH', { day: 'numeric', month: 'short', year: 'numeric' })}
                                            </span>
                                        </td>
                                        <td className="px-4 py-3.5 text-right">
                                            <span className="text-sm font-medium text-slate-500">{article.views?.toLocaleString() || '0'}</span>
                                        </td>
                                        <td className="px-5 py-3.5">
                                            <div className="flex items-center justify-end gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity">
                                                <a href={`/articles/${article._id}`} target="_blank" rel="noreferrer"
                                                    className="w-7 h-7 rounded-lg bg-blue-50 border border-blue-100 flex items-center justify-center text-blue-500 hover:bg-blue-100 transition-colors">
                                                    <Eye className="w-3.5 h-3.5" />
                                                </a>
                                                <button onClick={() => openEdit(article)}
                                                    className="w-7 h-7 rounded-lg bg-amber-50 border border-amber-100 flex items-center justify-center text-amber-500 hover:bg-amber-100 transition-colors">
                                                    <Edit2 className="w-3.5 h-3.5" />
                                                </button>
                                                <button onClick={() => handleDelete(article._id)}
                                                    className="w-7 h-7 rounded-lg bg-red-50 border border-red-100 flex items-center justify-center text-red-500 hover:bg-red-100 transition-colors">
                                                    <Trash2 className="w-3.5 h-3.5" />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>

                    {/* Footer */}
                    <div className="flex items-center justify-between px-5 py-3 border-t border-slate-100 bg-slate-50/40">
                        <p className="text-xs text-slate-400">
                            {loading ? 'กำลังโหลด...' : `แสดง ${filtered.length} จาก ${articles.length} รายการ`}
                        </p>
                    </div>
                </div>
            </div>

            <ArticleFormDrawer
                open={drawer.open}
                article={drawer.article}
                onClose={closeDrawer}
                onSave={handleSave}
                saving={saving}
            />
        </>
    )
}
