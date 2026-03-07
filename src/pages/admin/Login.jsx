import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Shield, Mail, Lock, Loader2, ArrowRight, Building2, AlertCircle } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { authApi } from '@/lib/api'

export default function AdminLogin() {
    const navigate = useNavigate()
    const [credentials, setCredentials] = useState({ email: '', password: '' })
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)

    const handleSubmit = async (e) => {
        e.preventDefault()
        setLoading(true)
        setError(null)

        try {
            const res = await authApi.login(credentials)
            if (res.success) {
                // Store token and user data
                localStorage.setItem('adminToken', res.token)
                localStorage.setItem('adminUser', JSON.stringify(res.data))

                // Redirect to dashboard
                navigate('/admin')
            }
        } catch (err) {
            setError(err.message || 'อีเมลหรือรหัสผ่านไม่ถูกต้อง')
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="min-h-screen bg-[#0f172a] flex items-center justify-center p-4 relative overflow-hidden">
            {/* Background Decorative Elements */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
                <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-primary-500/20 rounded-full blur-[120px]" />
                <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-amber-500/10 rounded-full blur-[120px]" />
            </div>

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="w-full max-w-[440px] relative z-10"
            >
                {/* Logo & Header */}
                <div className="text-center mb-8">
                    <div className="inline-flex items-center justify-center w-20 h-20 rounded-[2.5rem] bg-gradient-to-br from-primary-400 to-amber-600 shadow-2xl shadow-primary-500/30 mb-6 group">
                        <Building2 className="w-10 h-10 text-white group-hover:scale-110 transition-transform duration-500" />
                    </div>
                    <h1 className="text-3xl font-black text-white tracking-tight mb-2">C&P Admin</h1>
                    <p className="text-slate-400 font-medium">เข้าสู่ระบบเพื่อจัดการหลังบ้าน C&P Building</p>
                </div>

                {/* Login Card */}
                <div className="bg-white/5 backdrop-blur-2xl border border-white/10 p-8 md:p-10 rounded-[2.5rem] shadow-2xl overflow-hidden relative">
                    <form onSubmit={handleSubmit} className="space-y-6">
                        {error && (
                            <motion.div
                                initial={{ opacity: 0, x: -10 }}
                                animate={{ opacity: 1, x: 0 }}
                                className="bg-red-500/10 border border-red-500/20 p-4 rounded-2xl flex items-center gap-3 text-red-500 text-sm font-medium"
                            >
                                <AlertCircle className="w-5 h-5 flex-shrink-0" />
                                {error}
                            </motion.div>
                        )}

                        <div className="space-y-2">
                            <label className="text-[11px] font-black text-slate-500 uppercase tracking-widest ml-1">อีเมลผู้ใช้งาน</label>
                            <div className="relative group">
                                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500 group-focus-within:text-primary-500 transition-colors" />
                                <input
                                    type="email"
                                    required
                                    value={credentials.email}
                                    onChange={e => setCredentials({ ...credentials, email: e.target.value })}
                                    placeholder="your@email.com"
                                    className="w-full h-14 pl-12 pr-4 bg-white/5 border border-white/10 rounded-2xl text-white text-sm focus:outline-none focus:ring-2 focus:ring-primary-500/50 focus:border-primary-500 transition-all placeholder:text-slate-600"
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <div className="flex items-center justify-between ml-1">
                                <label className="text-[11px] font-black text-slate-500 uppercase tracking-widest">รหัสผ่าน</label>
                                <a href="#" className="text-[11px] font-black text-primary-500 uppercase tracking-widest hover:text-primary-400 transition-colors">ลืมรหัสผ่าน?</a>
                            </div>
                            <div className="relative group">
                                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500 group-focus-within:text-primary-500 transition-colors" />
                                <input
                                    type="password"
                                    required
                                    value={credentials.password}
                                    onChange={e => setCredentials({ ...credentials, password: e.target.value })}
                                    placeholder="••••••••••••"
                                    className="w-full h-14 pl-12 pr-4 bg-white/5 border border-white/10 rounded-2xl text-white text-sm focus:outline-none focus:ring-2 focus:ring-primary-500/50 focus:border-primary-500 transition-all placeholder:text-slate-600"
                                />
                            </div>
                        </div>

                        <Button
                            disabled={loading}
                            className="w-full h-14 rounded-2xl bg-gradient-to-r from-primary-500 to-amber-600 hover:from-primary-600 hover:to-amber-700 text-white font-black text-sm uppercase tracking-widest shadow-xl shadow-primary-500/20 active:scale-[0.98] transition-all group"
                        >
                            {loading ? (
                                <Loader2 className="w-5 h-5 animate-spin" />
                            ) : (
                                <span className="flex items-center gap-2">
                                    เข้าสู่ระบบ <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                                </span>
                            )}
                        </Button>
                    </form>
                </div>

                {/* Footer Info */}
                <p className="text-center mt-8 text-slate-500 text-xs font-medium">
                    &copy; 2024 C&P Building Houses. All rights reserved.
                    <br />
                    Power by Advanced CMS System
                </p>
            </motion.div>
        </div>
    )
}
