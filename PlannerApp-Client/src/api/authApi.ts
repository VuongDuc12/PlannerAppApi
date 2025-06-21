import axios from 'axios';

const api = axios.create({
  baseURL: 'https://localhost:7297/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

export const registerUser = (data: any) => {
  return api.post('/Auth/register', data);
};

export const loginUser = (data: any) => {
  return api.post('/Auth/login', data);
};

export default api; 