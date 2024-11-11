import axios from 'axios';

const api = axios.create({
  baseURL: 'https://temporary-api-url.com',
  withCredentials: true,
});

export default api;
