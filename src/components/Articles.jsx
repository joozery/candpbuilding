import React from 'react'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { Calendar, User, ArrowRight, Eye } from 'lucide-react'

const Articles = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  })

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
    <section id="articles" className="section-padding bg-white">
      <div className="container-custom">
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

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
        >
          {articles.map((article, index) => (
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
                  
                  <button className="flex items-center text-primary-600 hover:text-primary-700 text-sm font-medium group-hover:translate-x-1 transition-all duration-300">
                    อ่านต่อ
                    <ArrowRight className="w-4 h-4 ml-1" />
                  </button>
                </div>
              </div>
            </motion.article>
          ))}
        </motion.div>

        {/* View All Articles Button */}
        <motion.div
          variants={itemVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="text-center mt-12"
        >
          <button className="btn btn-outline hover:bg-primary-600 hover:text-white hover:border-primary-600 text-lg px-8 py-4">
            ดูบทความทั้งหมด
          </button>
        </motion.div>
      </div>
    </section>
  )
}

export default Articles 