import { API_BASE_URL } from '@/constants/env';
import { http, HttpResponse } from 'msw';

export const logout = http.post(`${API_BASE_URL}/auth/logout`, async () => {
  const result = {
    status: 'success',
    data: null,
    message: '성공적으로 로그아웃 되었습니다.',
  };

  return HttpResponse.json(result, { status: 200 });
});
