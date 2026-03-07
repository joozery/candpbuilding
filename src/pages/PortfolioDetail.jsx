import React, { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowLeft, MapPin, Calendar, Tag, Warehouse, ChevronLeft, ChevronRight, X, Maximize2 } from 'lucide-react'
import { Helmet } from 'react-helmet-async'
import { portfolioApi } from '../lib/api'

export default function PortfolioDetail() {
    const { id } = useParams()
    const [item, setItem] = useState(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)
    const [activeImageIdx, setActiveImageIdx] = useState(0)
    const [fullscreenIdx, setFullscreenIdx] = useState(null)

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true)
                const res = await portfolioApi.getById(id)
                setItem(res)
            } catch (err) {
                setError(err.message || 'ไม่พบข้อมูลผลงาน')
            } finally {
                setLoading(false)
            }
        }
        fetchData()
        window.scrollTo(0, 0)
    }, [id])

    if (loading) return (
        <div className="min-h-screen pt-32 pb-20 flex flex-col items-center justify-center text-slate-400">
            <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 1, ease: 'linear' }} className="mb-4">
                <Warehouse className="w-10 h-10 text-primary-500" />
            </motion.div>
            <p className="font-medium">กำลังรวบรวมข้อมูลรายละเอียดโครงการ...</p>
        </div>
    )

    if (error || !item) return (
        <div className="min-h-screen pt-32 pb-20 flex flex-col items-center justify-center text-center px-4">
            <div className="w-20 h-20 bg-red-50 text-red-500 rounded-full flex items-center justify-center mb-6">
                <X className="w-10 h-10" />
            </div>
            <h2 className="text-2xl font-bold text-slate-800 mb-4">{error || 'ไม่พบผลงานที่ท่านต้องการ'}</h2>
            <Link to="/portfolio" className="bg-slate-900 text-white px-8 py-3 rounded-xl font-bold flex items-center gap-2 hover:bg-slate-800 transition-colors">
                <ArrowLeft className="w-4 h-4" /> กลับหน้าผลงาน
            </Link>
        </div>
    )

    const images = item.images || []
    const hasImages = images.length > 0

    const nextImg = () => setActiveImageIdx(p => (p + 1) % images.length)
    const prevImg = () => setActiveImageIdx(p => (p - 1 + images.length) % images.length)

    return (
        <main className="min-h-screen bg-white pt-24 pb-20">
            <Helmet>
                <title>{item.title} | ผลงาน C&P Building</title>
                <meta name="description" content={item.description} />
            </Helmet>

            <div className="max-w-7xl mx-auto px-4">
                {/* Navigation & Breadcrumb */}
                <div className="flex flex-col md:flex-row md:items-center justify-between mb-10 gap-4">
                    <nav className="flex items-center gap-2 text-xs text-slate-400 font-medium">
                        <Link to="/" className="hover:text-primary-600 transition-colors">หน้าแรก</Link>
                        <span>/</span>
                        <Link to="/portfolio" className="hover:text-primary-600 transition-colors">ผลงาน</Link>
                        <span>/</span>
                        <span className="text-slate-900 line-clamp-1">{item.title}</span>
                    </nav>
                    <Link to="/portfolio" className="inline-flex items-center gap-2 text-sm font-bold text-slate-600 hover:text-primary-600 group transition-colors">
                        <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" /> กลับหน้าผลงาน
                    </Link>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">

                    {/* Left: Project Details */}
                    <div className="lg:col-span-5 space-y-8">
                        <div>
                            <span className="inline-block px-4 py-1.5 bg-primary-50 text-primary-600 rounded-full text-[10px] font-extrabold uppercase tracking-widest mb-4">
                                {item.category}
                            </span>
                            <h1 className="text-3xl md:text-4xl font-black text-slate-900 leading-tight mb-6">
                                {item.title}
                            </h1>
                            <p className="text-slate-600 text-lg leading-relaxed whitespace-pre-wrap mb-8">
                                {item.description || 'ไม่มีรายละเอียดเพิ่มเติมสำหรับโครงการนี้'}
                            </p>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100 transition-colors hover:bg-white hover:shadow-lg">
                                <MapPin className="w-6 h-6 text-primary-600 mb-3" />
                                <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mb-1">สถานที่ก่อสร้าง</p>
                                <p className="font-bold text-slate-900">{item.location || 'ไม่ระบุ'}</p>
                            </div>
                            <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100 transition-colors hover:bg-white hover:shadow-lg">
                                <Calendar className="w-6 h-6 text-primary-600 mb-3" />
                                <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mb-1">ปีที่ส่งมอบ</p>
                                <p className="font-bold text-slate-900">{item.year || '-'}</p>
                            </div>
                        </div>

                        <div className="bg-slate-900 rounded-3xl p-8 text-white shadow-2xl relative overflow-hidden">
                            <div className="relative z-10">
                                <h3 className="text-xl font-bold mb-2 text-primary-400">สนใจบ้านสไตล์นี้?</h3>
                                <p className="text-slate-400 text-sm mb-6 max-w-xs leading-relaxed">
                                    ปรึกษาเราเพื่อประเมินราคาหรือออกแบบโครงการของคุณในเบื้องต้น ฟรี!
                                </p>
                                <Link to="/contact" className="inline-block bg-white text-slate-900 px-8 py-3 rounded-xl font-black text-sm hover:bg-primary-50 transition-colors shadow-lg">
                                    คุยกับทีมงาน C&P Building
                                </Link>
                            </div>
                            <Warehouse className="absolute -right-8 -bottom-8 w-40 h-40 text-white/5" />
                        </div>
                    </div>

                    {/* Right: Project Images Carousel */}
                    <div className="lg:col-span-7 space-y-4">
                        <div className="relative aspect-[16/10] bg-slate-100 rounded-3xl overflow-hidden shadow-2xl group border border-slate-50">
                            {hasImages ? (
                                <>
                                    <AnimatePresence mode="wait">
                                        <motion.img
                                            key={activeImageIdx}
                                            src={images[activeImageIdx].url}
                                            initial={{ opacity: 0, x: 20 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            exit={{ opacity: 0, x: -20 }}
                                            transition={{ duration: 0.4 }}
                                            className="w-full h-full object-cover"
                                        />
                                    </AnimatePresence>

                                    <div className="absolute inset-0 bg-black/10 opacity-0 group-hover:opacity-100 transition-opacity" />

                                    <button
                                        onClick={() => setFullscreenIdx(activeImageIdx)}
                                        className="absolute top-4 right-4 w-10 h-10 bg-white/90 backdrop-blur-sm shadow-lg rounded-full flex items-center justify-center text-slate-800 opacity-0 group-hover:opacity-100 hover:scale-110 transition-all z-20"
                                    >
                                        <Maximize2 className="w-5 h-5" />
                                    </button>

                                    {images.length > 1 && (
                                        <>
                                            <button onClick={prevImg} className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-lg text-slate-800 opacity-0 group-hover:opacity-100 hover:bg-primary-600 hover:text-white transition-all z-20">
                                                <ChevronLeft className="w-6 h-6" />
                                            </button>
                                            <button onClick={nextImg} className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-lg text-slate-800 opacity-0 group-hover:opacity-100 hover:bg-primary-600 hover:text-white transition-all z-20">
                                                <ChevronRight className="w-6 h-6" />
                                            </button>
                                        </>
                                    )}
                                </>
                            ) : (
                                <div className="w-full h-full flex flex-col items-center justify-center text-slate-300">
                                    <Warehouse className="w-20 h-20 mb-4 opacity-50" />
                                    <p className="font-bold">ไม่มีรูปภาพประกอบโครงการนี้</p>
                                </div>
                            )}
                        </div>

                        {/* Thumbnails */}
                        {images.length > 1 && (
                            <div className="grid grid-cols-5 md:grid-cols-6 lg:grid-cols-5 xl:grid-cols-6 gap-3">
                                {images.map((img, idx) => (
                                    <button
                                        key={idx}
                                        onClick={() => setActiveImageIdx(idx)}
                                        className={`aspect-square rounded-2xl overflow-hidden border-2 transition-all ${activeImageIdx === idx ? 'border-primary-600 scale-95 shadow-md' : 'border-transparent hover:border-slate-200'
                                            }`}
                                    >
                                        <img src={img.url} className="w-full h-full object-cover" />
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Fullscreen Overlay */}
            {fullscreenIdx !== null && (
                <div className="fixed inset-0 z-[100] bg-black/95 flex flex-col items-center justify-center p-4">
                    <button
                        onClick={() => setFullscreenIdx(null)}
                        className="absolute top-6 right-6 w-12 h-12 bg-white/10 hover:bg-white/20 text-white rounded-full flex items-center justify-center transition-all z-[110]"
                    >
                        <X className="w-6 h-6" />
                    </button>

                    <img src={images[fullscreenIdx].url} className="max-w-full max-h-[85vh] object-contain shadow-2xl" />

                    <div className="mt-8 flex gap-4">
                        <button onClick={() => setFullscreenIdx(p => (p - 1 + images.length) % images.length)} className="w-12 h-12 border border-white/20 text-white rounded-full flex items-center justify-center hover:bg-white/10 transition-all">
                            <ChevronLeft className="w-6 h-6" />
                        </button>
                        <span className="text-white font-bold flex items-center px-4 bg-white/5 rounded-xl border border-white/10">
                            {fullscreenIdx + 1} / {images.length}
                        </span>
                        <button onClick={() => setFullscreenIdx(p => (p + 1) % images.length)} className="w-12 h-12 border border-white/20 text-white rounded-full flex items-center justify-center hover:bg-white/10 transition-all">
                            <ChevronRight className="w-6 h-6" />
                        </button>
                    </div>
                </div>
            )}
        </main>
    )
}
