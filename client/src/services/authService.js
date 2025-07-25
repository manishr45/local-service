import axios from 'axios';

const API_URL = '/api/auth/';

// Create axios instance with default config
const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add request interceptor to include token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Add response interceptor to handle token expiration
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Token expired or invalid
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// Register user
const register = async (userData) => {
  const response = await api.post('register/user', userData);

  if (response.data) {
    localStorage.setItem('user', JSON.stringify(response.data.user));
    localStorage.setItem('token', response.data.token);
  }

  return response.data;
};

// Register vendor
const registerVendor = async (vendorData) => {
  const response = await api.post('register/vendor', vendorData);

  if (response.data) {
    localStorage.setItem('user', JSON.stringify(response.data.vendor));
    localStorage.setItem('token', response.data.token);
  }

  return response.data;
};

// Login user
const login = async (userData) => {
  const response = await api.post('login', userData);

  if (response.data) {
    localStorage.setItem('user', JSON.stringify(response.data.user));
    localStorage.setItem('token', response.data.token);
  }

  return response.data;
};

// Logout user
const logout = () => {
  localStorage.removeItem('user');
  localStorage.removeItem('token');
  return api.post('logout');
};

// Get current user profile
const getProfile = async () => {
  const response = await api.get('me');
  
  if (response.data) {
    localStorage.setItem('user', JSON.stringify(response.data.user));
  }
  
  return response.data;
};

// Change password
const changePassword = async (passwordData) => {
  const response = await api.post('change-password', passwordData);
  return response.data;
};

// Get current user from localStorage
const getCurrentUser = () => {
  return JSON.parse(localStorage.getItem('user'));
};

// Get current token from localStorage
const getCurrentToken = () => {
  return localStorage.getItem('token');
};

// Check if user is authenticated
const isAuthenticated = () => {
  const token = getCurrentToken();
  const user = getCurrentUser();
  return !!(token && user);
};

// Check user role
const hasRole = (role) => {
  const user = getCurrentUser();
  return user && user.role === role;
};

// Check if user has any of the specified roles
const hasAnyRole = (roles) => {
  const user = getCurrentUser();
  return user && roles.includes(user.role);
};

const authService = {
  register,
  registerVendor,
  login,
  logout,
  getProfile,
  changePassword,
  getCurrentUser,
  getCurrentToken,
  isAuthenticated,
  hasRole,
  hasAnyRole,
};

export default authService;