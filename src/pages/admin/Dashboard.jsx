import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import StatCard from '@/components/admin/StatCard'
import { Button } from '@/components/ui/button'
import {
    FileText, Briefcase, Eye, TrendingUp,
    Activity, ChevronRight, Plus, CheckCircle2, Loader2, Image as ImageIcon, Database, Globe, Cloud, Layout, ArrowUpRight
} from 'lucide-react'
import { articlesApi, portfolioApi, galleryApi } from '@/lib/api'

export default function AdminDashboard() {
    const [counts, setCounts] = useState({ articles: 0, portfolio: 0, gallery: 0, views: 0 })
    const [loading, setLoading] = useState(true)
    const [latestActivities, setLatestActivities] = useState([])

    const loadStats = async () => {
        try {
            setLoading(true)
            const [art, port, gall] = await Promise.all([
                articlesApi.getAll({ limit: 100 }),
                portfolioApi.getAll({ limit: 100 }),
                galleryApi.getAll({ limit: 100 })
            ])

            const totalArticles = art.data?.length || 0
            const totalPortfolio = port.data?.length || 0
            const totalGallery = gall.data?.length || 0
            const totalViews = art.data?.reduce((sum, item) => sum + (item.views || 0), 0) || 0

            setCounts({
                articles: totalArticles,
                portfolio: totalPortfolio,
                gallery: totalGallery,
                views: totalViews
            })

            // Mock activities based on real data
            const acts = []
            if (art.data?.[0]) acts.push({ icon: FileText, text: 'บทความล่าสุด', sub: art.data[0].title, time: 'เพิ่งอัปเดต', color: 'bg-blue-50 text-blue-500' })
            if (port.data?.[0]) acts.push({ icon: Briefcase, text: 'ผลงานล่าสุด', sub: port.data[0].title, time: 'เพิ่งอัปเดต', color: 'bg-emerald-50 text-emerald-500' })
            if (gall.data?.[0]) acts.push({ icon: ImageIcon, text: 'รูปภาพล่าสุด', sub: gall.data[0].name, time: 'เพิ่งอัปโหลด', color: 'bg-violet-50 text-violet-500' })

            setLatestActivities(acts)

        } catch (err) {
            console.error(err)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => { loadStats() }, [])

    const stats = [
        { label: 'บทความทั้งหมด', value: loading ? '...' : counts.articles, change: '+ใหม่', up: true, icon: FileText, gradient: 'from-blue-500 to-blue-600' },
        { label: 'ผลงานทั้งหมด', value: loading ? '...' : counts.portfolio, change: '+ใหม่', up: true, icon: Briefcase, gradient: 'from-emerald-500 to-teal-600' },
        { label: 'รูปภาพในคลัง', value: loading ? '...' : counts.gallery, change: 'Cloudinary', up: true, icon: ImageIcon, gradient: 'from-violet-500 to-purple-600' },
        { label: 'ยอดวิวรวมบทความ', value: loading ? '...' : counts.views.toLocaleString(), change: 'Total', up: true, icon: Eye, gradient: 'from-amber-500 to-orange-500' },
    ]

    const systemStatus = [
        { label: 'Frontend (Vite)', ok: true, detail: 'Online' },
        { label: 'Backend (Express)', ok: true, detail: 'Connected' },
        { label: 'Database (MongoDB)', ok: true, detail: 'Atlas Ready' },
        { label: 'Images (Cloudinary)', ok: true, detail: 'API Active' },
    ]

    return (
        <div className="space-y-6">
            {/* Welcome Banner */}
            <div className="relative bg-[#0f172a] rounded-[2rem] p-8 md:p-10 overflow-hidden shadow-2xl border border-slate-800">
                <div className="absolute right-0 top-0 bottom-0 w-1/2 bg-gradient-to-l from-amber-500/10 to-transparent pointer-events-none" />
                <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
                    <div className="max-w-xl">
                        <div className="inline-flex items-center gap-2 px-3 py-1 bg-amber-500/10 border border-amber-500/20 rounded-full text-amber-500 text-[10px] font-bold uppercase tracking-widest mb-4">
                            <Activity className="w-3 h-3" /> System Operational
                        </div>
                        <h2 className="text-white text-3xl md:text-4xl font-black mt-2 leading-tight">
                            ยินดีต้อนรับกลับมา, <span className="text-amber-500">C&P Admin</span>
                        </h2>
                        <p className="text-slate-400 text-sm md:text-base mt-2 max-w-md leading-relaxed">
                            วันนี้ระบบทำงานปกติ ทุกข้อมูลถูกเชื่อมต่อกับ MongoDB Atlas และ Cloudinary เรียบร้อยแล้ว
                        </p>
                    </div>
                    <div className="flex gap-3">
                        <Button asChild className="bg-amber-500 hover:bg-amber-600 text-[#0f172a] font-bold px-6 h-12 rounded-2xl shadow-xl shadow-amber-500/20 gap-2">
                            <Link to="/admin/articles">
                                <Plus className="w-5 h-5" /> เพิ่มบทความ
                            </Link>
                        </Button>
                        <Button asChild variant="outline" className="border-slate-700 bg-slate-800/50 text-white hover:bg-slate-700 h-12 rounded-2xl px-6 font-bold">
                            <Link to="/" target="_blank">
                                <Globe className="w-4 h-4 mr-2" /> ดูหน้าเว็บจริง
                            </Link>
                        </Button>
                    </div>
                </div>
                {/* Decorative Elements */}
                <div className="absolute -left-10 -bottom-10 w-40 h-40 bg-primary-600/10 rounded-full blur-3xl" />
                <div className="absolute left-1/2 -top-10 w-40 h-40 bg-violet-600/10 rounded-full blur-3xl opacity-50" />
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">
                {stats.map(s => (
                    <StatCard key={s.label} {...s} />
                ))}
            </div>

            {/* Lower Section */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

                {/* Recent Activity */}
                <div className="lg:col-span-2 bg-white rounded-[2rem] border border-slate-100 shadow-xl shadow-slate-200/40 p-1 flex flex-col">
                    <div className="flex items-center justify-between p-6 pb-4">
                        <div>
                            <h3 className="text-lg font-black text-slate-800 tracking-tight">กิจกรรมล่าสุด</h3>
                            <p className="text-xs text-slate-400 font-bold uppercase tracking-widest mt-1">REAL-TIME UPDATES</p>
                        </div>
                        <Button variant="ghost" className="text-amber-600 font-bold text-xs hover:bg-amber-50 rounded-xl">
                            ดูทั้งหมด <ArrowUpRight className="w-4 h-4 ml-1" />
                        </Button>
                    </div>
                    <div className="px-2 pb-2 space-y-1">
                        {loading ? (
                            [1, 2, 3].map(i => <div key={i} className="h-16 bg-slate-50 rounded-2xl animate-pulse m-2" />)
                        ) : latestActivities.length === 0 ? (
                            <div className="py-12 text-center text-slate-300">ไม่มีข้อมูลล่าสุด</div>
                        ) : (
                            latestActivities.map((act, i) => (
                                <div key={i} className="flex items-center gap-5 p-4 rounded-2xl hover:bg-slate-50 transition-all border border-transparent hover:border-slate-100 group">
                                    <div className={`w-12 h-12 rounded-2xl flex items-center justify-center flex-shrink-0 shadow-lg ${act.color}`}>
                                        <act.icon className="w-6 h-6" />
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <p className="text-sm font-bold text-slate-700 group-hover:text-amber-600 transition-colors uppercase tracking-tight">{act.text}</p>
                                        <p className="text-xs text-slate-400 font-medium truncate mt-0.5">{act.sub}</p>
                                    </div>
                                    <span className="text-[10px] font-black text-slate-300 uppercase tracking-widest">{act.time}</span>
                                </div>
                            ))
                        )}
                    </div>
                </div>

                {/* Status & Quick Links */}
                <div className="space-y-6">
                    {/* System Monitor */}
                    <div className="bg-[#0f172a] text-white rounded-[2rem] p-8 shadow-2xl border border-slate-800">
                        <div className="flex items-center gap-3 mb-8">
                            <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center">
                                <Activity className="w-5 h-5 text-amber-500" />
                            </div>
                            <div>
                                <h3 className="text-sm font-bold uppercase tracking-[0.2em] text-white/40">Status Monitor</h3>
                            </div>
                        </div>
                        <div className="space-y-5">
                            {systemStatus.map(s => (
                                <div key={s.label} className="group p-3 rounded-xl border border-transparent hover:border-white/5 hover:bg-white/5 transition-all">
                                    <div className="flex items-center justify-between mb-1">
                                        <span className="text-sm font-bold text-white/80">{s.label}</span>
                                        <span className="text-[10px] font-black uppercase text-emerald-400">Stable</span>
                                    </div>
                                    <div className="w-full h-1.5 bg-white/5 rounded-full overflow-hidden">
                                        <div className="w-full h-full bg-emerald-500 rounded-full" />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Navigation Block */}
                    <div className="bg-white rounded-[2rem] border border-slate-100 p-8 shadow-xl shadow-slate-200/40">
                        <h3 className="text-xs font-black uppercase tracking-[0.2em] text-slate-400 mb-6">Quick Actions</h3>
                        <div className="grid grid-cols-2 gap-4">
                            <Link to="/admin/gallery" className="p-4 rounded-2xl bg-violet-50 text-violet-600 border border-violet-100 hover:bg-violet-600 hover:text-white transition-all group flex flex-col items-center gap-3">
                                <ImageIcon className="w-6 h-6" />
                                <span className="text-[10px] font-bold uppercase tracking-wider">แกลลอรี่</span>
                            </Link>
                            <Link to="/admin/portfolio" className="p-4 rounded-2xl bg-emerald-50 text-emerald-600 border border-emerald-100 hover:bg-emerald-600 hover:text-white transition-all group flex flex-col items-center gap-3">
                                <Briefcase className="w-6 h-6" />
                                <span className="text-[10px] font-bold uppercase tracking-wider">ผลงาน</span>
                            </Link>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    )
}
