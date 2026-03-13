import React from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import {
    LayoutDashboard,
    FileText,
    Briefcase,
    Image as ImageIcon,
    Settings,
    LogOut,
    Home,
    Building2,
    ChevronRight,
    MessageSquare,
    ShieldCheck,
    Layout
} from 'lucide-react'
import { cn } from '@/lib/utils'

const menuItems = [
    { icon: LayoutDashboard, label: 'แดชบอร์ด', path: '/admin', badge: null },
    { icon: Layout, label: 'จัดการหน้าแรก', path: '/admin/hero', badge: null },
    { icon: FileText, label: 'จัดการบทความ', path: '/admin/articles', badge: '3' },
    { icon: MessageSquare, label: 'ข้อความติดต่อ', path: '/admin/inquiries', badge: null },
    { icon: ShieldCheck, label: 'จัดการแอดมิน', path: '/admin/users', badge: null },
    { icon: Briefcase, label: 'จัดการผลงาน', path: '/admin/portfolio', badge: null },
    { icon: ImageIcon, label: 'แกลลอรี่', path: '/admin/gallery', badge: null },
    { icon: Settings, label: 'ตั้งค่าเว็บไซต์', path: '/admin/settings', badge: null },
]

export default function AdminSidebar({ collapsed }) {
    const location = useLocation()
    const navigate = useNavigate()

    const handleLogout = () => {
        if (window.confirm('คุณต้องการออกจากระบบใช่หรือไม่?')) {
            localStorage.removeItem('adminToken')
            localStorage.removeItem('adminUser')
            navigate('/admin/login')
        }
    }

    return (
        <aside
            className={cn(
                'flex flex-col h-full bg-[#111827] transition-all duration-300 ease-in-out',
                collapsed ? 'w-16' : 'w-60'
            )}
        >
            {/* Brand */}
            <div className={cn(
                'flex items-center gap-3 border-b border-white/5 flex-shrink-0',
                collapsed ? 'px-3 py-5 justify-center' : 'px-5 py-5'
            )}>
                <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-amber-400 to-orange-600 flex items-center justify-center shadow-lg shadow-amber-500/30 flex-shrink-0">
                    <Building2 className="w-4 h-4 text-white" />
                </div>
                {!collapsed && (
                    <div>
                        <p className="text-sm font-bold text-white leading-tight">C&P Admin</p>
                        <p className="text-[10px] text-white/35 leading-tight">ระบบจัดการหลังบ้าน</p>
                    </div>
                )}
            </div>

            {/* Navigation */}
            <nav className="flex-1 px-2 py-4 space-y-0.5 overflow-y-auto">
                {menuItems.map((item) => {
                    const isActive = location.pathname === item.path
                    return (
                        <Link
                            key={item.path}
                            to={item.path}
                            title={collapsed ? item.label : ''}
                            className={cn(
                                'flex items-center gap-3 rounded-xl text-[13px] font-medium transition-all duration-150 relative group',
                                collapsed ? 'px-0 py-2.5 justify-center' : 'px-3 py-2.5',
                                isActive
                                    ? 'bg-white/10 text-white'
                                    : 'text-white/45 hover:bg-white/5 hover:text-white/75'
                            )}
                        >
                            {isActive && !collapsed && (
                                <span className="absolute left-0 top-1/2 -translate-y-1/2 w-[3px] h-5 bg-amber-400 rounded-r-full" />
                            )}
                            <item.icon
                                className={cn(
                                    'w-[18px] h-[18px] flex-shrink-0',
                                    isActive ? 'text-amber-400' : 'text-white/35 group-hover:text-white/55'
                                )}
                            />
                            {!collapsed && (
                                <>
                                    <span className="flex-1">{item.label}</span>
                                    {item.badge && (
                                        <span className="text-[10px] font-bold bg-amber-500 text-white px-1.5 py-0.5 rounded-full">
                                            {item.badge}
                                        </span>
                                    )}
                                </>
                            )}
                        </Link>
                    )
                })}
            </nav>

            {/* Footer */}
            <div className={cn('border-t border-white/5 py-3', collapsed ? 'px-2' : 'px-2')}>
                <Link
                    to="/"
                    title={collapsed ? 'ดูเว็บไซต์' : ''}
                    className={cn(
                        'flex items-center gap-3 px-3 py-2.5 rounded-xl text-[13px] text-white/40 hover:bg-white/5 hover:text-white/70 transition-all mb-0.5',
                        collapsed && 'justify-center px-0'
                    )}
                >
                    <Home className="w-[18px] h-[18px] flex-shrink-0" />
                    {!collapsed && <span>ดูเว็บไซต์</span>}
                </Link>
                <button
                    onClick={handleLogout}
                    className={cn(
                        'flex items-center gap-3 px-3 py-2.5 rounded-xl text-[13px] text-red-400/60 hover:bg-red-500/10 hover:text-red-400 transition-all w-full',
                        collapsed && 'justify-center px-0'
                    )}
                >
                    <LogOut className="w-[18px] h-[18px] flex-shrink-0" />
                    {!collapsed && <span>ออกจากระบบ</span>}
                </button>
            </div>
        </aside>
    )
}
