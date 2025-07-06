import React from 'react'
import { motion } from 'framer-motion'
import { Building, Brush, Ruler, Plus } from 'lucide-react'
import img01 from '../assets/01.jpg'
import img02 from '../assets/02.jpg'
import img03 from '../assets/03.jpg'
import img04 from '../assets/04.jpg'
import img05 from '../assets/05.jpg'
import img06 from '../assets/06.jpg'
import img07 from '../assets/07.jpg'
import img08 from '../assets/08.jpg'
import img09 from '../assets/09.jpg'
import img10 from '../assets/10.jpg'

const ServicesPage = () => {
  const services = [
    {
      icon: <Building className="w-12 h-12 text-primary-600" />,
      title: 'รับเหมาก่อสร้าง',
      description: 'บริการก่อสร้างอาคาร บ้านพักอาศัย อาคารพาณิชย์ ด้วยมาตรฐานสูง',
      features: ['ออกแบบตามความต้องการ', 'ใช้วัสดุคุณภาพสูง', 'ทีมงานมืออาชีพ', 'ส่งมอบตรงเวลา']
    },
    {
      icon: <Brush className="w-12 h-12 text-primary-600" />,
      title: 'ปรับปรุงตกแต่ง',
      description: 'ปรับปรุงและตกแต่งอาคารให้สวยงาม ทันสมัย เพิ่มมูลค่าให้กับอสังหาริมทรัพย์',
      features: ['ออกแบบตกแต่งภายใน', 'ปรับปรุงห้องน้ำ ครัว', 'ทาสีภายใน-ภายนอก', 'เปลี่ยนพื้นผิวใหม่']
    },
    {
      icon: <Ruler className="w-12 h-12 text-primary-600" />,
      title: 'ออกแบบ',
      description: 'บริการออกแบบสถาปัตยกรรม ออกแบบตกแต่งภายใน ด้วยความคิดสร้างสรรค์',
      features: ['ออกแบบ 3D Rendering', 'ปรึกษาฟรี', 'ออกแบบตามงบประมาณ', 'ติดตามงานจริง']
    },
    {
      icon: <Plus className="w-12 h-12 text-primary-600" />,
      title: 'ต่อเติม',
      description: 'บริการต่อเติมอาคาร เพิ่มพื้นที่ใช้สอย ขยายบ้าน ตามแบบที่ต้องการ',
      features: ['ต่อเติมชั้นบน', 'ต่อเติมข้างบ้าน', 'สร้างโรงรถ', 'เพิ่มห้องนอน-ห้องน้ำ']
    }
  ]

  const images = [img01, img02, img03, img04, img05, img06, img07, img08, img09, img10]

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header Section */}
      <div className="bg-gradient-to-r from-primary-600 to-primary-800 text-white pt-32 pb-20">
        <div className="container-custom px-4 sm:px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <h1 className="text-3xl md:text-4xl font-bold mb-3">บริการของเรา</h1>
            <p className="text-primary-100 max-w-xl mx-auto">
              บริการครบวงจรด้านการก่อสร้าง ด้วยทีมงานมืออาชีพ
            </p>
          </motion.div>
        </div>
      </div>

      {/* Services Grid */}
      <div className="py-10 md:py-16 lg:py-20">
        <div className="container-custom px-4 sm:px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-10 lg:gap-12">
            {services.map((service, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                className="bg-white rounded-lg shadow-lg p-8 hover:shadow-xl transition-shadow duration-300"
              >
                <div className="flex items-start space-x-6">
                  <div className="flex-shrink-0">
                    {service.icon}
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-4">{service.title}</h3>
                    <p className="text-gray-600 mb-6">{service.description}</p>
                    <ul className="space-y-2">
                      {service.features.map((feature, featureIndex) => (
                        <li key={featureIndex} className="flex items-center">
                          <span className="w-2 h-2 bg-primary-600 rounded-full mr-3"></span>
                          <span className="text-gray-700">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Work Atmosphere Gallery Section */}
      <div className="py-10 md:py-16 lg:py-20 bg-white">
        <div className="container-custom px-4 sm:px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              บรรยากาศการทำงานของเรา
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              ตัวอย่างภาพบรรยากาศการทำงานจริงของทีม C&P Building Houses
            </p>
          </motion.div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4 md:gap-6 lg:gap-8">
            {images.map((img, idx) => (
              <div key={idx} className="rounded-xl overflow-hidden shadow-lg flex items-center justify-center bg-gray-50">
                <img
                  src={img}
                  alt={`บรรยากาศการทำงาน ${idx+1}`}
                  className="w-full h-48 sm:h-56 md:h-64 lg:h-72 object-cover object-center hover:scale-105 transition-transform duration-300"
                  style={{ maxHeight: '320px' }}
                />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-black text-white py-20">
        <div className="container-custom px-4 sm:px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              พร้อมเริ่มโปรเจคของคุณแล้วหรือยัง?
            </h2>
            <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
              ปรึกษาฟรี ประเมินราคาฟรี พร้อมให้คำแนะนำที่ดีที่สุดสำหรับคุณ
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-primary-600 hover:bg-primary-700 text-white px-8 py-4 rounded-lg font-semibold text-lg transition-colors duration-300"
            >
              ติดต่อเราเลย
            </motion.button>
          </motion.div>
        </div>
      </div>
    </div>
  )
}

export default ServicesPage 