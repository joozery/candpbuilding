import React, { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import {
    Mail, Phone, User, Calendar, Trash2, CheckCircle2,
    Clock, RefreshCw, AlertCircle, MessageSquare, ChevronRight, Search
} from 'lucide-react'
import { contactsApi } from '@/lib/api'

export default function AdminInquiries() {
    const [inquiries, setInquiries] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)
    const [search, setSearch] = useState('')

    const loadInquiries = async () => {
        try {
            setLoading(true)
            const res = await contactsApi.getAll()
            setInquiries(res.data || [])
        } catch (err) {
            setError(err.message || 'โหลดข้อมูลไม่สำเร็จ')
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => { loadInquiries() }, [])

    const handleDelete = async (id) => {
        if (!window.confirm('คุณต้องการลบข้อความนี้ใช่หรือไม่?')) return
        try {
            await contactsApi.delete(id)
            setInquiries(p => p.filter(i => i._id !== id))
        } catch (err) {
            alert('ลบไม่สำเร็จ: ' + err.message)
        }
    }

    const toggleStatus = async (id, currentStatus) => {
        const nextStatus = currentStatus === 'new' ? 'read' : 'new'
        try {
            await contactsApi.updateStatus(id, nextStatus)
            setInquiries(p => p.map(item => item._id === id ? { ...item, status: nextStatus } : item))
        } catch (err) {
            alert('อัปเดตสถานะไม่สำเร็จ')
        }
    }

    const filtered = inquiries.filter(i =>
        i.name.toLowerCase().includes(search.toLowerCase()) ||
        i.phone.includes(search) ||
        i.email.toLowerCase().includes(search.toLowerCase())
    )

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-black text-slate-800 tracking-tight">ข้อความติดต่อ</h1>
                    <p className="text-sm text-slate-400 font-medium">จัดการรายการที่ลูกค้าติดต่อสอบถามจากหน้าเว็บไซต์</p>
                </div>
                <Button variant="outline" onClick={loadInquiries} className="h-10 rounded-xl border-slate-200">
                    <RefreshCw className={`w-4 h-4 mr-2 ${loading ? 'animate-spin' : ''}`} /> รีเฟรช
                </Button>
            </div>

            {error ? (
                <div className="bg-red-50 p-8 rounded-[2rem] border border-red-100 text-center">
                    <AlertCircle className="w-12 h-12 text-red-500 mx-auto mb-4" />
                    <p className="text-red-600 font-bold mb-4">{error}</p>
                    <Button onClick={loadInquiries} className="bg-red-100 text-red-600 hover:bg-red-200">ลองใหม่อีกครั้ง</Button>
                </div>
            ) : loading ? (
                <div className="space-y-4">
                    {[1, 2, 3].map(i => <div key={i} className="h-32 bg-white rounded-3xl border border-slate-100 animate-pulse" />)}
                </div>
            ) : (
                <div className="space-y-4">
                    {/* Search Bar */}
                    <div className="relative max-w-md">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                        <input
                            type="text"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            placeholder="ค้นหาชื่อ, เบอร์โทร หรืออีเมล..."
                            className="w-full pl-12 pr-4 py-3 bg-white rounded-2xl border border-slate-100 shadow-sm focus:outline-none focus:ring-2 focus:ring-primary-100 focus:border-primary-500 transition-all text-sm"
                        />
                    </div>

                    {filtered.length === 0 ? (
                        <div className="bg-white rounded-[2rem] p-20 border border-slate-100 text-center shadow-xl shadow-slate-200/40">
                            <MessageSquare className="w-16 h-16 text-slate-100 mx-auto mb-4" />
                            <p className="text-slate-400 font-bold">ไม่พบข้อความติดต่อในขณะนี้</p>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 gap-4">
                            {filtered.map((item) => (
                                <div key={item._id} className={`group bg-white rounded-[2rem] border transition-all duration-300 ${item.status === 'new' ? 'border-primary-200 shadow-xl shadow-primary-500/10' : 'border-slate-100 hover:shadow-2xl hover:shadow-slate-200/50'}`}>
                                    <div className="p-6 md:p-8 flex flex-col md:flex-row gap-6">

                                        {/* Status & Name Column */}
                                        <div className="w-full md:w-1/4">
                                            <div className="flex items-center gap-3 mb-4">
                                                {item.status === 'new' ? (
                                                    <span className="px-3 py-1 bg-primary-600 text-white text-[10px] font-black uppercase tracking-widest rounded-full">New Message</span>
                                                ) : (
                                                    <span className="px-3 py-1 bg-slate-100 text-slate-400 text-[10px] font-black uppercase tracking-widest rounded-full">Read</span>
                                                )}
                                                <span className="text-[10px] font-black text-slate-300 uppercase tracking-widest ml-auto md:hidden">
                                                    {new Date(item.createdAt).toLocaleDateString('th-TH')}
                                                </span>
                                            </div>
                                            <h3 className="text-xl font-black text-slate-800 mb-1">{item.name}</h3>
                                            <div className="space-y-1">
                                                <p className="text-sm text-slate-400 flex items-center gap-2"><Phone className="w-3 h-3" /> {item.phone}</p>
                                                <p className="text-sm text-slate-400 flex items-center gap-2 truncate"><Mail className="w-3 h-3" /> {item.email}</p>
                                            </div>
                                        </div>

                                        {/* Content Column */}
                                        <div className="flex-1 bg-slate-50/50 rounded-2xl p-6 border border-slate-100">
                                            <div className="flex items-center gap-2 mb-3 text-[10px] font-black uppercase tracking-widest text-primary-600">
                                                <CheckCircle2 className="w-3 h-3" /> บริการที่สนใจ: {item.service}
                                            </div>
                                            <p className="text-slate-600 text-sm leading-relaxed whitespace-pre-wrap">
                                                {item.message}
                                            </p>
                                        </div>

                                        {/* Actions Column */}
                                        <div className="w-full md:w-auto flex md:flex-col justify-between items-center gap-4">
                                            <span className="hidden md:block text-[10px] font-black text-slate-300 uppercase tracking-widest ml-auto">
                                                {new Date(item.createdAt).toLocaleDateString('th-TH')}
                                                <br />
                                                {new Date(item.createdAt).toLocaleTimeString('th-TH', { hour: '2-digit', minute: '2-digit' })} น.
                                            </span>

                                            <div className="flex gap-2 ml-auto md:ml-0">
                                                <button
                                                    onClick={() => toggleStatus(item._id, item.status)}
                                                    className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-all border ${item.status === 'new' ? 'bg-primary-50 text-primary-600 border-primary-100 hover:bg-primary-600 hover:text-white' : 'bg-slate-50 text-slate-400 border-slate-100 hover:bg-slate-100'}`}
                                                    title={item.status === 'new' ? 'ทำเป็นอ่านแล้ว' : 'ทำเป็นยังไม่อ่าน'}
                                                >
                                                    <CheckCircle2 className="w-5 h-5" />
                                                </button>
                                                <button
                                                    onClick={() => handleDelete(item._id)}
                                                    className="w-12 h-12 rounded-2xl bg-red-50 text-red-400 border border-red-100 hover:bg-red-500 hover:text-white transition-all flex items-center justify-center"
                                                    title="ลบข้อความ"
                                                >
                                                    <Trash2 className="w-5 h-5" />
                                                </button>
                                            </div>
                                        </div>

                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            )}
        </div>
    )
}
