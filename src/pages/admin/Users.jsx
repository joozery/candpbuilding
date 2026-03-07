import React, { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
    UserPlus, Shield, Trash2, Mail, User, Key,
    RefreshCw, AlertCircle, ShieldCheck, UserCog, Calendar
} from 'lucide-react'
import { usersApi } from '@/lib/api'

// ---- Modal For New Admin ---- //
function NewAdminModal({ open, onClose, onSave, saving }) {
    const [data, setData] = useState({ name: '', email: '', password: '', role: 'admin' })
    if (!open) return null

    return (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-slate-900/40">
            <div className="bg-white w-full max-w-md rounded-[2.5rem] shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-300">
                <div className="p-10">
                    <div className="flex items-center gap-4 mb-8">
                        <div className="w-12 h-12 rounded-2xl bg-primary-100 flex items-center justify-center text-primary-600">
                            <UserPlus className="w-6 h-6" />
                        </div>
                        <div>
                            <h3 className="text-xl font-black text-slate-800 tracking-tight">เพิ่มผู้ดูแลระบบ</h3>
                            <p className="text-xs text-slate-400 font-medium uppercase tracking-widest">New Administrator</p>
                        </div>
                    </div>

                    <div className="space-y-5">
                        <div className="space-y-2">
                            <Label className="text-xs font-black text-slate-400 uppercase tracking-widest ml-1">ชื่อ-นามสกุล</Label>
                            <Input
                                value={data.name}
                                onChange={e => setData({ ...data, name: e.target.value })}
                                placeholder="เช่น สมชาย ใจดี"
                                className="h-12 rounded-2xl border-slate-100 bg-slate-50/50 focus:bg-white transition-all shadow-none"
                            />
                        </div>
                        <div className="space-y-2">
                            <Label className="text-xs font-black text-slate-400 uppercase tracking-widest ml-1">อีเมล</Label>
                            <Input
                                type="email"
                                value={data.email}
                                onChange={e => setData({ ...data, email: e.target.value })}
                                placeholder="name@email.com"
                                className="h-12 rounded-2xl border-slate-100 bg-slate-50/50 focus:bg-white transition-all shadow-none"
                            />
                        </div>
                        <div className="space-y-2">
                            <Label className="text-xs font-black text-slate-400 uppercase tracking-widest ml-1">รหัสผ่าน</Label>
                            <Input
                                type="password"
                                value={data.password}
                                onChange={e => setData({ ...data, password: e.target.value })}
                                placeholder="••••••••"
                                className="h-12 rounded-2xl border-slate-100 bg-slate-50/50 focus:bg-white transition-all shadow-none"
                            />
                        </div>
                    </div>

                    <div className="flex gap-3 mt-10">
                        <Button variant="ghost" onClick={onClose} className="flex-1 h-12 rounded-2xl font-bold text-slate-400 hover:bg-slate-50">ยกเลิก</Button>
                        <Button
                            onClick={() => onSave(data)}
                            disabled={saving}
                            className="flex-1 h-12 rounded-2xl bg-primary-600 hover:bg-primary-700 text-white font-bold shadow-lg shadow-primary-500/20"
                        >
                            {saving ? 'กำลังประมวลผล...' : 'ยืนยันการเพิ่ม'}
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default function AdminUsers() {
    const [users, setUsers] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)
    const [modalOpen, setModalOpen] = useState(false)
    const [saving, setSaving] = useState(false)

    const loadUsers = async () => {
        try {
            setLoading(true)
            const res = await usersApi.getAll()
            setUsers(res.data || [])
        } catch (err) {
            setError(err.message || 'โหลดข้อมูลไม่สำเร็จ')
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => { loadUsers() }, [])

    const handleCreate = async (data) => {
        if (!data.name || !data.email || !data.password) return alert('กรุณากรอกข้อมูลให้ครบถ้วน')
        setSaving(true)
        try {
            await usersApi.create(data)
            setModalOpen(false)
            await loadUsers()
        } catch (err) {
            alert('เพิ่มไม่สำเร็จ: ' + err.message)
        } finally {
            setSaving(false)
        }
    }

    const handleDelete = async (id) => {
        if (!window.confirm('คุณต้องการลบผู้ดูแลระบบคนนี้ใช่หรือไม่?')) return
        try {
            await usersApi.delete(id)
            setUsers(p => p.filter(u => u._id !== id))
        } catch (err) {
            alert('ลบไม่สำเร็จ: ' + err.message)
        }
    }

    return (
        <div className="space-y-8">
            {/* Header Area */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                <div>
                    <div className="flex items-center gap-3 mb-2">
                        <div className="w-10 h-10 rounded-2xl bg-primary-600 flex items-center justify-center text-white shadow-lg shadow-primary-500/20">
                            <ShieldCheck className="w-5 h-5" />
                        </div>
                        <h1 className="text-3xl font-black text-slate-800 tracking-tight">จัดการผู้ดูแลระบบ</h1>
                    </div>
                    <p className="text-sm text-slate-400 font-medium">เพิ่ม ลด และตั้งค่าสิทธิ์การเข้าถึงหลังบ้าน ของทีมงาน C&P Building</p>
                </div>
                <Button
                    onClick={() => setModalOpen(true)}
                    className="h-12 px-8 rounded-2xl bg-primary-600 hover:bg-primary-700 text-white font-bold shadow-xl shadow-primary-500/20 transition-all active:scale-95 group"
                >
                    <UserPlus className="w-4 h-4 mr-2 group-hover:rotate-12 transition-transform" /> เพิ่มผู้ดูแลใหม่
                </Button>
            </div>

            {error ? (
                <div className="bg-red-50 p-10 rounded-[2.5rem] border border-red-100 flex flex-col items-center text-center">
                    <div className="w-16 h-16 bg-red-100 rounded-3xl flex items-center justify-center text-red-500 mb-4">
                        <AlertCircle className="w-8 h-8" />
                    </div>
                    <h3 className="text-lg font-black text-red-700 mb-1">เกิดข้อผิดพลาดในการโหลด</h3>
                    <p className="text-red-500 text-sm mb-6 max-w-xs">{error}</p>
                    <Button onClick={loadUsers} className="bg-white border border-red-200 text-red-600 hover:bg-red-50 rounded-2xl px-8 h-12 font-bold">
                        <RefreshCw className="w-4 h-4 mr-2" /> ลองอีกครั้ง
                    </Button>
                </div>
            ) : loading ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {[1, 2, 3].map(item => (
                        <div key={item} className="h-64 bg-white rounded-[2.5rem] border border-slate-100 animate-pulse" />
                    ))}
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {users.map((user) => (
                        <div key={user._id} className="group relative bg-white rounded-[2.5rem] border border-slate-100 p-8 hover:shadow-2xl hover:shadow-slate-200/50 transition-all duration-500 hover:-translate-y-2 overflow-hidden">
                            {/* Accent Decoration */}
                            <div className="absolute top-0 right-0 w-32 h-32 bg-primary-50 rounded-bl-[4rem] -mr-16 -mt-16 group-hover:bg-primary-100 transition-colors duration-500 opacity-50" />

                            <div className="relative z-10">
                                <div className="flex items-center gap-4 mb-6">
                                    <div className="w-16 h-16 rounded-[2rem] bg-gradient-to-br from-slate-100 to-slate-200 flex items-center justify-center group-hover:from-primary-500 group-hover:to-primary-600 transition-all duration-500 shadow-inner">
                                        <User className="w-7 h-7 text-slate-400 group-hover:text-white transition-colors duration-500" />
                                    </div>
                                    <div>
                                        <div className="flex gap-2 mb-1">
                                            <span className="px-2 py-0.5 bg-primary-100 text-primary-600 text-[10px] font-black uppercase tracking-widest rounded-lg">Admin</span>
                                        </div>
                                        <h3 className="text-lg font-black text-slate-800 tracking-tight leading-tight">{user.name}</h3>
                                    </div>
                                </div>

                                <div className="space-y-3 mb-8">
                                    <div className="flex items-center gap-3 text-slate-400 group-hover:text-slate-500 transition-colors">
                                        <div className="w-8 h-8 rounded-xl bg-slate-50 flex items-center justify-center">
                                            <Mail className="w-4 h-4" />
                                        </div>
                                        <span className="text-sm font-medium truncate">{user.email}</span>
                                    </div>
                                    <div className="flex items-center gap-3 text-slate-400 group-hover:text-slate-500 transition-colors">
                                        <div className="w-8 h-8 rounded-xl bg-slate-50 flex items-center justify-center">
                                            <Calendar className="w-4 h-4" />
                                        </div>
                                        <span className="text-xs font-medium uppercase tracking-wider">เข้าร่วม: {new Date(user.createdAt).toLocaleDateString('th-TH')}</span>
                                    </div>
                                </div>

                                <div className="flex items-center gap-4 border-t border-slate-50 pt-6">
                                    <button className="flex-1 h-10 rounded-xl bg-slate-50 text-slate-400 font-bold text-xs uppercase tracking-widest hover:bg-slate-100 transition-colors">
                                        Edit Profile
                                    </button>
                                    <button
                                        onClick={() => handleDelete(user._id)}
                                        className="w-10 h-10 rounded-xl bg-red-50 text-red-400 flex items-center justify-center hover:bg-red-500 hover:text-white transition-all shadow-sm shadow-red-500/10"
                                        title="ลบผู้ใช้ออก"
                                    >
                                        <Trash2 className="w-4 h-4" />
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}

                    {/* Empty State / Add Card */}
                    <button
                        onClick={() => setModalOpen(true)}
                        className="group flex flex-col items-center justify-center border-2 border-dashed border-slate-100 rounded-[2.5rem] p-12 hover:border-primary-300 hover:bg-primary-50/10 transition-all duration-500 min-h-[280px]"
                    >
                        <div className="w-16 h-16 rounded-[2rem] bg-slate-50 flex items-center justify-center text-slate-300 group-hover:bg-primary-100 group-hover:text-primary-500 transition-all duration-500 mb-4">
                            <UserPlus className="w-7 h-7" />
                        </div>
                        <p className="text-slate-400 font-bold group-hover:text-primary-600 transition-colors duration-500">เพิ่มผู้ดูแลระบบ</p>
                        <p className="text-[10px] text-slate-300 font-black uppercase tracking-widest mt-1">Add Another Admin</p>
                    </button>
                </div>
            )}

            <NewAdminModal
                open={modalOpen}
                onClose={() => setModalOpen(false)}
                onSave={handleCreate}
                saving={saving}
            />
        </div>
    )
}
