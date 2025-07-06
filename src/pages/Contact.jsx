import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { ChevronDown, ChevronUp } from 'lucide-react'
import Contact from '../components/Contact'

const ContactPage = () => {
  const [openFAQ, setOpenFAQ] = useState(null)

  const faqs = [
    {
      question: 'เราให้บริการในพื้นที่ใดบ้าง?',
      answer: 'เราให้บริการหลักในจังหวัดชลบุรี และพื้นที่ใกล้เคียง เช่น ระยอง ปราจีนบุรี สำหรับโครงการขนาดใหญ่สามารถให้บริการครอบคลุมทั่วประเทศ'
    },
    {
      question: 'ใช้เวลากี่วันในการก่อสร้างบ้าน?',
      answer: 'ระยะเวลาขึ้นอยู่กับขนาดและความซับซ้อนของโครงการ บ้านเดี่ยวทั่วไปใช้เวลา 4-6 เดือน อาคารพาณิชย์ใช้เวลา 6-12 เดือน'
    },
    {
      question: 'มีการรับประกันผลงานหรือไม่?',
      answer: 'เรามีการรับประกันผลงาน โครงสร้างหลัก 5 ปี งานระบบไฟฟ้าและประปา 2 ปี งานตกแต่ง 1 ปี พร้อมบริการหลังการขายตลอดอายุการใช้งาน'
    },
    {
      question: 'สามารถขอใบเสนอราคาได้อย่างไร?',
      answer: 'สามารถติดต่อขอใบเสนอราคาได้โดยโทรมาที่เบอร์ 02-123-4567 หรือส่งข้อมูลผ่านฟอร์มติดต่อ เราจะส่งทีมไปสำรวจหน้างานและเสนอราคาฟรี'
    },
    {
      question: 'มีบริการออกแบบให้หรือไม่?',
      answer: 'มีครับ เรามีทีมสถาปนิกและมัณฑนากรมืออาชีพ ให้บริการออกแบบตั้งแต่แบบร่าง 3D Rendering จนถึงแบบก่อสร้างที่สมบูรณ์'
    },
    {
      question: 'รับผิดชอบเรื่องใบอนุญาตก่อสร้างด้วยหรือไม่?',
      answer: 'รับผิดชอบครับ เรามีทีมงานที่มีประสบการณ์ในการยื่นขออนุญาตก่อสร้างกับหน่วยงานราชการต่างๆ รวมถึงการประสานงานให้ตลอดโครงการ'
    }
  ]

  const toggleFAQ = (index) => {
    setOpenFAQ(openFAQ === index ? null : index)
  }

  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      {/* Contact Component */}
      <Contact />

      {/* Map Section */}
      <section className="py-20 bg-white">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              ที่ตั้งสำนักงาน
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              เยี่ยมชมสำนักงานใหญ่ของเราและพบกับทีมงานมืออาชีพ
            </p>
          </motion.div>

          {/* Google Map */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="max-w-4xl mx-auto"
          >
            <div className="bg-gray-200 rounded-lg overflow-hidden h-96">
              <iframe
                src="https://maps.google.com/maps?width=100%25&amp;height=600&amp;hl=th&amp;q=หมู่บ้าน ปัญญารีสอร์ท หมู่ที่ 10 ตำบลบางพระ อำเภอศรีราชา จังหวัดชลบุรี&amp;t=&amp;z=15&amp;ie=UTF8&amp;iwloc=B&amp;output=embed"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="grayscale hover:grayscale-0 transition-all duration-300"
              ></iframe>
            </div>
          </motion.div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-gray-50">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              คำถามที่พบบ่อย
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              รวมคำถามและคำตอบที่ลูกค้าสอบถามกันบ่อยที่สุด
            </p>
          </motion.div>

          <div className="max-w-4xl mx-auto">
            {faqs.map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="mb-4"
              >
                <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
                  <button
                    onClick={() => toggleFAQ(index)}
                    className="w-full px-6 py-4 text-left flex justify-between items-center hover:bg-gray-50 transition-colors duration-200"
                  >
                    <h3 className="text-lg font-semibold text-gray-900 pr-4">
                      {faq.question}
                    </h3>
                    {openFAQ === index ? (
                      <ChevronUp className="w-5 h-5 text-primary-600 flex-shrink-0" />
                    ) : (
                      <ChevronDown className="w-5 h-5 text-gray-400 flex-shrink-0" />
                    )}
                  </button>
                  
                  {openFAQ === index && (
                    <motion.div
                      initial={{ height: 0 }}
                      animate={{ height: 'auto' }}
                      exit={{ height: 0 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden"
                    >
                      <div className="px-6 pb-4">
                        <p className="text-gray-600 leading-relaxed">
                          {faq.answer}
                        </p>
                      </div>
                    </motion.div>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}

export default ContactPage 