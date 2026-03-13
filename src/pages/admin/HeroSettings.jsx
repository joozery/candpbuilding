import React, { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Save, RefreshCw, Loader2, Image as ImageIcon, Upload, X, Layout } from 'lucide-react'
import { settingsApi, uploadApi } from '@/lib/api'

// ---- Section Wrapper ---- //
function SettingSection({ title, description, children }) {
    return (
        <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
            <div className="px-6 py-4 border-b border-slate-100 bg-slate-50/50">
                <h2 className="text-sm font-semibold text-slate-700">{title}</h2>
                {description && <p className="text-xs text-slate-400 mt-0.5">{description}</p>}
            </div>
            <div className="px-6 py-5 space-y-4">
                {children}
            </div>
        </div>
    )
}

// ---- Field ---- //
function Field({ label, id, hint, children }) {
    return (
        <div className="grid grid-cols-3 gap-4 items-start">
            <div className="pt-2">
                <Label htmlFor={id} className="text-sm font-medium text-slate-600">{label}</Label>
                {hint && <p className="text-[11px] text-slate-400 mt-0.5 leading-relaxed">{hint}</p>}
            </div>
            <div className="col-span-2">{children}</div>
        </div>
    )
}

// ---- Toast ---- //
function SaveToast({ visible }) {
    if (!visible) return null
    return (
        <div className="fixed bottom-6 right-6 z-50 bg-[#111827] text-white text-sm font-medium px-5 py-3 rounded-xl shadow-2xl flex items-center gap-2.5">
            <Save className="w-4 h-4 text-amber-400" />
            บันทึกการตั้งค่าเรียบร้อยแล้ว
        </div>
    )
}

