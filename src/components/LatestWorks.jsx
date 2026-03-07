import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { ArrowLeft, ArrowRight, Loader2, MapPin, Calendar, FileText, User, Eye } from 'lucide-react'
import { Link } from 'react-router-dom'
import { portfolioApi, articlesApi } from '../lib/api'

export default function LatestWorks() {
    const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 })
    const [portfolio, setPortfolio] = useState([])
    const [articles, setArticles] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [pRes, aRes] = await Promise.all([
                    portfolioApi.getAll({ status: 'active', limit: 3 }),
                    articlesApi.getAll({ status: 'published', limit: 3 })
                ])
                setPortfolio(pRes.data || [])
                setArticles(aRes.data || [])
            } catch (err) {
                console.error(err)
            } finally {
                setLoading(false)
            }
        }
        fetchData()
    }, [])

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
    }

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } }
    }

    if (loading) return null

    return (
        <section ref={ref} className="py-24 bg-white overflow-hidden">
            <div className="max-w-7xl mx-auto px-4">

                {/* Latest Portfolio */}
                <div className="mb-24">
                    <div className="flex items-end justify-between mb-12">
                        <div>
                            <h2 className="text-3xl md:text-5xl font-black text-slate-900 mb-4">ผลงานล่าสุด</h2>
                            <p className="text-slate-500 max-w-lg">สัมผัสคุณภาพและงานดีไซน์จากโครงการจริงที่เราเพิ่งส่งมอบให้ลูกค้า</p>
                        </div>
                        <Link to="/portfolio" className="hidden md:flex items-center gap-2 font-bold text-primary-600 hover:text-primary-700 transition-colors group">
                            ดูผลงานทั้งหมด <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                        </Link>
                    </div>

                    <motion.div
                        variants={containerVariants}
                        initial="hidden"
                        animate={inView ? "visible" : "hidden"}
                        className="grid grid-cols-1 md:grid-cols-3 gap-8"
                    >
                        {portfolio.map((item) => (
                            <motion.div key={item._id} variants={itemVariants} className="group relative rounded-3xl overflow-hidden hover:shadow-2xl transition-all duration-500">
                                <Link to={`/portfolio/${item._id}`} className="block relative aspect-[4/5]">
                                    {item.images?.[0] ? (
                                        <img src={item.images[0].url} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                                    ) : (
                                        <div className="w-full h-full bg-slate-100 flex items-center justify-center text-slate-300" />
                                    )}
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent p-8 flex flex-col justify-end text-white">
                                        <span className="inline-block px-3 py-1 bg-primary-600 rounded-lg text-[10px] font-bold uppercase tracking-widest mb-3 self-start">
                                            {item.category}
                                        </span>
                                        <h3 className="text-xl font-bold mb-2">{item.title}</h3>
                                        <div className="flex items-center gap-4 text-xs text-white/60">
                                            <span className="flex items-center gap-1.5"><MapPin className="w-3 h-3" /> {item.location}</span>
                                            <span className="flex items-center gap-1.5"><Calendar className="w-3 h-3" /> {item.year}</span>
                                        </div>
                                    </div>
                                </Link>
                            </motion.div>
                        ))}
                    </motion.div>
                    <div className="mt-10 md:hidden text-center">
                        <Link to="/portfolio" className="inline-flex items-center gap-2 font-bold text-primary-600">
                            ดูผลงานทั้งหมด <ArrowRight className="w-4 h-4" />
                        </Link>
                    </div>
                </div>

                {/* Latest Articles */}
                <div>
                    <div className="flex items-end justify-between mb-12">
                        <div>
                            <h2 className="text-3xl md:text-5xl font-black text-slate-900 mb-4">บทความน่าสนใจ</h2>
                            <p className="text-slate-500 max-w-lg">สาระความรู้ เทรนด์การแต่งบ้าน และเคล็ดลับการก่อสร้าง</p>
                        </div>
                        <Link to="/articles" className="hidden md:flex items-center gap-2 font-bold text-primary-600 hover:text-primary-700 transition-colors group">
                            อ่านบทความทั้งหมด <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                        </Link>
                    </div>

                    <motion.div
                        variants={containerVariants}
                        initial="hidden"
                        animate={inView ? "visible" : "hidden"}
                        className="grid grid-cols-1 md:grid-cols-3 gap-8"
                    >
                        {articles.map((article) => (
                            <motion.article key={article._id} variants={itemVariants} className="bg-slate-50 rounded-3xl p-6 border border-slate-100 hover:bg-white hover:shadow-xl transition-all duration-300 group">
                                <Link to={`/articles/${article._id}`}>
                                    <div className="aspect-video rounded-2xl overflow-hidden mb-6 bg-slate-200">
                                        {article.image?.url ? (
                                            <img src={article.image.url} className="w-full h-full object-cover transition-transform group-hover:scale-110" />
                                        ) : (
                                            <div className={`w-full h-full bg-gradient-to-br ${article.gradient} flex items-center justify-center`}>
                                                <FileText className="w-10 h-10 text-white/50" />
                                            </div>
                                        )}
                                    </div>
                                    <span className="text-[10px] font-bold text-primary-600 uppercase tracking-widest mb-3 block">
                                        {article.category}
                                    </span>
                                    <h3 className="text-xl font-bold text-slate-800 mb-4 line-clamp-2 leading-snug group-hover:text-primary-600 transition-colors">
                                        {article.title}
                                    </h3>
                                    <div className="flex items-center justify-between pt-6 border-t border-slate-200/50">
                                        <div className="flex items-center gap-2 text-xs text-slate-400">
                                            <User className="w-3 h-3" /> {article.author}
                                        </div>
                                        <div className="flex items-center gap-2 text-xs text-slate-400">
                                            <Eye className="w-3 h-3" /> {article.views}
                                        </div>
                                    </div>
                                </Link>
                            </motion.article>
                        ))}
                    </motion.div>
                </div>

            </div>
        </section>
    )
}
