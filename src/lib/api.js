import axios from 'axios';

// Create an Axios instance using the base URL from our environment variables.
// If not provided, fallback to the default backend URL (localhost:5000/api)
const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptor to automatically attach the JWT token to requests if the user is logged in
api.interceptors.request.use(
  (config) => {
    // Check if we are running in the browser
    if (typeof window !== 'undefined') {
      const token = localStorage.getItem('token');
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default api;

// ==========================================
// Example Auth API Services
// ==========================================
export const authService = {
  login: async (email, password) => {
    const response = await api.post('/auth/login', { email, password });
    return response.data;
  },
  register: async (userData) => {
    const response = await api.post('/auth/register', userData);
    return response.data;
  },
  getProfile: async () => {
    const response = await api.get('/auth/profile');
    return response.data;
  },
};

// ==========================================
// Example Products API Services
// ==========================================
export const productService = {
  getProducts: async () => {
    const response = await api.get('/products');
    return response.data;
  },
  getProductById: async (id) => {
    const response = await api.get(`/products/${id}`);
    return response.data;
  },
};

// ==========================================
// Example Features API Services
// ==========================================
export const featureService = {
  getFeatures: async (params = {}) => {
    const queryStr = new URLSearchParams(params).toString();
    const endpoint = queryStr ? `/features?${queryStr}` : '/features';
    const response = await api.get(endpoint);
    return response.data;
  },
  getFeatureBySlug: async (slug) => {
    const response = await api.get(`/features/${slug}`);
    return response.data;
  },
};

// ==========================================
// Pricing Page API Services
// ==========================================
export const pricingService = {
  getPricingContent: async () => {
    const response = await api.get('/pricing');
    return response.data;
  },
};
