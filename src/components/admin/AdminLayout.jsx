import React, { useState } from 'react'
import AdminSidebar from './AdminSidebar'
import AdminHeader from './AdminHeader'

export default function AdminLayout({ children }) {
    const [collapsed, setCollapsed] = useState(false)

    return (
        <div className="flex h-screen bg-slate-50 overflow-hidden">
            {/* Sidebar — dark */}
            <AdminSidebar collapsed={collapsed} />

            {/* Main Area */}
            <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
                {/* Header — white */}
                <AdminHeader collapsed={collapsed} onToggle={() => setCollapsed(!collapsed)} />

                {/* Page Content — light bg */}
                <main className="flex-1 overflow-y-auto bg-slate-50">
                    <div className="p-4 md:p-10 max-w-screen-2xl mx-auto w-full">
                        {children}
                    </div>
                </main>
            </div>
        </div>
    )
}
