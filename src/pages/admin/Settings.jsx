import React, { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Save, Globe, Phone, Mail, MapPin, Facebook, Youtube, Building2, RefreshCw, Loader2, Image as ImageIcon, Upload, X, MessageSquare } from 'lucide-react'
import { settingsApi, uploadApi } from '@/lib/api'

// ---- Section Wrapper ---- //
// ... (rest of the helper components keep as is)
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

// ---- Toggle ---- //
function Toggle({ checked, onChange }) {
    return (
        <button
            onClick={() => onChange(!checked)}
            className={`relative w-10 h-6 rounded-full transition-colors flex-shrink-0 ${checked ? 'bg-amber-500' : 'bg-slate-200'}`}
        >
            <span className={`absolute top-1 w-4 h-4 bg-white rounded-full shadow transition-transform ${checked ? 'translate-x-5' : 'translate-x-1'}`} />
        </button>
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

// ---- Main ---- //
export default function AdminSettings() {
    const [settings, setSettings] = useState({
        siteName: '',
        siteTagline: '',
        siteUrl: '',
        phone: '',
        email: '',
        address: '',
        facebookUrl: '',
        youtubeUrl: '',
        lineUrl: '',
        articlesPerPage: 9,
        enableComments: false,
        maintenanceMode: false,
        seoTitle: '',
        seoDesc: '',
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
            setSettings(data)
        } catch (err) {
            console.error('Failed to fetch settings:', err)
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
            console.error('Failed to save settings:', err)
            alert('บันทึกผิดพลาด: ' + err.message)
        } finally {
            setSaving(false)
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
                    <h1 className="text-xl font-bold text-slate-800">ตั้งค่าเว็บไซต์</h1>
                    <p className="text-sm text-slate-400 mt-0.5">จัดการข้อมูลและการแสดงผลของเว็บไซต์</p>
                </div>
                <Button onClick={handleSave} disabled={saving} className="bg-amber-500 hover:bg-amber-600 text-white gap-2 h-9 text-sm shadow shadow-amber-500/20">
                    {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
                    {saving ? 'กำลังบันทึก...' : 'บันทึกการตั้งค่า'}
                </Button>
            </div>

            {/* General */}
            <SettingSection title="ข้อมูลทั่วไป" description="ชื่อเว็บไซต์และคำอธิบายหลัก">
                <Field label="ชื่อเว็บไซต์" id="siteName">
                    <div className="relative">
                        <Building2 className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                        <Input id="siteName" value={settings.siteName} onChange={e => set('siteName', e.target.value)}
                            className="pl-9 border-slate-200 text-sm focus:border-amber-400" />
                    </div>
                </Field>
                <Field label="คำโปรย (Tagline)" id="tagline" hint="แสดงใต้ชื่อเว็บไซต์">
                    <Input id="tagline" value={settings.siteTagline} onChange={e => set('siteTagline', e.target.value)}
                        className="border-slate-200 text-sm focus:border-amber-400" />
                </Field>
                <Field label="URL เว็บไซต์" id="siteUrl">
                    <div className="relative">
                        <Globe className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                        <Input id="siteUrl" value={settings.siteUrl} onChange={e => set('siteUrl', e.target.value)}
                            className="pl-9 border-slate-200 text-sm focus:border-amber-400" />
                    </div>
                </Field>
            </SettingSection>

            {/* Contact */}
            <SettingSection title="ข้อมูลติดต่อ" description="ข้อมูลที่แสดงในหน้าติดต่อและ Footer">
                <Field label="เบอร์โทรศัพท์" id="phone">
                    <div className="relative">
                        <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                        <Input id="phone" value={settings.phone} onChange={e => set('phone', e.target.value)}
                            className="pl-9 border-slate-200 text-sm focus:border-amber-400" />
                    </div>
                </Field>
                <Field label="อีเมล" id="email">
                    <div className="relative">
                        <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                        <Input id="email" value={settings.email} onChange={e => set('email', e.target.value)}
                            className="pl-9 border-slate-200 text-sm focus:border-amber-400" />
                    </div>
                </Field>
                <Field label="ที่อยู่" id="address">
                    <div className="relative">
                        <MapPin className="absolute left-3 top-3 w-4 h-4 text-slate-400" />
                        <textarea id="address" rows={2} value={settings.address} onChange={e => set('address', e.target.value)}
                            className="w-full pl-9 pr-3 py-2 border border-slate-200 rounded-lg text-sm resize-none focus:outline-none focus:border-amber-400"
                        />
                    </div>
                </Field>
            </SettingSection>

            {/* Social */}
            <SettingSection title="โซเชียลมีเดีย" description="ลิงก์โซเชียลที่แสดงในเว็บไซต์">
                <Field label="Facebook" id="fb">
                    <div className="relative">
                        <Facebook className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-blue-500" />
                        <Input id="fb" value={settings.facebookUrl} onChange={e => set('facebookUrl', e.target.value)}
                            placeholder="https://facebook.com/..."
                            className="pl-9 border-slate-200 text-sm focus:border-amber-400" />
                    </div>
                </Field>
                <Field label="YouTube" id="yt">
                    <div className="relative">
                        <Youtube className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-red-500" />
                        <Input id="yt" value={settings.youtubeUrl} onChange={e => set('youtubeUrl', e.target.value)}
                            placeholder="https://youtube.com/..."
                            className="pl-9 border-slate-200 text-sm focus:border-amber-400" />
                    </div>
                </Field>
                <Field label="LINE" id="line">
                    <div className="relative">
                        <MessageSquare className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-emerald-500" />
                        <Input id="line" value={settings.lineUrl} onChange={e => set('lineUrl', e.target.value)}
                            placeholder="https://line.me/ti/p/..."
                            className="pl-9 border-slate-200 text-sm focus:border-amber-400" />
                    </div>
                </Field>
            </SettingSection>

            {/* SEO */}
            <SettingSection title="SEO & Meta" description="ข้อมูลที่ Google และโซเชียลใช้แสดงผล">
                <Field label="Meta Title" id="seoTitle">
                    <Input id="seoTitle" value={settings.seoTitle} onChange={e => set('seoTitle', e.target.value)}
                        className="border-slate-200 text-sm focus:border-amber-400" />
                    <p className="text-[11px] text-slate-400 mt-1">{settings.seoTitle.length}/60 ตัวอักษร</p>
                </Field>
                <Field label="Meta Description" id="seoDesc" hint="สรุปเนื้อหาสำหรับ Google ควรสั้นกระชับ">
                    <textarea id="seoDesc" rows={3} value={settings.seoDesc} onChange={e => set('seoDesc', e.target.value)}
                        className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm resize-none focus:outline-none focus:border-amber-400"
                    />
                    <p className="text-[11px] text-slate-400 mt-1">{settings.seoDesc.length}/160 ตัวอักษร</p>
                </Field>
            </SettingSection>

            {/* System */}
            <SettingSection title="ตั้งค่าระบบ" description="ควบคุมพฤติกรรมและการแสดงผลของเนื้อหา">
                <div className="flex items-center justify-between py-1">
                    <div>
                        <p className="text-sm font-medium text-slate-700">โหมดซ่อมบำรุง</p>
                        <p className="text-xs text-slate-400 mt-0.5">เว็บไซต์จะแสดงหน้า "กำลังปรับปรุง" แทน</p>
                    </div>
                    <Toggle checked={settings.maintenanceMode} onChange={v => set('maintenanceMode', v)} />
                </div>
                <hr className="border-slate-100" />
                <div className="flex items-center justify-between py-1">
                    <div>
                        <p className="text-sm font-medium text-slate-700">เปิดใช้งานความคิดเห็น</p>
                        <p className="text-xs text-slate-400 mt-0.5">อนุญาตให้ผู้อ่านแสดงความคิดเห็นในบทความ</p>
                    </div>
                    <Toggle checked={settings.enableComments} onChange={v => set('enableComments', v)} />
                </div>
                <hr className="border-slate-100" />
                <Field label="บทความต่อหน้า" id="perPage" hint="จำนวนบทความที่แสดงในหน้ารายการ">
                    <Input id="perPage" type="number" value={settings.articlesPerPage} onChange={e => set('articlesPerPage', e.target.value)}
                        className="border-slate-200 text-sm w-32 focus:border-amber-400" />
                </Field>
            </SettingSection>

            {/* Footer Actions */}
            <div className="flex items-center justify-between pt-2">
                <Button variant="ghost" className="text-slate-400 hover:text-slate-600 gap-2 text-sm">
                    <RefreshCw className="w-4 h-4" /> คืนค่าเริ่มต้น
                </Button>
                <Button onClick={handleSave} disabled={saving} className="bg-amber-500 hover:bg-amber-600 text-white gap-2 h-9 text-sm shadow shadow-amber-500/20">
                    {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
                    {saving ? 'กำลังบันทึก...' : 'บันทึกการตั้งค่า'}
                </Button>
            </div>

            <SaveToast visible={toast} />
        </div>
    )
}
