import React from 'react'
import { motion } from 'framer-motion'
import Hero from '../components/Hero'
import Services from '../components/Services'

const Home = () => {
  return (
    <div className="min-h-screen">
      <Hero />
      <Services />
    </div>
  )
}

export default Home 