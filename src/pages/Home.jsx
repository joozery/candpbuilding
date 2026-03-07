import React from 'react'
import { motion } from 'framer-motion'
import Hero from '../components/Hero'
import Services from '../components/Services'
import LatestWorks from '../components/LatestWorks'
import About from '../components/About'

const Home = () => {
  return (
    <div className="min-h-screen">
      <Hero />
      <Services />
      <LatestWorks />
      <About />
    </div>
  )
}

export default Home