export default function AdminHeroSettings() {
    const [settings, setSettings] = useState({
        heroImageUrl: '',
        heroTitle: '',
        heroSubtitle: '',
    })
    const [loading, setLoading] = useState(true)
    const [saving, setSaving] = useState(false)
    const [uploading, setUploading] = useState(false)
    const [toast, setToast] = useState(false)

    useEffect(() => {
        fetchSettings()
    }, [])

    const fetchSettings = async () => {
        try {
            const data = await settingsApi.get()
            setSettings({
                heroImageUrl: data.heroImageUrl || '',
                heroTitle: data.heroTitle || 'สร้างอาคารที่คุณต้องการให้เป็นจริง',
                heroSubtitle: data.heroSubtitle || 'C&P Building Houses คือผู้เชี่ยวชาญด้านการก่อสร้างและสถาปัตยกรรม ที่มีความรับผิดชิดเป็นมิตรกับสิ่งแวดล้อมมากที่สุดสำหรับทุกรูปแบบโครงการ',
            })
        } catch (err) {
            console.error('Failed to fetch hero settings:', err)
        } finally {
            setLoading(false)
        }
    }

    const set = (key, val) => setSettings(p => ({ ...p, [key]: val }))

    const handleSave = async () => {
        setSaving(true)
        try {
            await settingsApi.update(settings)
            setToast(true)
            setTimeout(() => setToast(false), 2500)
        } catch (err) {
            console.error('Failed to save hero settings:', err)
            alert('บันทึกผิดพลาด: ' + err.message)
        } finally {
            setSaving(false)
        }
    }

    const handleImageUpload = async (e) => {
        const file = e.target.files[0]
        if (!file) return

        setUploading(true)
        try {
            const res = await uploadApi.image(file, 'settings')
            set('heroImageUrl', res.url)
        } catch (err) {
            console.error('Upload failed:', err)
            alert('อัปโหลดล้มเหลว: ' + err.message)
        } finally {
            setUploading(false)
        }
    }

    if (loading) {
        return (
            <div className="flex items-center justify-center p-20">
                <Loader2 className="w-8 h-8 text-amber-500 animate-spin" />
            </div>
        )
    }

    return (
        <div className="space-y-5 max-w-3xl">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-xl font-bold text-slate-800 tracking-tight flex items-center gap-2">
                         <Layout className="w-5 h-5 text-amber-500" /> จัดการหน้าแรก
                    </h1>
                    <p className="text-sm text-slate-400 mt-0.5 font-medium">จัดการเนื้อหาและรูปภาพส่วนหน้าแรก (Hero Section) ของเว็บไซต์</p>
                </div>
                <Button onClick={handleSave} disabled={saving} className="bg-amber-500 hover:bg-amber-600 text-white gap-2 h-9 text-sm shadow shadow-amber-500/20">
                    {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
                    {saving ? 'กำลังบันทึก...' : 'บันทึกการตั้งค่า'}
                </Button>
            </div>

            {/* Hero Image */}
            <SettingSection title="รูปภาพพื้นหลัง" description="ภาพพื้นหลังหลักที่แสดงเมื่อเข้าเว็บไซต์">
                <div className="space-y-3">
                    {settings.heroImageUrl ? (
                        <div className="relative aspect-video rounded-2xl overflow-hidden border border-slate-100 group shadow-sm">
                            <img src={settings.heroImageUrl} alt="Hero Preview" className="w-full h-full object-cover" />
                            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                                <Label htmlFor="hero-upload" className="cursor-pointer bg-white text-slate-700 px-3 py-1.5 rounded-lg text-xs font-bold hover:bg-slate-50 flex items-center gap-2">
                                    <RefreshCw className="w-3.5 h-3.5" /> เปลี่ยนรูป
                                </Label>
                                <button onClick={() => set('heroImageUrl', '')} className="bg-red-500 text-white px-3 py-1.5 rounded-lg text-xs font-bold hover:bg-red-600 flex items-center gap-2">
                                    <X className="w-3.5 h-3.5" /> ลบออก
                                </button>
                            </div>
                        </div>
                    ) : (
                        <Label htmlFor="hero-upload" className="flex flex-col items-center justify-center aspect-video rounded-2xl border-2 border-dashed border-slate-200 bg-slate-50/50 hover:bg-slate-50 hover:border-amber-400 transition-all cursor-pointer group">
                            {uploading ? (
                                <Loader2 className="w-8 h-8 text-amber-500 animate-spin" />
                            ) : (
                                <>
                                    <div className="w-12 h-12 rounded-full bg-white shadow-sm flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                                        <Upload className="w-5 h-5 text-slate-400" />
                                    </div>
                                    <p className="text-sm font-semibold text-slate-600">กดเพื่ออัปโหลดภาพพื้นหลัง</p>
                                    <p className="text-xs text-slate-400 mt-1">แนะนำขนาด 1920x1080 px (.jpg, .png)</p>
                                </>
                            )}
                        </Label>
                    )}
                    <input id="hero-upload" type="file" accept="image/*" onChange={handleImageUpload} className="hidden" />
                </div>
            </SettingSection>

            {/* Hero Content */}
            <SettingSection title="ข้อความหน้าแรก" description="หัวข้อและคำอธิบายสั้นๆ ที่แสดงบนภาพพื้นหลัง">
                <Field label="หัวข้อหลัก (Title)" id="hero-title" hint="ข้อความตัวใหญ่ที่สุดในหน้าแรก">
                    <Input 
                        id="hero-title" 
                        value={settings.heroTitle} 
                        onChange={e => set('heroTitle', e.target.value)}
                        className="border-slate-200 text-sm focus:border-amber-400 h-10" 
                        placeholder="เช่น สร้างอาคารที่คุณต้องการให้เป็นจริง"
                    />
                </Field>
                <Field label="คำอธิบาย (Subtitle)" id="hero-sub" hint="ข้อความอธิบายใต้หัวข้อหลัก">
                    <textarea 
                        id="hero-sub" 
                        rows={4} 
                        value={settings.heroSubtitle} 
                        onChange={e => set('heroSubtitle', e.target.value)}
                        className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm resize-none focus:outline-none focus:border-amber-400"
                        placeholder="อธิบายสั้นๆ เกี่ยวกับบริษัท..."
                    />
                </Field>
            </SettingSection>

            <div className="flex justify-end pt-2">
                <Button onClick={handleSave} disabled={saving} className="bg-amber-500 hover:bg-amber-600 text-white gap-2 h-9 text-sm shadow shadow-amber-500/20">
                    {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
                    {saving ? 'กำลังบันทึก...' : 'บันทึกการตั้งค่า'}
                </Button>
            </div>

            <SaveToast visible={toast} />
        </div>
    )
}
