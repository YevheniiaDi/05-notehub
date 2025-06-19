import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: import.meta.env.PROD
    ? 'https://notehub-public.goit.study/api'
    : '/api',
});

export default axiosInstance;