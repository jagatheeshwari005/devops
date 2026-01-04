import axios from 'axios';

const API_URL = 'http://localhost:5000/api'; // Adjust port if needed

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to add token
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
}, (error) => Promise.reject(error));

export const googleLogin = (token) => api.post('/auth/google', { token });
export const getProducts = () => api.get('/products');
export const addProduct = (product) => api.post('/products/add', product);

// Placeholder endpoints (need backend implementation if not mocked in context)
export const getDashboardStats = () => api.get('/dashboard/stats');
export const deleteProduct = (id) => api.delete(`/products/${id}`);
export const addPurchase = (purchaseData) => api.post('/purchases', purchaseData);
export const addSale = (saleData) => api.post('/sales', saleData);
export const getInventory = () => api.get('/inventory');

export default api;
