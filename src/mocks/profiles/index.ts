import { http, HttpResponse } from 'msw';
import { API_BASE_URL } from '@/constants/env';
import { getUserProfile } from './[nickname]';

const editProfile = http.put(`${API_BASE_URL}/api/profiles`, async () => {
  const result = {
    status: 'success',
    data: null,
    message: '프로필이 수정되었습니다.',
  };

  return HttpResponse.json(result, { status: 200 });
});

export const profileHandlers = [getUserProfile, editProfile];
