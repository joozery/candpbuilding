import React from 'react'
import { motion } from 'framer-motion'
import About from '../components/About'

const AboutPage = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header Section */}
      <div className="bg-gradient-to-r from-primary-600 to-primary-800 text-white pt-32 pb-20">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <h1 className="text-3xl md:text-4xl font-bold mb-3">เกี่ยวกับเรา</h1>
            <p className="text-primary-100 max-w-xl mx-auto">
              ผู้เชี่ยวชาญด้านการก่อสร้างที่คุณไว้วางใจได้
            </p>
          </motion.div>
        </div>
      </div>

      {/* About Component */}
      <div className="py-20">
        <About />
      </div>
    </div>
  )
}

export default AboutPage 