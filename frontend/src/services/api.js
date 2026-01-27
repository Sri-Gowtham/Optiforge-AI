import axios from 'axios';

const API_BASE_URL = '/api';

// Create axios instance
const api = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        'Content-Type': 'application/json'
    }
});

// Add auth token to requests
api.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

// Auth API
export const authAPI = {
    signup: (userData) => api.post('/auth/signup', userData),
    login: (credentials) => api.post('/auth/login', credentials),
    getCurrentUser: () => api.get('/auth/me')
};

// Projects API
export const projectsAPI = {
    getAll: () => api.get('/projects'),
    getOne: (id) => api.get(`/projects/${id}`),
    create: (formData) => api.post('/projects', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
    }),
    update: (id, data) => api.put(`/projects/${id}`, data),
    delete: (id) => api.delete(`/projects/${id}`),
    analyze: (id) => api.post(`/projects/${id}/analyze`),
    getStats: () => api.get('/projects/stats')
};

// Budget API
export const budgetAPI = {
    getSummary: () => api.get('/budget'),
    getProjectBudget: (projectId) => api.get(`/budget/${projectId}`)
};

// User API
export const userAPI = {
    updateProfile: (data) => api.put('/user/profile', data),
    changePassword: (data) => api.put('/user/password', data)
};

export default api;
