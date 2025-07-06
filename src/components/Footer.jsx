import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Globe, MessageCircle, Camera, Phone, Mail, MapPin, Send } from 'lucide-react'
import { Link } from 'react-router-dom'

const Footer = () => {
  const currentYear = new Date().getFullYear()
  const [email, setEmail] = useState('')
  const [isSubscribed, setIsSubscribed] = useState(false)

  const socialLinks = [
    {
      icon: <Globe className="w-5 h-5" />,
      href: "#",
      label: "Facebook"
    },
    {
      icon: <MessageCircle className="w-5 h-5" />,
      href: "#",
      label: "LINE"
    },
    {
      icon: <Camera className="w-5 h-5" />,
      href: "#",
      label: "Instagram"
    }
  ]

  const quickLinks = [
    { label: 'หน้าแรก', path: '/' },
    { label: 'บริการ', path: '/services' },
    { label: 'ผลงาน', path: '/portfolio' },
    { label: 'เกี่ยวกับเรา', path: '/about' },
    { label: 'บทความ', path: '/articles' },
    { label: 'ติดต่อ', path: '/contact' }
  ]

  const handleNewsletterSubmit = (e) => {
    e.preventDefault()
    if (email) {
      setIsSubscribed(true)
      setEmail('')
      setTimeout(() => setIsSubscribed(false), 3000)
    }
  }

  return (
    <footer className="bg-secondary-900 text-white">
      <div className="container-custom">
        <div className="py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            
            {/* Information Column */}
            <div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
              >
                <h3 className="text-xl font-semibold mb-6 text-white">Information</h3>
                <p className="text-gray-400 leading-relaxed mb-6">
                  เราจัดการกับงานที่มีความซับซ้อนแตกต่างกันได้สำเร็จ ให้การรับประกันระยะยาว 
                  และเรียนรู้เทคโนโลยีใหม่ๆ อย่างสม่ำเสมอ เพื่อให้บริการที่ดีที่สุดแก่ลูกค้า
                </p>
              </motion.div>
            </div>

            {/* Quick Links Column */}
            <div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                viewport={{ once: true }}
              >
                <h3 className="text-xl font-semibold mb-6 text-white">Quick Links</h3>
                <div className="space-y-3">
                  {quickLinks.map((link, index) => (
                    <Link
                      key={index}
                      to={link.path}
                      className="block text-gray-400 hover:text-primary-400 transition-colors duration-300"
                    >
                      {link.label}
                    </Link>
                  ))}
                </div>
              </motion.div>
            </div>

            {/* Contact Column */}
            <div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                viewport={{ once: true }}
              >
                <h3 className="text-xl font-semibold mb-6 text-white">Contact</h3>
                <div className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <MapPin className="w-5 h-5 text-primary-400 flex-shrink-0 mt-1" />
                    <div>
                      <p className="text-gray-400">781/45 ชั้นที่ 8 ห้องเลขที่ 3A8</p>
                      <p className="text-gray-400">หมู่บ้าน ปัญญารีสอร์ท หมู่ที่ 10</p>
                      <p className="text-gray-400">ตำบลบางพระ อำเภอศรีราชา จ.ชลบุรี</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-3">
                    <Phone className="w-5 h-5 text-primary-400 flex-shrink-0" />
                    <span className="text-gray-400">02-123-4567</span>
                  </div>
                  
                  <div className="flex items-center space-x-3">
                    <Mail className="w-5 h-5 text-primary-400 flex-shrink-0" />
                    <span className="text-gray-400">info@cpbuildinghouse.com</span>
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Newsletter Column */}
            <div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                viewport={{ once: true }}
              >
                <h3 className="text-xl font-semibold mb-6 text-white">Newsletter</h3>
                <p className="text-gray-400 mb-6">
                  สมัครรับข่าวสารรายสัปดาห์ เพื่อรับข้อมูลข่าวสารล่าสุด
                </p>
                
                <form onSubmit={handleNewsletterSubmit} className="relative">
                  <div className="flex">
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="กรอกอีเมลของคุณ"
                      className="flex-1 bg-secondary-800 border border-secondary-700 rounded-l-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-primary-500 transition-colors duration-300"
                      required
                    />
                    <button
                      type="submit"
                      className="bg-primary-600 hover:bg-primary-700 px-6 py-3 rounded-r-lg transition-colors duration-300 flex items-center justify-center"
                      style={{
                        clipPath: 'polygon(20px 0, 100% 0, 100% 100%, 0 100%)'
                      }}
                    >
                      <Send className="w-5 h-5" />
                    </button>
                  </div>
                  
                  {isSubscribed && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="absolute top-full mt-2 text-green-400 text-sm"
                    >
                      ✓ สมัครรับข่าวสารสำเร็จแล้ว!
                    </motion.div>
                  )}
                </form>
              </motion.div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-secondary-800 py-8">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0"
          >
            <div className="flex items-center space-x-2">
              <span className="text-gray-400">C&P Building Houses</span>
              <span className="text-primary-400">💛</span>
              <span className="text-gray-400">© {currentYear}</span>
              <span className="text-primary-400 font-medium">cpbuildinghouse</span>
              <span className="text-gray-400">สงวนลิขสิทธิ์</span>
            </div>
            
            <div className="flex space-x-6">
              {socialLinks.map((social, index) => (
                <motion.a
                  key={index}
                  href={social.href}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  className="text-gray-400 hover:text-primary-400 transition-colors duration-300 font-medium"
                  aria-label={social.label}
                >
                  {social.label}
                </motion.a>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </footer>
  )
}

export default Footer 