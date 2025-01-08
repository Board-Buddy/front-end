import { API_BASE_URL } from '@/constants/env';
import axios from 'axios';

const api = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true,
});

api.interceptors.response.use(
  (response) => response, // 성공적인 응답은 그대로 반환
  (error) => {
    // 네트워크 또는 CORS 에러
    if (!error.response) {
      return Promise.reject(new Error('네트워크 에러가 발생했습니다.'));
    }

    // 다른 서버 에러
    const { message } = error.response.data;

    return Promise.reject(
      new Error(message || '알 수 없는 에러가 발생했습니다.'),
    );
  },
);

export default api;
