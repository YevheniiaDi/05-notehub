import axios from 'axios';

const token = import.meta.env.VITE_NOTEHUB_TOKEN;

const axiosInstance = axios.create({
  baseURL: '/api',
  headers: {
    ...(token && { Authorization: `Bearer ${token}` }),
  },
});

export default axiosInstance;
