import { API_BASE_URL } from '@/constants/env';
import axios from 'axios';

const api = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true,
});

api.interceptors.response.use(
  (response) => response, // 성공적인 응답은 그대로 반환
  (error) => {
    if (error.response) {
      // 서버 에러 메시지 추가 설정
      error.message =
        error.response?.data.message || '알 수 없는 에러가 발생했습니다.';
    } else {
      // 네트워크 에러
      error.message = '네트워크 에러가 발생했습니다.';
    }

    return Promise.reject(error);
  },
);

export default api;
