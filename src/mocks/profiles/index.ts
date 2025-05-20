import { API_BASE_URL } from '@/services/endpoint';
import { getUserProfile } from './[nickname]';
import { http, HttpResponse } from 'msw';

const editProfile = http.put(
  `${API_BASE_URL}/profiles`,
  async ({ request }) => {
    const data = await request.formData();
    const profileInfo = data.get('UpdateProfileDTO');
    const image = data.get('profileImageFile');

    const result = {
      status: 'success',
      data: null,
      message: '프로필이 수정되었습니다.',
    };

    return HttpResponse.json(result, { status: 200 });
  },
);

export const profileHandlers = [getUserProfile, editProfile];
