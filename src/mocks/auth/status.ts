import { API_BASE_URL } from '@/constants/env';
import { http, HttpResponse } from 'msw';

export const status = http.get(`${API_BASE_URL}/api/auth/status`, () => {
  console.log('Captured a "GET /api/auth/status" request');

  return HttpResponse.json({
    data: {
      userInfo: {
        username: 'username',
        nickname: 'kong',
        profileURL: '/uploadFiles/68d1ff37-c6d4-4619-a602-cb5e55fd3dff.png',
      },
      message: '세션이 유효합니다.',
    },
  });
});
