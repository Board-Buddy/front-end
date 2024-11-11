import { API_BASE_URL } from '@/constants/env';
import axios from 'axios';

const api = axios.create({
  baseURL: `${API_BASE_URL}/api`,
  withCredentials: true,
});

export default api;
