import { API_BASE_URL } from '@/constants/env';
import { http, HttpResponse } from 'msw';

export const login = http.post(`${API_BASE_URL}/api/auth/login`, async () => {
  console.log('로그인 요청');

  const result = {
    data: {
      nickname: 'kong',
      sido: '서울특별시',
      sigu: '잠실구',
      dong: '잠실동',
      isPhoneNumberVerified: true,
      awsS3SavedFileURL: null,
    },
    message: '세션이 유효합니다.',
  };

  return HttpResponse.json(result, { status: 200 });
});
