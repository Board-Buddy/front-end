import { API_BASE_URL } from '@/constants/env';
import { http, HttpResponse } from 'msw';

export const status = http.get(`${API_BASE_URL}/api/auth/status`, () => {
  return HttpResponse.json({
    status: 'success',
    data: {
      profileDTO: {
        nickname: 'kong',
        sido: '서울특별시',
        sigu: '송파구',
        dong: '잠실동',
        isPhoneNumberVerified: true,
        profileImageS3SavedURL: null,
      },
    },
    message: '유효한 세션입니다.',
  });
});
