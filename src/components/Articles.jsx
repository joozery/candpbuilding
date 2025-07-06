import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { Calendar, User, ArrowRight, Eye, Tag, Home } from 'lucide-react'
import { Link } from 'react-router-dom'

const Articles = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  })
  const [search, setSearch] = useState('')
  const [activeCategory, setActiveCategory] = useState('all')

  const articles = [
    {
      id: 1,
      title: '5 เทรนด์การออกแบบบ้านยุค 2024',
      summary: 'เทรนด์การออกแบบบ้านที่กำลังเป็นที่นิยม พร้อมแนวโน้มที่จะมาแรงในปีนี้ ตั้งแต่การใช้วัสดุธรรมชาติ จนถึงการออกแบบที่เป็นมิตรกับสิ่งแวดล้อม',
      date: '15 มกราคม 2024',
      author: 'ทีมสถาปนิก C&P',
      category: 'ออกแบบ',
      readTime: '5 นาที',
      views: '1.2k',
      image: 'design-trends',
      gradient: 'from-blue-500 to-purple-600'
    },
    {
      id: 2,
      title: 'วัสดุก่อสร้างเป็นมิตรกับสิ่งแวดล้อม',
      summary: 'รู้จักวัสดุก่อสร้างใหม่ที่ช่วยลดการปล่อยคาร์บอน และประหยัดพลังงาน พร้อมคำแนะนำในการเลือกใช้วัสดุที่เหมาะสมกับโครงการของคุณ',
      date: '10 มกราคม 2024',
      author: 'ทีมวิศวกร C&P',
      category: 'วัสดุ',
      readTime: '7 นาที',
      views: '980',
      image: 'eco-materials',
      gradient: 'from-green-500 to-emerald-600'
    },
    {
      id: 3,
      title: 'เคล็ดลับการประหยัดค่าก่อสร้าง',
      summary: 'วิธีการลดต้นทุนในการก่อสร้างโดยไม่ลดคุณภาพ ตั้งแต่การวางแผนงบประมาณ การเลือกวัสดุ จนถึงเทคนิคการก่อสร้างที่ช่วยประหยัด',
      date: '5 มกราคม 2024',
      author: 'ทีมโครงการ C&P',
      category: 'เคล็ดลับ',
      readTime: '6 นาที',
      views: '2.1k',
      image: 'cost-saving',
      gradient: 'from-primary-500 to-primary-700'
    },
    {
      id: 4,
      title: 'Smart Home: บ้านอัจฉริยะยุคใหม่',
      summary: 'เทคโนโลยีบ้านอัจฉริยะที่จะเปลี่ยนวิธีการใช้ชีวิต ตั้งแต่ระบบควบคุมแสง อุณหภูมิ การรักษาความปลอดภัย และการประหยัดพลังงาน',
      date: '1 มกราคม 2024',
      author: 'ทีมเทคโนโลยี C&P',
      category: 'นวัตกรรม',
      readTime: '8 นาที',
      views: '1.8k',
      image: 'smart-home',
      gradient: 'from-purple-500 to-pink-600'
    }
  ]

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

  // จัดอันดับบทความล่าสุด (เรียงตามวันที่)
  const recentArticles = [...articles].sort((a, b) => {
    // แปลงวันที่เป็น timestamp (mock: assume dd เดือน yyyy)
    const parseDate = d => {
      const [day, month, year] = d.split(' ')
      const thMonths = ['มกราคม','กุมภาพันธ์','มีนาคม','เมษายน','พฤษภาคม','มิถุนายน','กรกฎาคม','สิงหาคม','กันยายน','ตุลาคม','พฤศจิกายน','ธันวาคม']
      const m = thMonths.findIndex(mn => mn === month) + 1
      return new Date(`${year}-${m.toString().padStart(2,'0')}-${day}`).getTime()
    }
    return parseDate(b.date) - parseDate(a.date)
  }).slice(0, 3)

  // จัดอันดับบทความยอดนิยม (เรียงตามยอดวิว)
  const parseViews = v => Number(String(v).replace(/[^\d.]/g, ''))
  const popularArticles = [...articles].sort((a, b) => parseViews(b.views) - parseViews(a.views)).slice(0, 3)

  // Responsive: ถ้าเป็นมือถือให้แสดง recent/popular ด้านบน grid
  const isMobile = typeof window !== 'undefined' && window.innerWidth < 768

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
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
    <section className="bg-white py-10">
      <div className="max-w-7xl mx-auto px-4 flex flex-col lg:flex-row gap-8">
        {/* Main Content */}
        <div className="flex-1">
          {/* Breadcrumb + Search + Filter */}
          <div className="mb-8">
            <nav className="mb-2 text-sm flex items-center gap-2" aria-label="breadcrumb">
              <Home className="w-4 h-4 inline-block mr-1 text-primary-600" />
              <a href="/" className="hover:underline">หน้าแรก</a>
              <span>/</span>
              <span className="text-secondary-700 font-medium">บทความ</span>
            </nav>
            <div className="flex flex-col sm:flex-row sm:items-center sm:gap-4 mb-4">
              <input
                type="text"
                value={search}
                onChange={e => setSearch(e.target.value)}
                placeholder="ค้นหาบทความ..."
                className="w-full sm:w-64 px-5 py-2 rounded-full border border-gray-200 shadow-sm focus:outline-none focus:ring-2 focus:ring-primary-500 text-base text-secondary-700 placeholder-gray-400 transition-all"
              />
            </div>
            <div className="flex flex-wrap gap-2 mb-6">
              {categories.map(cat => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-4 py-2 rounded-full border font-medium text-sm transition-colors
                    ${activeCategory === cat
                      ? 'bg-primary-600 text-white border-primary-600 shadow'
                      : 'bg-white text-primary-700 border-gray-200 hover:bg-primary-50 hover:text-primary-600'}
                  `}
                >
                  {cat === 'all'
                    ? `ทั้งหมด (${totalCount})`
                    : `${cat} (${categoryCounts[cat] || 0})`}
                </button>
              ))}
            </div>
          </div>
          {/* Heading + Description */}
          <motion.div
            ref={ref}
            variants={containerVariants}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
            className="text-center mb-16"
          >
            <motion.h2 
              variants={itemVariants}
              className="text-4xl md:text-5xl font-bold text-secondary-800 mb-6 relative inline-block"
            >
              บทความและข่าวสาร
              <span className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-16 h-1 bg-primary-600 rounded-full"></span>
            </motion.h2>
            <motion.p 
              variants={itemVariants}
              className="text-lg text-secondary-600 max-w-3xl mx-auto leading-relaxed"
            >
              อัพเดตเทรนด์ใหม่ เคล็ดลับการก่อสร้าง และข้อมูลเชิงลึกจากผู้เชี่ยวชาญ
            </motion.p>
          </motion.div>
          {/* Articles List */}
          <motion.div
            ref={ref}
            variants={containerVariants}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
          >
            {filteredArticles.length === 0 ? (
              <div className="col-span-full text-center text-secondary-500 py-12 text-lg">ไม่พบผลลัพธ์ที่ตรงกับ "{search}"</div>
            ) : (
              filteredArticles.map((article, index) => (
                <motion.article
                  key={article.id}
                  variants={itemVariants}
                  className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 group"
                >
                  {/* Article Image */}
                  <div className={`relative h-48 bg-gradient-to-br ${article.gradient} flex items-center justify-center overflow-hidden`}>
                    <div className="absolute inset-0 bg-black/20 group-hover:bg-black/30 transition-colors duration-300"></div>
                    <div className="relative z-10 text-white text-center">
                      <div className="w-16 h-16 mx-auto mb-2 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm">
                        <Calendar className="w-8 h-8" />
                      </div>
                      <span className="text-sm font-medium">{article.category}</span>
                    </div>
                    {/* Category Badge */}
                    <div className="absolute top-4 left-4 bg-primary-600 text-white px-3 py-1 rounded-full text-xs font-medium">
                      {article.category}
                    </div>
                  </div>
                  {/* Article Content */}
                  <div className="p-6">
                    {/* Meta Info */}
                    <div className="flex items-center justify-between text-xs text-secondary-500 mb-3">
                      <div className="flex items-center space-x-4">
                        <span className="flex items-center">
                          <Calendar className="w-3 h-3 mr-1" />
                          {article.date}
                        </span>
                        <span className="flex items-center">
                          <Eye className="w-3 h-3 mr-1" />
                          {article.views}
                        </span>
                      </div>
                      <span>{article.readTime}</span>
                    </div>
                    {/* Title */}
                    <h3 className="text-lg font-semibold text-secondary-800 mb-3 line-clamp-2 group-hover:text-primary-600 transition-colors duration-300">
                      {article.title}
                    </h3>
                    {/* Summary */}
                    <p className="text-secondary-600 text-sm leading-relaxed mb-4 line-clamp-3">
                      {article.summary}
                    </p>
                    {/* Author & Read More */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center text-xs text-secondary-500">
                        <User className="w-3 h-3 mr-1" />
                        <span>{article.author}</span>
                      </div>
                      <Link
                        to={`/articles/${article.id}`}
                        className="flex items-center text-primary-600 hover:text-primary-700 text-sm font-medium group-hover:translate-x-1 transition-all duration-300"
                      >
                        อ่านต่อ
                        <ArrowRight className="w-4 h-4 ml-1" />
                      </Link>
                    </div>
                  </div>
                </motion.article>
              ))
            )}
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default Articles 