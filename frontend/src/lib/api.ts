import axios, { AxiosInstance, InternalAxiosRequestConfig } from 'axios';
import { getToken } from './auth';

// Create axios instance with base configuration
const api: AxiosInstance = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api',
    timeout: 10000,
    headers: {
        'Content-Type': 'application/json',
    },
});

// Request interceptor to add JWT token
api.interceptors.request.use(
    (config: InternalAxiosRequestConfig) => {
        const token = getToken();
        if (token && config.headers) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Response interceptor for error handling
api.interceptors.response.use(
    (response) => {
        return response;
    },
    (error) => {
        // Handle common errors
        if (error.response) {
            // Server responded with error status
            const { status, data } = error.response;

            if (status === 401) {
                // Unauthorized - clear token and redirect to login
                localStorage.removeItem('token');
                if (typeof window !== 'undefined') {
                    window.location.href = '/login';
                }
            } else if (status === 403) {
                console.error('Forbidden:', data.message);
            } else if (status === 404) {
                console.error('Not found:', data.message);
            } else if (status >= 500) {
                console.error('Server error:', data.message);
            }
        } else if (error.request) {
            // Request made but no response received
            console.error('Network error: No response from server');
        } else {
            // Error in request configuration
            console.error('Request error:', error.message);
        }

        return Promise.reject(error);
    }
);

export default api;
