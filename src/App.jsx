import React from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import Layout from './components/Layout'
import AdminLayout from './components/admin/AdminLayout'
import ProtectedRoute from './components/admin/ProtectedRoute'
import Home from './pages/Home'
import ServicesPage from './pages/ServicesPage'
import PortfolioPage from './pages/Portfolio'
import GalleryPage from './pages/Gallery'
import AboutPage from './pages/About'
import ArticlesPage from './pages/Articles'
import ContactPage from './pages/Contact'
import ArticleDetail from './pages/ArticleDetail'
import PortfolioDetail from './pages/PortfolioDetail'

// Admin Pages
import AdminLogin from './pages/admin/Login'
import AdminDashboard from './pages/admin/Dashboard'
import AdminArticles from './pages/admin/Articles'
import AdminPortfolio from './pages/admin/Portfolio'
import AdminGallery from './pages/admin/Gallery'
import AdminSettings from './pages/admin/Settings'
import AdminInquiries from './pages/admin/Inquiries'
import AdminUsers from './pages/admin/Users'

function App() {
  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Layout><Home /></Layout>} />
        <Route path="/services" element={<Layout><ServicesPage /></Layout>} />
        <Route path="/portfolio" element={<Layout><PortfolioPage /></Layout>} />
        <Route path="/portfolio/:id" element={<Layout><PortfolioDetail /></Layout>} />
        <Route path="/gallery" element={<Layout><GalleryPage /></Layout>} />
        <Route path="/about" element={<Layout><AboutPage /></Layout>} />
        <Route path="/articles" element={<Layout><ArticlesPage /></Layout>} />
        <Route path="/articles/:id" element={<Layout><ArticleDetail /></Layout>} />
        <Route path="/contact" element={<Layout><ContactPage /></Layout>} />

        {/* Admin Public Routes */}
        <Route path="/admin/login" element={<AdminLogin />} />

        {/* Admin Protected Routes */}
        <Route path="/admin" element={<ProtectedRoute><AdminLayout><AdminDashboard /></AdminLayout></ProtectedRoute>} />
        <Route path="/admin/articles" element={<ProtectedRoute><AdminLayout><AdminArticles /></AdminLayout></ProtectedRoute>} />
        <Route path="/admin/portfolio" element={<ProtectedRoute><AdminLayout><AdminPortfolio /></AdminLayout></ProtectedRoute>} />
        <Route path="/admin/gallery" element={<ProtectedRoute><AdminLayout><AdminGallery /></AdminLayout></ProtectedRoute>} />
        <Route path="/admin/settings" element={<ProtectedRoute><AdminLayout><AdminSettings /></AdminLayout></ProtectedRoute>} />
        <Route path="/admin/inquiries" element={<ProtectedRoute><AdminLayout><AdminInquiries /></AdminLayout></ProtectedRoute>} />
        <Route path="/admin/users" element={<ProtectedRoute><AdminLayout><AdminUsers /></AdminLayout></ProtectedRoute>} />

        {/* Helper Redirects */}
        <Route path="/admin/dashboard" element={<Navigate to="/admin" replace />} />
      </Routes>
    </Router>
  )
}

export default App