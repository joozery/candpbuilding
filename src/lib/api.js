/**
 * API helper สำหรับ frontend
 * ใช้ใน React component ดึงข้อมูลจาก backend
 */

const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api'

// ---- Generic fetch ---- //
async function apiFetch(path, options = {}) {
    const res = await fetch(`${BASE_URL}${path}`, {
        headers: { 'Content-Type': 'application/json', ...options.headers },
        ...options,
    })
    const data = await res.json()
    if (!res.ok) throw new Error(data.message || 'API Error')
    return data
}

// ===================== ARTICLES ===================== //
export const articlesApi = {
    getAll: (params = {}) => apiFetch('/articles?' + new URLSearchParams(params)),
    getById: (id) => apiFetch(`/articles/${id}`),
    create: (formData) => fetch(`${BASE_URL}/articles`, { method: 'POST', body: formData }).then(r => r.json()),
    update: (id, formData) => fetch(`${BASE_URL}/articles/${id}`, { method: 'PUT', body: formData }).then(r => r.json()),
    delete: (id) => apiFetch(`/articles/${id}`, { method: 'DELETE' }),
}

// ===================== PORTFOLIO ===================== //
export const portfolioApi = {
    getAll: (params = {}) => apiFetch('/portfolio?' + new URLSearchParams(params)),
    getById: (id) => apiFetch(`/portfolio/${id}`),
    create: (formData) => fetch(`${BASE_URL}/portfolio`, { method: 'POST', body: formData }).then(r => r.json()),
    update: (id, formData) => fetch(`${BASE_URL}/portfolio/${id}`, { method: 'PUT', body: formData }).then(r => r.json()),
    delete: (id) => apiFetch(`/portfolio/${id}`, { method: 'DELETE' }),
}

// ===================== GALLERY ===================== //
export const galleryApi = {
    getAll: (params = {}) => apiFetch('/gallery?' + new URLSearchParams(params)),
    upload: (formData) => fetch(`${BASE_URL}/gallery`, { method: 'POST', body: formData }).then(r => r.json()),
    delete: (id) => apiFetch(`/gallery/${id}`, { method: 'DELETE' }),
    deleteBulk: (ids) => apiFetch('/gallery', { method: 'DELETE', body: JSON.stringify({ ids }) }),
}

// ===================== UPLOAD ===================== //
export const uploadApi = {
    image: (file, folder = 'general') => {
        const fd = new FormData()
        fd.append('image', file)
        return fetch(`${BASE_URL}/upload/image?folder=${folder}`, { method: 'POST', body: fd }).then(r => r.json())
    },
    images: (files, folder = 'gallery') => {
        const fd = new FormData()
        files.forEach(f => fd.append('images', f))
        return fetch(`${BASE_URL}/upload/images?folder=${folder}`, { method: 'POST', body: fd }).then(r => r.json())
    },
    deleteImage: (publicId) => apiFetch('/upload/image', { method: 'DELETE', body: JSON.stringify({ publicId }) }),
}

// ===================== CONTACTS ===================== //
export const contactsApi = {
    submit: (data) => apiFetch('/contacts', { method: 'POST', body: JSON.stringify(data) }),
    getAll: () => apiFetch('/contacts'),
    delete: (id) => apiFetch(`/contacts/${id}`, { method: 'DELETE' }),
    updateStatus: (id, status) => apiFetch(`/contacts/${id}`, { method: 'PATCH', body: JSON.stringify({ status }) }),
}

// ===================== AUTH & USERS ===================== //
export const authApi = {
    login: (credentials) => apiFetch('/auth/login', { method: 'POST', body: JSON.stringify(credentials) }),
    registerInitial: (data) => apiFetch('/auth/register-initial', { method: 'POST', body: JSON.stringify(data) }),
}

export const usersApi = {
    getAll: () => apiFetch('/users'),
    create: (data) => apiFetch('/users', { method: 'POST', body: JSON.stringify(data) }),
    delete: (id) => apiFetch(`/users/${id}`, { method: 'DELETE' }),
}

// ===================== SETTINGS ===================== //
export const settingsApi = {
    get: () => apiFetch('/settings'),
    update: (data) => apiFetch('/settings', { method: 'PUT', body: JSON.stringify(data) }),
}
