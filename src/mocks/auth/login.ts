import { API_BASE_URL } from '@/constants/env';
import { http, HttpResponse } from 'msw';

export const login = http.post(`${API_BASE_URL}/api/auth/login`, async () => {
  const result = {
    data: {
      nickname: 'kong',
      sido: '서울특별시',
      sigu: '송파구',
      dong: '잠실동',
      isPhoneNumberVerified: true,
      awsS3SavedFileURL: null,
    },
    message: '세션이 유효합니다.',
  };

  return HttpResponse.json(result, { status: 200 });
});
