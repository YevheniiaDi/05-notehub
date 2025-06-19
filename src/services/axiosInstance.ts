import axios from 'axios';

const token = import.meta.env.VITE_NOTEHUB_TOKEN;

const axiosInstance = axios.create({
  baseURL: import.meta.env.PROD
    ? 'https://notehub-public.goit.study/api'
    : '/api',
  headers: {
    Authorization: `Bearer ${token}`,
  },
});

export default axiosInstance;