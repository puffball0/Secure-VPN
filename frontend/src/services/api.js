import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {'Content-Type': 'application/json'},
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export const authAPI = {
  login: (email, password, loginType) => api.post('/auth/login', {email, password, loginType}),
  signup: (name, email, password) => api.post('/auth/signup', {name, email, password}),
};

export const userAPI = {
  getDashboard: () => api.get('/user/dashboard'),
  connect: (server) => api.post('/user/connect', {server}),
  disconnect: () => api.post('/user/disconnect'),
};

export const adminAPI = {
  getDashboard: () => api.get('/admin/dashboard'),
};

export const serversAPI = {
  getList: () => api.get('/servers/list'),
};

export const settingsAPI = {
  get: () => api.get('/settings/get'),
  update: (settings) => api.post('/settings/update', settings),
};

export default api;