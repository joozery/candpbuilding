import React from 'react'
import { ChevronDown } from 'lucide-react'
import { motion } from 'framer-motion'
import heroBg from '../assets/herobg.jpg'

const Hero = () => {

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
        delayChildren: 0.5
      }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut"
      }
    }
  }

  return (
    <section 
      id="hero" 
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
      style={{
        backgroundImage: `url(${heroBg})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat'
      }}
    >
      {/* Background Overlay for better text readability */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-black/70"></div>
      
      {/* Geometric Background Pattern */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-20 left-20 w-32 h-32 border-l-4 border-t-4 border-gray-300 transform rotate-45"></div>
        <div className="absolute top-40 right-32 w-24 h-24 border-r-4 border-b-4 border-gray-400 transform -rotate-12"></div>
        <div className="absolute bottom-32 left-1/4 w-20 h-20 border border-gray-300 transform rotate-12"></div>
        <div className="absolute top-1/3 right-1/4 w-16 h-16 border-2 border-gray-400 transform rotate-45"></div>
      </div>
      
             {/* Main Geometric Shapes - adjusted for background image */}
       <div className="absolute right-0 top-0 w-1/2 h-full overflow-hidden">
         {/* Large Gold Shape */}
         <motion.div 
           initial={{ x: 100, opacity: 0 }}
           animate={{ x: 0, opacity: 0.6 }}
           transition={{ duration: 1.2, delay: 0.3 }}
           className="absolute -right-32 top-1/4 w-96 h-96 bg-gradient-to-br from-primary-400/80 to-primary-700/80 transform rotate-45 backdrop-blur-sm"
         ></motion.div>
         {/* Secondary Shape */}
         <motion.div 
           initial={{ x: 150, opacity: 0 }}
           animate={{ x: 0, opacity: 0.5 }}
           transition={{ duration: 1.4, delay: 0.6 }}
           className="absolute -right-16 top-1/2 w-64 h-64 bg-gradient-to-br from-primary-500/70 to-primary-600/70 transform rotate-12 backdrop-blur-sm"
         ></motion.div>
         {/* Small Accent Shape */}
         <motion.div 
           initial={{ x: 80, opacity: 0 }}
           animate={{ x: 0, opacity: 0.6 }}
           transition={{ duration: 1, delay: 0.9 }}
           className="absolute right-24 top-1/3 w-32 h-32 bg-primary-400/70 transform -rotate-12 backdrop-blur-sm"
         ></motion.div>
       </div>

      {/* Content */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="relative z-10 text-left text-white px-4 max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 items-center gap-12"
      >
        {/* Left Content */}
        <div className="space-y-8">
          <motion.h1 
            variants={itemVariants}
            className="text-4xl md:text-6xl lg:text-7xl font-bold leading-tight"
          >
            สร้าง<span className="text-primary-400">อาคาร</span>
            <br />
            ที่คุณต้องการ
            <br />
            <span className="text-primary-400">ให้เป็นจริง</span>
          </motion.h1>
          
          <motion.p 
            variants={itemVariants}
            className="text-lg md:text-xl leading-relaxed text-gray-300 max-w-lg"
          >
            C&P Building Houses คือผู้เชี่ยวชาญด้านการก่อสร้างและสถาปัตยกรรม 
            ที่มีความรับผิดชิดเป็นมิตรกับสิ่งแวดล้อมมากที่สุดสำหรับทุกรูปแบบโครงการ
          </motion.p>
          
          <motion.div 
            variants={itemVariants}
            className="flex flex-col sm:flex-row gap-6"
          >
            <button 
              onClick={() => scrollToSection('contact')}
              className="group relative bg-primary-500 hover:bg-primary-600 text-white font-semibold px-8 py-4 text-lg flex items-center justify-center transition-all duration-300 transform hover:scale-105 shadow-lg shadow-primary-500/30"
              style={{
                clipPath: 'polygon(0 0, calc(100% - 20px) 0, 100% 100%, 0 100%)'
              }}
            >
              เริ่มปรึกษา
              <span className="ml-2 text-xl">→</span>
            </button>
            
            <button 
              onClick={() => scrollToSection('portfolio')}
              className="border-2 border-white text-white hover:bg-white hover:text-slate-900 font-semibold px-8 py-4 text-lg transition-all duration-300"
            >
              ดูผลงาน
            </button>
          </motion.div>
        </div>

        {/* Statistics Cards */}
        <div className="lg:hidden mt-12">
          <motion.div 
            variants={itemVariants}
            className="grid grid-cols-3 gap-4"
          >
            <div className="bg-white/10 backdrop-blur-sm p-4 rounded-lg border border-primary-400/30 text-center">
              <div className="text-2xl font-bold text-primary-400 mb-1">15+</div>
              <div className="text-gray-300 text-sm">ปีประสบการณ์</div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm p-4 rounded-lg border border-primary-400/30 text-center">
              <div className="text-2xl font-bold text-primary-400 mb-1">500+</div>
              <div className="text-gray-300 text-sm">โครงการสำเร็จ</div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm p-4 rounded-lg border border-primary-400/30 text-center">
              <div className="text-2xl font-bold text-primary-400 mb-1">100%</div>
              <div className="text-gray-300 text-sm">ความพึงพอใจ</div>
            </div>
          </motion.div>
        </div>

        {/* Right Side - Desktop Statistics */}
        <div className="hidden lg:block">
          <motion.div 
            variants={itemVariants}
            className="space-y-6"
          >
            <div className="bg-white/10 backdrop-blur-sm p-6 rounded-lg border border-primary-400/30">
              <div className="text-3xl font-bold text-primary-400 mb-2">15+</div>
              <div className="text-gray-300">ปีประสบการณ์</div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm p-6 rounded-lg border border-primary-400/30">
              <div className="text-3xl font-bold text-primary-400 mb-2">500+</div>
              <div className="text-gray-300">โครงการสำเร็จ</div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm p-6 rounded-lg border border-primary-400/30">
              <div className="text-3xl font-bold text-primary-400 mb-2">100%</div>
              <div className="text-gray-300">ความพึงพอใจ</div>
            </div>
          </motion.div>
        </div>
      </motion.div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 2, duration: 0.8 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 cursor-pointer group"
        onClick={() => scrollToSection('services')}
      >
        <div className="flex items-center space-x-2 text-white hover:text-primary-400 transition-colors duration-300">
          <div className="w-8 h-12 border-2 border-current rounded-full flex justify-center relative">
            <div className="w-1 h-3 bg-current rounded-full absolute top-2 animate-bounce"></div>
          </div>
          <span className="text-sm font-medium">เลื่อนลงเพื่อดูเพิ่มเติม</span>
        </div>
      </motion.div>
    </section>
  )
}

export default Hero 