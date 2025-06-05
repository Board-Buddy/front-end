import axios, { AxiosError } from 'axios';
import { isErrorResponse, CustomAxiosError } from '@/types/api';
import { API_BASE_URL } from './endpoint';

const api = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true,
});

api.interceptors.response.use(
  (response) => response, // 성공적인 응답은 그대로 반환
  (error: AxiosError) => {
    if (error.response) {
      const { data } = error.response;

      if (isErrorResponse(data)) {
        // 서버에서 내려준 CustomError 타입인 경우
        return Promise.reject(
          new CustomAxiosError(error, 'business error', data.message),
        );
      }

      // 서버가 응답을 보냈으나, CustomError 타입이 아닌 경우
      return Promise.reject(
        new CustomAxiosError(
          error,
          'unexpected error',
          '예상치 못한 오류가 발생했습니다. 관리자에게 문의해 주세요.',
        ),
      );
    }

    if (error.request) {
      return Promise.reject(
        new CustomAxiosError(
          error,
          'server error',
          '서버가 응답하지 않습니다. 나중에 다시 시도해주세요.',
        ),
      );
    }

    // 요청 자체가 이루어지지 않은 경우(네트워크 오류 등)
    return Promise.reject(
      new CustomAxiosError(
        error,
        'network error',
        '인터넷 연결을 확인해주세요.',
      ),
    );
  },
);

export default api;
