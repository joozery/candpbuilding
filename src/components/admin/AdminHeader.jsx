import React from 'react'
import { useLocation } from 'react-router-dom'
import { Bell, Menu, X, ChevronRight } from 'lucide-react'

const pageTitles = {
    '/admin': 'แดชบอร์ด',
    '/admin/articles': 'จัดการบทความ',
    '/admin/inquiries': 'ข้อความติดต่อ',
    '/admin/users': 'จัดการแอดมิน',
    '/admin/portfolio': 'จัดการผลงาน',
    '/admin/gallery': 'แกลลอรี่',
    '/admin/settings': 'ตั้งค่าเว็บไซต์',
}

export default function AdminHeader({ collapsed, onToggle }) {
    const location = useLocation()
    const title = pageTitles[location.pathname] || 'แดชบอร์ด'

    return (
        <header className="h-14 bg-white border-b border-slate-200 flex items-center justify-between px-5 flex-shrink-0">
            {/* Left */}
            <div className="flex items-center gap-3">
                <button
                    onClick={onToggle}
                    className="w-8 h-8 rounded-lg flex items-center justify-center text-slate-400 hover:bg-slate-100 hover:text-slate-600 transition-all"
                >
                    {collapsed ? <Menu className="w-4 h-4" /> : <X className="w-4 h-4" />}
                </button>

                {/* Breadcrumb */}
                <div className="flex items-center gap-1.5 text-sm">
                    <span className="text-slate-400">หน้าแรก</span>
                    <ChevronRight className="w-3 h-3 text-slate-300" />
                    <span className="text-slate-700 font-medium">{title}</span>
                </div>
            </div>

            {/* Right */}
            <div className="flex items-center gap-2">
                {/* Notification */}
                <button className="relative w-8 h-8 rounded-lg flex items-center justify-center text-slate-400 hover:bg-slate-100 hover:text-slate-600 transition-all">
                    <Bell className="w-4 h-4" />
                    <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-amber-500 rounded-full border-2 border-white" />
                </button>

                <div className="w-px h-5 bg-slate-200 mx-1" />

                {/* User */}
                <div className="flex items-center gap-2.5">
                    <div className="text-right">
                        <p className="text-xs font-semibold text-slate-700 leading-tight">ผู้ดูแลระบบ</p>
                        <p className="text-[10px] text-slate-400 leading-tight">admin@cpbuilding.com</p>
                    </div>
                    <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center text-xs font-bold text-white shadow shadow-amber-500/20">
                        A
                    </div>
                </div>
            </div>
        </header>
    )
}
