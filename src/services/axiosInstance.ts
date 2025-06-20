import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: import.meta.env.PROD
    ? 'https://notehub-public.goit.study/api'
    : '/api',
});

axiosInstance.interceptors.request.use((config) => {
  const token = import.meta.env.VITE_NOTEHUB_TOKEN;
  if (token && config.headers) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default axiosInstance;



