import axios from 'axios';

const api = axios.create({
  baseURL: 'https://localhost:7297/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptor to add the auth token to every request
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

// --- Auth Endpoints ---
export const registerUser = (data: any) => {
  return api.post('/Auth/register', data);
};

export const loginUser = (data: any) => {
  return api.post('/Auth/login', data);
};

// --- Admin User Management Endpoints ---
export const getAllUsers = () => {
  return api.get('/AdminUser');
};

export const createUser = (data: any) => {
    return api.post('/AdminUser', data);
};

export const updateUser = (id: string, data: any) => {
    return api.put(`/AdminUser/${id}`, data);
};

export const deleteUser = (id: string) => {
    return api.delete(`/AdminUser/${id}`);
};

export default api; 