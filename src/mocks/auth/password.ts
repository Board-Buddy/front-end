import { API_BASE_URL } from '@/constants/env';
import { http, HttpResponse } from 'msw';

interface RequestBody {
  password: string;
}

export const passwordCheck = http.post<any, RequestBody>(
  `${API_BASE_URL}/api/auth/password`,
  async ({ request }) => {
    const { password } = await request.json();

    if (password === 'asdf') {
      return HttpResponse.json(
        {
          status: 'failure',
          data: false,
          message: '입력하신 비밀번호가 올바르지 않습니다.',
        },
        { status: 400 },
      );
    }

    return HttpResponse.json(
      {
        status: 'success',
        data: true,
        message: '유효한 세션입니다.',
      },
      { status: 200 },
    );
  },
);
