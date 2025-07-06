import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { Home, Building, Wrench, Warehouse } from 'lucide-react'

const Portfolio = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  })

  const [activeFilter, setActiveFilter] = useState('all')

  const filters = [
    { id: 'all', label: 'ทั้งหมด' },
    { id: 'residential', label: 'บ้านพักอาศัย' },
    { id: 'commercial', label: 'อาคารพาณิชย์' },
    { id: 'renovation', label: 'ปรับปรุง' }
  ]

  const portfolioItems = [
    {
      id: 1,
      title: 'บ้านเดี่ยวสไตล์โมเดิร์น',
      description: 'บ้านเดี่ยว 2 ชั้น พื้นที่ 250 ตร.ม.',
      category: 'residential',
      icon: <Home className="w-12 h-12 text-white" />,
      gradient: 'bg-gradient-to-br from-primary-500 to-primary-700'
    },
    {
      id: 2,
      title: 'อาคารสำนักงาน',
      description: 'อาคารสำนักงาน 4 ชั้น ย่านธุรกิจ',
      category: 'commercial',
      icon: <Building className="w-12 h-12 text-white" />,
      gradient: 'bg-gradient-to-br from-secondary-600 to-secondary-800'
    },
    {
      id: 3,
      title: 'ปรับปรุงบ้านเก่า',
      description: 'รีโนเวทบ้านเก่า 30 ปี ให้ดูใหม่',
      category: 'renovation',
      icon: <Wrench className="w-12 h-12 text-white" />,
      gradient: 'bg-gradient-to-br from-accent-500 to-accent-700'
    },
    {
      id: 4,
      title: 'บ้านสไตล์ลอฟท์',
      description: 'บ้านสไตล์อุตสาหกรรม ดีไซน์ทันสมัย',
      category: 'residential',
      icon: <Warehouse className="w-12 h-12 text-white" />,
      gradient: 'bg-gradient-to-br from-primary-600 to-accent-600'
    },
    {
      id: 5,
      title: 'ศูนย์การค้าชุมชน',
      description: 'ศูนย์การค้าขนาดกลาง 3 ชั้น',
      category: 'commercial',
      icon: <Building className="w-12 h-12 text-white" />,
      gradient: 'bg-gradient-to-br from-gold-600 to-gold-800'
    },
    {
      id: 6,
      title: 'ต่อเติมบ้านชั้น 2',
      description: 'เพิ่มพื้นที่ใช้สอย ชั้น 2 ครบครัน',
      category: 'renovation',
      icon: <Home className="w-12 h-12 text-white" />,
      gradient: 'bg-gradient-to-br from-primary-400 to-secondary-600'
    }
  ]

  const filteredItems = activeFilter === 'all' 
    ? portfolioItems 
    : portfolioItems.filter(item => item.category === activeFilter)

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
    <section id="portfolio" className="section-padding">
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
            ผลงานของเรา
            <span className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-16 h-1 bg-primary-600 rounded-full"></span>
          </motion.h2>
          <motion.p 
            variants={itemVariants}
            className="text-lg text-secondary-600 max-w-3xl mx-auto leading-relaxed"
          >
            ความภาคภูมิใจในทุกโครงการที่ได้สร้างสรรค์ ด้วยคุณภาพและความเป็นเลิศ
          </motion.p>
        </motion.div>

        {/* Filter Buttons */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="flex flex-wrap justify-center gap-4 mb-12"
        >
          {filters.map((filter) => (
            <motion.button
              key={filter.id}
              variants={itemVariants}
              onClick={() => setActiveFilter(filter.id)}
              className={`px-6 py-3 rounded-full font-medium transition-all duration-300 ${
                activeFilter === filter.id
                  ? 'bg-primary-600 text-white shadow-lg'
                  : 'bg-white text-secondary-600 hover:bg-primary-50 hover:text-primary-600 border-2 border-gray-200'
              }`}
            >
              {filter.label}
            </motion.button>
          ))}
        </motion.div>

        {/* Portfolio Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {filteredItems.map((item) => (
            <motion.div
              key={item.id}
              variants={itemVariants}
              layout
              className="portfolio-card group"
            >
              <div className={`relative h-64 ${item.gradient} flex items-center justify-center overflow-hidden`}>
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors duration-300"></div>
                <div className="relative z-10 group-hover:scale-110 transition-transform duration-300">
                  {item.icon}
                </div>
                
                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end">
                  <div className="p-6 text-white">
                    <h4 className="text-lg font-semibold mb-2">{item.title}</h4>
                    <p className="text-sm text-gray-200">{item.description}</p>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

export default Portfolio 