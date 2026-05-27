import axios from 'axios';

const BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

// Primary API instance (attaches access token)
const api = axios.create({
  baseURL: BASE_URL,
  headers: { 'Content-Type': 'application/json' },
  withCredentials: true, // allow cookies for refresh endpoint when needed
});

// Dedicated instance for refresh calls (no auth header attached)
const refreshApi = axios.create({ baseURL: BASE_URL, withCredentials: true });

let isRefreshing = false;
let failedQueue = [];

const processQueue = (error, token = null) => {
  failedQueue.forEach((prom) => {
    if (error) prom.reject(error);
    else prom.resolve(token);
  });
  failedQueue = [];
};

// Request interceptor: attach access token from localStorage (or memory)
api.interceptors.request.use(
  (config) => {
    if (typeof window !== 'undefined') {
      const accessToken = localStorage.getItem('accessToken');
      if (accessToken) config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor: try to refresh when 401 is encountered
api.interceptors.response.use(
  (res) => res,
  async (err) => {
    const originalRequest = err.config;
    if (err.response && err.response.status === 401 && !originalRequest._retry) {
      if (isRefreshing) {
        return new Promise(function (resolve, reject) {
          failedQueue.push({ resolve, reject });
        })
          .then((token) => {
            originalRequest.headers.Authorization = 'Bearer ' + token;
            return axios(originalRequest);
          })
          .catch((e) => Promise.reject(e));
      }

      originalRequest._retry = true;
      isRefreshing = true;

      try {
        const refreshRes = await refreshApi.post('/auth/refresh');
        const newToken = refreshRes?.data?.data?.token;
        if (newToken) {
          localStorage.setItem('accessToken', newToken);
          api.defaults.headers.common.Authorization = `Bearer ${newToken}`;
          processQueue(null, newToken);
          return api(originalRequest);
        }
        processQueue(new Error('No token in refresh response'), null);
        return Promise.reject(err);
      } catch (refreshError) {
        processQueue(refreshError, null);
        // Clear stored token and redirect to login in app-level code if needed
        localStorage.removeItem('accessToken');
        return Promise.reject(refreshError);
      } finally {
        isRefreshing = false;
      }
    }
    return Promise.reject(err);
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
  getGeoData: async () => {
    const params = {};
    if (typeof window !== 'undefined') {
      const searchParams = new URLSearchParams(window.location.search);
      const country = searchParams.get('country');
      const currency = searchParams.get('currency');
      if (country) params.country = country;
      if (currency) params.currency = currency;
    }

    // Primary source: backend geo endpoint (supports edge headers in production).
    try {
      const response = await api.get('/geo', { params });
      return response.data?.data || response.data || null;
    } catch (error) {
      // Ignore and continue to fallback providers.
    }

    try {
      const response = await axios.get('https://ipapi.co/json/');
      return response.data || null;
    } catch (error) {
      // Ignore and continue to fallback providers.
    }

    try {
      const response = await axios.get('https://ipwho.is/');
      if (response.data && response.data.success !== false) {
        return {
          country_code: response.data.country_code,
          country_name: response.data.country,
          currency: response.data.currency_code,
        };
      }
      return null;
    } catch (error) {
      return null;
    }
  },
};

// ==========================================
// Home Page Content API Services
// ==========================================
export const homeContentService = {
  getHomeContent: async () => {
    const response = await api.get('/home-content');
    return response.data;
  },
};
