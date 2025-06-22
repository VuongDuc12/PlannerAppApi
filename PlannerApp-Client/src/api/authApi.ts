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

// --- Course Management Endpoints ---
export const getAllCourses = (pagination?: any) => {
  const params = pagination ? `?pageNumber=${pagination.pageNumber}&pageSize=${pagination.pageSize}` : '';
  return api.get(`/Course/paged${params}`);
};

export const getCourseById = (id: number) => {
  return api.get(`/Course/${id}`);
};

export const createCourse = (data: any) => {
  return api.post('/Course', data);
};

export const updateCourse = (id: number, data: any) => {
  return api.put(`/Course/${id}`, data);
};

export const deleteCourse = (id: number) => {
  return api.delete(`/Course/${id}`);
};

// --- Course Topic Management Endpoints ---
export const getAllCourseTopics = (pagination?: any) => {
  const params = pagination ? `?pageNumber=${pagination.pageNumber}&pageSize=${pagination.pageSize}` : '';
  return api.get(`/CourseTopic/paged${params}`);
};

export const getCourseTopicById = (id: number) => {
  return api.get(`/CourseTopic/${id}`);
};

export const createCourseTopic = (data: any) => {
  return api.post('/CourseTopic', data);
};

export const updateCourseTopic = (id: number, data: any) => {
  return api.put(`/CourseTopic/${id}`, data);
};

export const deleteCourseTopic = (id: number) => {
  return api.delete(`/CourseTopic/${id}`);
}; 