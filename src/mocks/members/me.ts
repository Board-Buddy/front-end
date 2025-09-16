import { API_BASE_URL } from '@/services/endpoint';
import { http, HttpResponse } from 'msw';

export const getUserInfo = http.get(`${API_BASE_URL}/members/me`, () => {
  const result = {
    status: 'success',
    data: {
      memberInfo: {
        nickname: 'kong',
        isPhoneNumberVerified: true,
        memberType: 'REGULAR',
        profileImageSignedURL: null,
      },
    },
    message: '유저 정보를 성공적으로 조회 했습니다.',
  };

  return HttpResponse.json(result, { status: 200 });
});
