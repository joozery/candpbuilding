import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { Award, Clock, Users } from 'lucide-react'

const About = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  })

  const [counts, setCounts] = useState({
    experience: 0,
    projects: 0,
    satisfaction: 0
  })

  useEffect(() => {
    if (inView) {
      // Animate counters
      const targets = { experience: 15, projects: 500, satisfaction: 100 }
      const duration = 2000
      const steps = 60
      const interval = duration / steps

      const increment = {
        experience: targets.experience / steps,
        projects: targets.projects / steps,
        satisfaction: targets.satisfaction / steps
      }

      let step = 0
      const timer = setInterval(() => {
        step++
        setCounts({
          experience: Math.min(Math.floor(increment.experience * step), targets.experience),
          projects: Math.min(Math.floor(increment.projects * step), targets.projects),
          satisfaction: Math.min(Math.floor(increment.satisfaction * step), targets.satisfaction)
        })

        if (step >= steps) {
          clearInterval(timer)
          setCounts(targets)
        }
      }, interval)

      return () => clearInterval(timer)
    }
  }, [inView])

  const features = [
    {
      icon: <Award className="w-8 h-8 text-primary-600" />,
      title: 'คุณภาพเป็นเลิศ',
      description: 'ใช้วัสดุคุณภาพดี และมาตรฐานการก่อสร้างสากล เพื่อความคงทนและปลอดภัย'
    },
    {
      icon: <Clock className="w-8 h-8 text-primary-600" />,
      title: 'ส่งมอบตรงเวลา',
      description: 'มุ่งมั่นในการส่งมอบงานตรงตามกำหนดเวลา พร้อมการควบคุมคุณภาพอย่างเข้มงวด'
    },
    {
      icon: <Users className="w-8 h-8 text-primary-600" />,
      title: 'บริการหลังการขาย',
      description: 'ดูแลและรับประกันผลงานหลังส่งมอบ พร้อมให้คำปรึกษาและบำรุงรักษา'
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
    <section id="about" className="section-padding bg-gray-50">
      <div className="container-custom">
        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center"
        >
          {/* Left Content */}
          <div>
            <motion.h2 
              variants={itemVariants}
              className="text-4xl md:text-5xl font-bold text-secondary-800 mb-6 relative inline-block"
            >
              เกี่ยวกับเรา
              <span className="absolute bottom-0 left-0 w-16 h-1 bg-primary-600 rounded-full"></span>
            </motion.h2>
            
            <motion.p 
              variants={itemVariants}
              className="text-lg text-secondary-600 mb-8 leading-relaxed"
            >
              บริษัท ซีแอนด์พี บิลดิ้งเฮ้าส์ จำกัด ก่อตั้งขึ้นด้วยวิสัยทัศน์ที่จะเป็นผู้นำด้านการก่อสร้าง
              ที่มีคุณภาพและเชื่อถือได้ เราให้ความสำคัญกับรายละเอียดและความพึงพอใจของลูกค้าเป็นหลัก
            </motion.p>

            <motion.p 
              variants={itemVariants}
              className="text-lg text-secondary-600 mb-12 leading-relaxed"
            >
              ด้วยประสบการณ์ที่สั่งสมมาอย่างยาวนาน เรามีความเชี่ยวชาญในการออกแบบและก่อสร้าง
              ที่ตอบสนองความต้องการของลูกค้าในทุกมิติ
            </motion.p>

            {/* Statistics */}
            <motion.div 
              variants={itemVariants}
              className="grid grid-cols-3 gap-8 mb-8"
            >
              <div className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-primary-600 mb-2">
                  {counts.experience}+
                </div>
                <div className="text-secondary-600 font-medium">ปีประสบการณ์</div>
              </div>
              <div className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-primary-600 mb-2">
                  {counts.projects}+
                </div>
                <div className="text-secondary-600 font-medium">โครงการสำเร็จ</div>
              </div>
              <div className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-primary-600 mb-2">
                  {counts.satisfaction}%
                </div>
                <div className="text-secondary-600 font-medium">ความพึงพอใจ</div>
              </div>
            </motion.div>
          </div>

          {/* Right Content - Features */}
          <div className="space-y-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                className="flex items-start space-x-4 p-6 bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300"
              >
                <div className="flex-shrink-0">
                  {feature.icon}
                </div>
                <div>
                  <h4 className="text-xl font-semibold text-secondary-800 mb-2">
                    {feature.title}
                  </h4>
                  <p className="text-secondary-600 leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default About 