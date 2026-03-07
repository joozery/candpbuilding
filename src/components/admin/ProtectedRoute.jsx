import React from 'react'
import { Navigate, useLocation } from 'react-router-dom'

export default function ProtectedRoute({ children }) {
    const location = useLocation()
    const token = localStorage.getItem('adminToken')

    if (!token) {
        // Redirect to login if not authenticated, keeping the attempted path in state
        return <Navigate to="/admin/login" state={{ from: location }} replace />
    }

    return children
}
