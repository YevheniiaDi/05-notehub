import axios from 'axios';

const token = import.meta.env.VITE_NOTEHUB_TOKEN;

const axiosInstance = axios.create({
  baseURL: import.meta.env.PROD
    ? 'https://your-backend-api-url.com/api' // ← сюди встав адресу твого бекенду
    : '/api', // локально працює через proxy
  headers: {
    ...(token && { Authorization: `Bearer ${token}` }),
  },
});

export default axiosInstance;