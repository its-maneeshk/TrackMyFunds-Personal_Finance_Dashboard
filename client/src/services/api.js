import axios from 'axios';

const api = axios.create({
  // baseURL: 'http://localhost:5000/api', 
  baseURL: 'https://track-my-funds-personal-finance-das-rose.vercel.app/', 
  withCredentials: true, // if using cookies for auth
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;
