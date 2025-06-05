import { API_BASE_URL } from '@/services/endpoint';
import { http, HttpResponse } from 'msw';

export const status = http.get(`${API_BASE_URL}/auth/status`, () => {
  return HttpResponse.json({
    status: 'success',
    data: {
      profileDTO: {
        nickname: 'kong',
        sido: '서울특별시',
        sgg: '송파구',
        emd: '잠실동',
        isPhoneNumberVerified: true,
        profileImageS3SavedURL: null,
        memberType: 'SOCIAL',
      },
    },
    message: '유효한 세션입니다.',
  });
});
