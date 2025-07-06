import React from 'react'
import Navbar from './Navbar'
import Footer from './Footer'
import BackToTop from './BackToTop'

const Layout = ({ children }) => {
  return (
    <div className="min-h-screen">
      <Navbar />
      <main>
        {children}
      </main>
      <Footer />
      <BackToTop />
    </div>
  )
}

export default Layout 