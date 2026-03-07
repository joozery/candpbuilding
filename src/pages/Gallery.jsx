import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { ImageIcon, Maximize2, X, ChevronLeft, ChevronRight, Loader2, Home } from 'lucide-react'
import { Link } from 'react-router-dom'
import { galleryApi } from '../lib/api'

export default function GalleryPage() {
    const [images, setImages] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)
    const [selectedIdx, setSelectedIdx] = useState(null)

    const fetchGallery = async () => {
        try {
            setLoading(true)
            const res = await galleryApi.getAll({ limit: 100 })
            setImages(res.data || [])
        } catch (err) {
            setError(err.message || 'โหลดรูปภาพไม่สำเร็จ')
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => { fetchGallery() }, [])

    const nextImg = () => setSelectedIdx(p => (p + 1) % images.length)
    const prevImg = () => setSelectedIdx(p => (p - 1 + images.length) % images.length)

    return (
        <main className="min-h-screen bg-gray-50 pt-24 pb-20">
            <div className="max-w-7xl mx-auto px-4">

                {/* Breadcrumb */}
                <nav className="flex items-center gap-2 text-xs text-slate-400 font-medium mb-8">
                    <Link to="/" className="hover:text-primary-600 transition-colors flex items-center gap-1">
                        <Home className="w-3 h-3" /> หน้าแรก
                    </Link>
                    <span>/</span>
                    <span className="text-slate-900">แกลลอรี่รูปภาพ</span>
                </nav>

                {/* Header */}
                <div className="text-center mb-16">
                    <h1 className="text-4xl md:text-5xl font-black text-slate-900 mb-6">แกลลอรี่โครงการ</h1>
                    <p className="text-slate-500 max-w-2xl mx-auto text-lg leading-relaxed">
                        รวบรวมภาพความประทับใจจากโครงการต่างๆ ของเรา เพื่อสร้างแรงบันดาลใจในการสร้างบ้านของคุณ
                    </p>
                </div>

                {loading ? (
                    <div className="flex flex-col items-center justify-center py-32 text-slate-400">
                        <Loader2 className="w-12 h-12 animate-spin text-primary-500 mb-4" />
                        <p className="font-bold">กำลังเปิดประตูสู่คลังภาพโชว์รูมของเรา...</p>
                    </div>
                ) : error ? (
                    <div className="text-center py-20 bg-white rounded-3xl shadow-sm">
                        <p className="text-red-500 font-bold mb-4">{error}</p>
                        <button onClick={fetchGallery} className="bg-slate-900 text-white px-6 py-2 rounded-xl text-sm font-bold">ลองใหม่อีกครั้ง</button>
                    </div>
                ) : images.length === 0 ? (
                    <div className="text-center py-32 bg-white rounded-3xl shadow-sm border border-slate-100">
                        <ImageIcon className="w-16 h-16 text-slate-100 mx-auto mb-4" />
                        <p className="text-slate-400">ยังไม่มีรูปภาพในคลังแกลลอรี่ขณะนี้</p>
                    </div>
                ) : (
                    <div className="columns-2 md:columns-3 lg:columns-4 gap-4 space-y-4">
                        {images.map((img, idx) => (
                            <motion.div
                                key={img._id}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: idx % 10 * 0.05 }}
                                onClick={() => setSelectedIdx(idx)}
                                className="relative group cursor-pointer break-inside-avoid rounded-2xl overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-500 mb-4"
                            >
                                <img
                                    src={img.url}
                                    alt={img.name}
                                    className="w-full h-auto object-cover transition-transform duration-700 group-hover:scale-110"
                                />
                                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                    <div className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-white scale-75 group-hover:scale-100 transition-transform">
                                        <Maximize2 className="w-6 h-6" />
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                )}
            </div>

            {/* Lightbox Overlay */}
            <AnimatePresence>
                {selectedIdx !== null && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[100] bg-black/98 flex flex-col items-center justify-center p-4 backdrop-blur-xl"
                    >
                        <button
                            onClick={() => setSelectedIdx(null)}
                            className="absolute top-6 right-6 w-12 h-12 bg-white/10 hover:bg-white/20 text-white rounded-full flex items-center justify-center transition-all z-[110]"
                        >
                            <X className="w-6 h-6" />
                        </button>

                        <motion.div
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            className="relative max-w-full max-h-[85vh] flex items-center justify-center"
                        >
                            <img src={images[selectedIdx].url} className="max-w-full max-h-[85vh] object-contain shadow-2xl rounded-lg" />

                            <button onClick={prevImg} className="absolute -left-4 md:-left-20 top-1/2 -translate-y-1/2 w-14 h-14 bg-white/5 hover:bg-white/10 text-white rounded-full flex items-center justify-center border border-white/10 shadow-2xl transition-all">
                                <ChevronLeft className="w-8 h-8" />
                            </button>
                            <button onClick={nextImg} className="absolute -right-4 md:-right-20 top-1/2 -translate-y-1/2 w-14 h-14 bg-white/5 hover:bg-white/10 text-white rounded-full flex items-center justify-center border border-white/10 shadow-2xl transition-all">
                                <ChevronRight className="w-8 h-8" />
                            </button>
                        </motion.div>

                        <div className="mt-8 text-white/50 text-xs font-bold uppercase tracking-[0.2em]">
                            {selectedIdx + 1} / {images.length} — {images[selectedIdx].name}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </main>
    )
}
