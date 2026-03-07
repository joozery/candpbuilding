import React from 'react'
import { ArrowUpRight, ArrowDownRight } from 'lucide-react'

/**
 * StatCard — reusable stat card for admin dashboard
 *
 * Props:
 *  label    string  — ชื่อสถิติ
 *  value    string  — ค่าตัวเลข
 *  change   string  — ข้อความเปลี่ยนแปลง เช่น "+2 เดือนนี้"
 *  up       bool    — เพิ่มขึ้น (true) หรือลดลง (false)
 *  icon     React component — Lucide icon
 *  gradient string  — tailwind gradient class เช่น "from-blue-500 to-blue-600"
 */
export default function StatCard({ label, value, change, up, icon: Icon, gradient = 'from-amber-500 to-orange-500' }) {
    return (
        <div className="bg-white rounded-2xl border border-slate-100 p-5 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-start justify-between mb-4">
                <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${gradient} flex items-center justify-center shadow-md`}>
                    <Icon className="w-5 h-5 text-white" />
                </div>
                {change && (
                    <div className={`flex items-center gap-1 text-[11px] font-semibold px-2 py-0.5 rounded-full ${up
                            ? 'text-emerald-600 bg-emerald-50'
                            : 'text-red-500 bg-red-50'
                        }`}>
                        {up ? <ArrowUpRight className="w-3 h-3" /> : <ArrowDownRight className="w-3 h-3" />}
                        {change}
                    </div>
                )}
            </div>
            <p className="text-2xl font-bold text-slate-800 tracking-tight">{value}</p>
            <p className="text-xs text-slate-400 mt-0.5 font-medium">{label}</p>
        </div>
    )
}
