
import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: '/api',
  headers: {
    Authorization: import.meta.env.VITE_NOTEHUB_TOKEN,
  },
});

export default axiosInstance;
