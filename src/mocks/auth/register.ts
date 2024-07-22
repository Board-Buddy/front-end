import { API_BASE_URL } from '@/constants/env';
import { http, HttpResponse } from 'msw';

export const register = http.post(
  `${API_BASE_URL}/api/auth/register`,
  async () => {
    const result = {
      status: 'success',
      data: null,
      message: '회원가입이 완료되었습니다.',
    };

    return HttpResponse.json(result, { status: 200 });
  },
);
