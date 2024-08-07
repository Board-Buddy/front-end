import { API_BASE_URL } from '@/constants/env';
import { http, HttpResponse } from 'msw';

export const setRadius = http.put(`${API_BASE_URL}/api/my/radius`, async () => {
  const result = {
    status: 'success',
    data: null,
    message: '내 반경 설정을 성공하였습니다.',
  };

  return HttpResponse.json(result, { status: 200 });
});
