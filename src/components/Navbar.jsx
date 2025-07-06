import React, { useState, useEffect } from 'react'
import { Menu, X } from 'lucide-react'
import { Link, useLocation } from 'react-router-dom'
import logo from '../assets/logo.png'

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const location = useLocation()

  const navItems = [
    { label: 'หน้าแรก', path: '/' },
    { label: 'บริการ', path: '/services' },
    { label: 'ผลงาน', path: '/portfolio' },
    { label: 'เกี่ยวกับเรา', path: '/about' },
    { label: 'บทความ', path: '/articles' },
    { label: 'ติดต่อ', path: '/contact' }
  ]

  return (
    <nav className={`fixed w-full z-50 transition-all duration-300 ${
      isScrolled ? 'bg-white/95 backdrop-blur-md shadow-lg' : 'bg-white/90 backdrop-blur-md'
    }`}>
      <div className="container-custom">
        <div className="flex items-center justify-between py-4">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-3 cursor-pointer">
            <img 
              src={logo} 
              alt="C&P Building Houses Logo" 
              className="w-12 h-12 object-contain hover:scale-105 transition-transform duration-300"
            />
            <div className="flex flex-col">
              <h2 className="text-xl font-bold text-secondary-800 hover:text-primary-600 transition-colors duration-300">
                C&P Building Houses
              </h2>
              <span className="text-xs text-secondary-600 font-light">
                บริษัท ซีแอนด์พี บิลดิ้งเฮ้าส์ จำกัด
              </span>
            </div>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`text-secondary-700 hover:text-primary-600 transition-colors font-medium relative group ${
                  location.pathname === item.path ? 'text-primary-600' : ''
                }`}
              >
                {item.label}
                <span className={`absolute bottom-0 left-0 h-0.5 bg-primary-600 transition-all duration-300 group-hover:w-full ${
                  location.pathname === item.path ? 'w-full' : 'w-0'
                }`}></span>
              </Link>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 rounded-lg hover:bg-secondary-100 transition-colors"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden absolute top-full left-0 w-full bg-white shadow-lg border-t">
            <div className="py-4 space-y-2">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={() => setIsMenuOpen(false)}
                  className={`block w-full text-left px-6 py-3 text-secondary-700 hover:text-primary-600 hover:bg-secondary-50 transition-colors ${
                    location.pathname === item.path ? 'text-primary-600 bg-secondary-50' : ''
                  }`}
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}

export default Navbar 