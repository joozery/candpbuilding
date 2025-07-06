import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { MapPin, Phone, Mail, Clock, Send, CheckCircle } from 'lucide-react'

const Contact = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  })

  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    service: '',
    message: ''
  })

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const contactInfo = [
    {
      icon: <MapPin className="w-6 h-6" />,
      title: 'ที่อยู่',
      content: '123 ถนนสุขุมวิท แขวงคลองเตย\nเขตคลองเตย กรุงเทพฯ 10110'
    },
    {
      icon: <Phone className="w-6 h-6" />,
      title: 'โทรศัพท์',
      content: '02-123-4567\n086-123-4567'
    },
    {
      icon: <Mail className="w-6 h-6" />,
      title: 'อีเมล',
      content: 'info@cpbuildinghouse.com\ncontact@cpbuildinghouse.com'
    },
    {
      icon: <Clock className="w-6 h-6" />,
      title: 'เวลาทำการ',
      content: 'จันทร์ - เสาร์: 8:00 - 18:00\nอาทิตย์: นัดหมายล่วงหน้า'
    }
  ]

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 1500))
    
    setIsSubmitting(false)
    setIsSubmitted(true)
    
    // Reset form after success
    setTimeout(() => {
      setFormData({
        name: '',
        phone: '',
        email: '',
        service: '',
        message: ''
      })
      setIsSubmitted(false)
    }, 3000)
  }

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
    <section id="contact" className="section-padding">
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
            ติดต่อเรา
            <span className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-16 h-1 bg-primary-600 rounded-full"></span>
          </motion.h2>
          <motion.p 
            variants={itemVariants}
            className="text-lg text-secondary-600 max-w-3xl mx-auto leading-relaxed"
          >
            พร้อมให้คำปรึกษาและบริการฟรี ติดต่อเราได้ทุกวัน
          </motion.p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="grid grid-cols-1 lg:grid-cols-2 gap-16"
        >
          {/* Contact Information */}
          <div className="space-y-8">
            {contactInfo.map((info, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                className="flex items-start space-x-4 p-6 bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300"
              >
                <div className="text-primary-600 flex-shrink-0">
                  {info.icon}
                </div>
                <div>
                  <h4 className="text-lg font-semibold text-secondary-800 mb-2">
                    {info.title}
                  </h4>
                  <p className="text-secondary-600 leading-relaxed whitespace-pre-line">
                    {info.content}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Contact Form */}
          <motion.div
            variants={itemVariants}
            className="bg-white p-8 rounded-xl shadow-lg"
          >
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-secondary-700 mb-2">
                    ชื่อ-นามสกุล
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-primary-600 focus:outline-none transition-colors duration-300"
                    placeholder="กรอกชื่อ-นามสกุล"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-secondary-700 mb-2">
                    เบอร์โทรศัพท์
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-primary-600 focus:outline-none transition-colors duration-300"
                    placeholder="กรอกเบอร์โทรศัพท์"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-secondary-700 mb-2">
                  อีเมล
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-primary-600 focus:outline-none transition-colors duration-300"
                  placeholder="กรอกอีเมล"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-secondary-700 mb-2">
                  บริการที่สนใจ
                </label>
                <select
                  name="service"
                  value={formData.service}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-primary-600 focus:outline-none transition-colors duration-300"
                >
                  <option value="">เลือกบริการที่สนใจ</option>
                  <option value="construction">รับเหมาก่อสร้าง</option>
                  <option value="renovation">ปรับปรุงตกแต่ง</option>
                  <option value="design">ออกแบบ</option>
                  <option value="extension">ต่อเติม</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-secondary-700 mb-2">
                  รายละเอียดโครงการ
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows="5"
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-primary-600 focus:outline-none transition-colors duration-300 resize-vertical"
                  placeholder="กรอกรายละเอียดโครงการ..."
                ></textarea>
              </div>

              <button
                type="submit"
                disabled={isSubmitting || isSubmitted}
                className={`w-full py-4 px-6 rounded-lg font-medium transition-all duration-300 ${
                  isSubmitted 
                    ? 'bg-green-600 text-white' 
                    : 'btn btn-primary'
                } ${isSubmitting ? 'opacity-70 cursor-not-allowed' : ''}`}
              >
                {isSubmitting ? (
                  <div className="flex items-center justify-center">
                    <div className="loading mr-2"></div>
                    กำลังส่งข้อความ...
                  </div>
                ) : isSubmitted ? (
                  <div className="flex items-center justify-center">
                    <CheckCircle className="w-5 h-5 mr-2" />
                    ส่งข้อความสำเร็จ!
                  </div>
                ) : (
                  <div className="flex items-center justify-center">
                    <Send className="w-5 h-5 mr-2" />
                    ส่งข้อความ
                  </div>
                )}
              </button>
            </form>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}

export default Contact 