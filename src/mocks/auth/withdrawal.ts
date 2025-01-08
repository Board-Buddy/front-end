import { API_BASE_URL } from '@/constants/env';
import { http, HttpResponse } from 'msw';

export const withdrawal = http.post(
  `${API_BASE_URL}/auth/withdrawal`,
  async () => {
    const result = {
      status: 'success',
      data: null,
      message: '회원탈퇴가 완료되었습니다.',
    };

    return HttpResponse.json(result, { status: 200 });
  },
);
