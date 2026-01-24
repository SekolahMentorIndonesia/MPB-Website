// Base API URL configuration
export const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

// API endpoints
export const API_ENDPOINTS = {
  USER: {
    PROFILE: '/api/user/me',
    ENROLLMENT: '/api/user/enrollment',
    PAYMENT: '/api/user/payment',
  },
  ADMIN: {
    STATS: '/api/admin/stats',
    ENROLLMENTS: '/api/admin/enrollments',
    PAYMENTS: '/api/admin/payments',
  }
};

// Helper function to get full API URL
export const getApiUrl = (endpoint) => {
  return `${API_BASE_URL}${endpoint}`;
};
