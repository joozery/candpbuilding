import React from 'react'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { Hammer, Brush, Compass, Plus } from 'lucide-react'

const Services = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  })

  const services = [
    {
      icon: <Hammer className="w-8 h-8" />,
      title: 'รับเหมาก่อสร้าง',
      description: 'บริการรับเหมาก่อสร้างครบวงจร ตั้งแต่อาคารพักอาศัย อาคารพาณิชย์ โรงงาน ด้วยทีมช่างมืออาชีพ',
      features: [
        'ก่อสร้างบ้านเดี่ยว',
        'อาคารพาณิชย์',
        'โรงงานอุตสาหกรรม',
        'อาคารสำนักงาน'
      ]
    },
    {
      icon: <Brush className="w-8 h-8" />,
      title: 'RENOVATE',
      description: 'บริการปรับปรุงและตกแต่งอาคาร เพื่อเพิ่มมูลค่าและความสวยงามของอสังหาริมทรัพย์',
      features: [
        'ปรับปรุงบ้านเก่า',
        'ตกแต่งภายใน',
        'ปรับปรุงสำนักงาน',
        'รีโนเวทร้านค้า'
      ]
    },
    {
      icon: <Compass className="w-8 h-8" />,
      title: 'ออกแบบ',
      description: 'บริการออกแบบสถาปัตยกรรมและภายใน ด้วยทีมสถาปนิกและดีไซเนอร์มืออาชีพ',
      features: [
        'ออกแบบสถาปัตยกรรม',
        'ออกแบบภายใน',
        'แบบ 3D Rendering',
        'ปรึกษาการวางผัง'
      ]
    },
    {
      icon: <Plus className="w-8 h-8" />,
      title: 'ต่อเติม',
      description: 'บริการต่อเติมอาคาร เพิ่มพื้นที่ใช้สอย ปรับปรุงโครงสร้าง ให้ตรงตามความต้องการ',
      features: [
        'ต่อเติมชั้น 2',
        'ต่อเติมห้องครัว',
        'ต่อเติมโรงรถ',
        'เพิ่มพื้นที่อเนกประสงค์'
      ]
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
    <section id="services" className="section-padding bg-gray-50">
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
            บริการของเรา
            <span className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-16 h-1 bg-primary-600 rounded-full"></span>
          </motion.h2>
          <motion.p 
            variants={itemVariants}
            className="text-lg text-secondary-600 max-w-3xl mx-auto leading-relaxed"
          >
            ครบวงจรด้านการก่อสร้างและออกแบบ ด้วยทีมงานมืออาชีพที่มีประสบการณ์กว่า 15 ปี
          </motion.p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
        >
          {services.map((service, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className="service-card group"
            >
              <div className="text-primary-600 mb-6 group-hover:scale-110 transition-transform duration-300">
                {service.icon}
              </div>
              
              <h3 className="text-xl font-semibold text-secondary-800 mb-4">
                {service.title}
              </h3>
              
              <p className="text-secondary-600 mb-6 leading-relaxed">
                {service.description}
              </p>
              
              <ul className="space-y-2">
                {service.features.map((feature, idx) => (
                  <li key={idx} className="flex items-center text-secondary-700 text-sm">
                    <div className="w-2 h-2 bg-primary-600 rounded-full mr-3 flex-shrink-0"></div>
                    {feature}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

export default Services 