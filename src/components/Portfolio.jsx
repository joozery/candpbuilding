import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { Home, Building, Wrench, Warehouse, Loader2, MapPin, Calendar, ArrowRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import { portfolioApi } from '../lib/api'

const Portfolio = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  })

  const [activeFilter, setActiveFilter] = useState('all')
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const fetchPortfolio = async () => {
    try {
      setLoading(true)
      const res = await portfolioApi.getAll({ status: 'active' })
      setItems(res.data || [])
    } catch (err) {
      setError(err.message || 'โหลดข้อมูลผลงานไม่สำเร็จ')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchPortfolio()
  }, [])

  const categories = ['all', ...new Set(items.map(item => item.category))]

  const filteredItems = activeFilter === 'all'
    ? items
    : items.filter(item => item.category === activeFilter)

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
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  }

  return (
    <section id="portfolio" className="bg-white py-16 min-h-[600px]">
      <div className="max-w-7xl mx-auto px-4">
        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="text-center mb-16"
        >
          <motion.h2
            variants={itemVariants}
            className="text-4xl md:text-5xl font-bold text-slate-900 mb-6 relative inline-block"
          >
            ผลงานที่โดดเด่น
            <span className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-16 h-1 bg-primary-600 rounded-full"></span>
          </motion.h2>
          <motion.p
            variants={itemVariants}
            className="text-slate-500 max-w-2xl mx-auto text-lg"
          >
            จากความตั้งใจสู่ผลลัพธ์ที่จับต้องได้ ทุกโครงการคือเครื่องพิสูจน์คุณภาพงานก่อสร้างของ C&P Building
          </motion.p>
        </motion.div>

        {/* Filter Buttons */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="flex flex-wrap justify-center gap-3 mb-12"
        >
          {categories.map((cat) => (
            <motion.button
              key={cat}
              variants={itemVariants}
              onClick={() => setActiveFilter(cat)}
              className={`px-6 py-2.5 rounded-full font-bold text-sm transition-all duration-300 border-2 ${activeFilter === cat
                  ? 'bg-primary-600 text-white border-primary-600 shadow-lg shadow-primary-500/20'
                  : 'bg-white text-slate-500 border-slate-100 hover:border-primary-200 hover:text-primary-600'
                }`}
            >
              {cat === 'all' ? 'ทั้งหมด' : cat}
            </motion.button>
          ))}
        </motion.div>

        {/* Portfolio Grid */}
        {loading ? (
          <div className="flex flex-col items-center justify-center py-24 text-slate-400">
            <Loader2 className="w-10 h-10 animate-spin text-primary-500 mb-4" />
            <p className="font-medium">กำลังโหลดผลงานความภาคภูมิใจของเรา...</p>
          </div>
        ) : error ? (
          <div className="text-center py-20">
            <p className="text-red-500 font-medium mb-4">{error}</p>
            <button onClick={fetchPortfolio} className="text-primary-600 hover:underline">ลองใหม่อีกครั้ง</button>
          </div>
        ) : filteredItems.length === 0 ? (
          <div className="text-center py-20 text-slate-400">
            <p>ขออภัย ไม่พบผลงานในหมวดหมู่นี้</p>
          </div>
        ) : (
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {filteredItems.map((item) => (
              <motion.div
                key={item._id}
                variants={itemVariants}
                layout
                className="group bg-white rounded-3xl overflow-hidden border border-slate-100 shadow-sm hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2"
              >
                <Link to={`/portfolio/${item._id}`} className="block relative aspect-[4/3] overflow-hidden">
                  {item.images?.length > 0 ? (
                    <img
                      src={item.images[0].url}
                      alt={item.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                  ) : (
                    <div className="w-full h-full bg-slate-100 flex items-center justify-center">
                      <Warehouse className="w-12 h-12 text-slate-300" />
                    </div>
                  )}

                  {/* Overlay on hover */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col justify-end p-8 text-white">
                    <div className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                      <span className="inline-block px-3 py-1 bg-primary-600 rounded-lg text-[10px] font-bold uppercase tracking-widest mb-3 shadow-lg">
                        {item.category}
                      </span>
                      <h3 className="text-xl font-bold mb-2">{item.title}</h3>
                      <p className="text-white/70 text-sm line-clamp-2 mb-4 leading-relaxed">{item.description}</p>
                      <span className="flex items-center gap-2 text-primary-400 font-bold text-sm">
                        ดูรายละเอียดโครงการ <ArrowRight className="w-4 h-4" />
                      </span>
                    </div>
                  </div>
                </Link>

                {/* Bottom Info (Visible) */}
                <div className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-[10px] font-bold text-primary-600 bg-primary-50 px-2 py-1 rounded-md uppercase tracking-wider">
                      {item.category}
                    </span>
                    <span className="text-xs text-slate-400 font-medium">Project ID #CPB{item._id.slice(-4)}</span>
                  </div>
                  <h4 className="text-lg font-bold text-slate-800 mb-4 group-hover:text-primary-600 transition-colors line-clamp-1">{item.title}</h4>
                  <div className="flex items-center gap-4 border-t border-slate-50 pt-4">
                    <div className="flex items-center gap-1.5 text-xs text-slate-500">
                      <MapPin className="w-3.5 h-3.5 text-primary-500" /> {item.location || 'ไม่ระบุสถานที่'}
                    </div>
                    <div className="flex items-center gap-1.5 text-xs text-slate-500">
                      <Calendar className="w-3.5 h-3.5 text-primary-500" /> {item.year || '2024'}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}
      </div>
    </section>
  )
}

export default Portfolio