import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { Calendar, User, ArrowRight, Eye, Home, Loader2, AlertCircle, Search, FileText } from 'lucide-react'
import { Link } from 'react-router-dom'
import { articlesApi } from '../lib/api'

const Articles = () => {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 })
  const [search, setSearch] = useState('')
  const [activeCategory, setActiveCategory] = useState('all')

  const [articles, setArticles] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const fetchArticles = async () => {
    try {
      setLoading(true)
      const res = await articlesApi.getAll({ status: 'published' })
      setArticles(res.data || [])
    } catch (err) {
      setError(err.message || 'โหลดข้อมูลไม่ได้')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchArticles()
  }, [])

  // นับจำนวนบทความแต่ละหมวด
  const categoryCounts = articles.reduce((acc, a) => {
    acc[a.category] = (acc[a.category] || 0) + 1;
    return acc;
  }, {});
  const totalCount = articles.length;
  const categories = ['all', ...Object.keys(categoryCounts)];

  // ฟิลเตอร์บทความตาม search และหมวดหมู่
  const filteredArticles = articles.filter(a => {
    const matchSearch =
      a.title.toLowerCase().includes(search.toLowerCase()) ||
      a.summary.toLowerCase().includes(search.toLowerCase())
    const matchCategory =
      activeCategory === 'all' || a.category === activeCategory
    return matchSearch && matchCategory
  })

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut"
      }
    }
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-slate-500">
        <AlertCircle className="w-12 h-12 mb-4 text-red-400 opacity-50" />
        <p className="text-lg font-medium">{error}</p>
        <button onClick={fetchArticles} className="mt-4 text-primary-600 hover:underline">ลองมใหม่อีกครั้ง</button>
      </div>
    )
  }

  return (
    <section className="bg-white py-10 min-h-[600px]">
      <div className="max-w-7xl mx-auto px-4 flex flex-col lg:flex-row gap-8">
        {/* Main Content */}
        <div className="flex-1">
          {/* Breadcrumb + Search + Filter */}
          <div className="mb-8">
            <nav className="mb-4 text-sm flex items-center gap-2" aria-label="breadcrumb">
              <Home className="w-4 h-4 inline-block mr-1 text-primary-600" />
              <Link to="/" className="hover:underline text-slate-500">หน้าแรก</Link>
              <span className="text-slate-300">/</span>
              <span className="text-slate-800 font-semibold">บทความ</span>
            </nav>
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
              <div className="flex flex-wrap gap-2">
                {categories.map(cat => (
                  <button
                    key={cat}
                    onClick={() => setActiveCategory(cat)}
                    className={`px-4 py-1.5 rounded-full border text-sm font-medium transition-all
                      ${activeCategory === cat
                        ? 'bg-primary-600 text-white border-primary-600 shadow-md'
                        : 'bg-white text-slate-600 border-slate-200 hover:border-primary-300 hover:text-primary-600'}
                    `}
                  >
                    {cat === 'all'
                      ? `ทั้งหมด (${totalCount})`
                      : `${cat} (${categoryCounts[cat] || 0})`}
                  </button>
                ))}
              </div>
              <div className="relative group">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 group-focus-within:text-primary-500 transition-colors" />
                <input
                  type="text"
                  value={search}
                  onChange={e => setSearch(e.target.value)}
                  placeholder="ค้นหาบทความ..."
                  className="w-full sm:w-64 pl-10 pr-4 py-2 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-primary-100 focus:border-primary-500 text-sm transition-all"
                />
              </div>
            </div>
          </div>

          {/* Heading */}
          <motion.div
            ref={ref}
            variants={containerVariants}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
            className="mb-12"
          >
            <motion.h2 variants={itemVariants} className="text-3xl font-bold text-slate-900 mb-2">บทความและข่าวสาร</motion.h2>
            <motion.p variants={itemVariants} className="text-slate-500">อัปเดตเทรนด์การออกแบบ เคล็ดลับ และข่าวสารล่าสุดจากทีมงาน C&P Building</motion.p>
          </motion.div>

          {/* Articles Grid */}
          {loading ? (
            <div className="flex flex-col items-center justify-center py-20 text-slate-400">
              <Loader2 className="w-8 h-8 animate-spin mb-4" />
              <p>กำลังโหลดบทความ...</p>
            </div>
          ) : (
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate={inView ? "visible" : "hidden"}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
            >
              {filteredArticles.length === 0 ? (
                <div className="col-span-full text-center text-slate-400 py-16">
                  <p className="text-lg">ไม่พบบทความที่คุณค้นหา</p>
                </div>
              ) : (
                filteredArticles.map((article) => (
                  <motion.article
                    key={article._id}
                    variants={itemVariants}
                    className="bg-white rounded-2xl border border-slate-100 shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden group"
                  >
                    {/* Image / Gradient */}
                    <Link to={`/articles/${article._id}`} className="block relative aspect-[4/3] overflow-hidden">
                      {article.image?.url ? (
                        <img
                          src={article.image.url}
                          alt={article.title}
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                        />
                      ) : (
                        <div className={`w-full h-full bg-gradient-to-br ${article.gradient || 'from-slate-100 to-slate-200'} flex items-center justify-center p-8`}>
                          <FileText className="w-12 h-12 text-white/50" />
                        </div>
                      )}
                      <div className="absolute top-3 left-3">
                        <span className="bg-white/90 backdrop-blur-sm text-primary-700 px-3 py-1 rounded-lg text-[10px] font-bold uppercase tracking-wider shadow-sm">
                          {article.category}
                        </span>
                      </div>
                    </Link>

                    {/* Content */}
                    <div className="p-5">
                      <div className="flex items-center gap-3 text-[10px] text-slate-400 mb-3">
                        <span className="flex items-center gap-1">
                          <Calendar className="w-3 h-3" />
                          {new Date(article.createdAt).toLocaleDateString('th-TH', { day: 'numeric', month: 'short', year: 'numeric' })}
                        </span>
                        <span className="flex items-center gap-1">
                          <Eye className="w-3 h-3" />
                          {article.views?.toLocaleString() || '0'}
                        </span>
                      </div>
                      <Link to={`/articles/${article._id}`}>
                        <h3 className="text-base font-bold text-slate-800 line-clamp-2 mb-2 group-hover:text-primary-600 transition-colors leading-snug">
                          {article.title}
                        </h3>
                      </Link>
                      <p className="text-slate-500 text-xs line-clamp-2 mb-5 leading-relaxed">
                        {article.summary}
                      </p>

                      <div className="flex items-center justify-between pt-4 border-t border-slate-50">
                        <div className="flex items-center gap-2">
                          <div className="w-6 h-6 rounded-full bg-primary-50 flex items-center justify-center text-primary-600">
                            <User className="w-3 h-3" />
                          </div>
                          <span className="text-[10px] font-medium text-slate-600">{article.author}</span>
                        </div>
                        <Link
                          to={`/articles/${article._id}`}
                          className="flex items-center gap-1 text-xs font-bold text-primary-600 hover:text-primary-700 transition-colors"
                        >
                          อ่านต่อ <ArrowRight className="w-3 h-3" />
                        </Link>
                      </div>
                    </div>
                  </motion.article>
                ))
              )}
            </motion.div>
          )}
        </div>
      </div>
    </section>
  )
}

export default Articles