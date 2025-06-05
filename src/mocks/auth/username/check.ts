import { API_BASE_URL } from '@/services/endpoint';
import { http, HttpResponse } from 'msw';

interface RequestBody {
  username: string;
}

interface ResponseBody {
  status: string;
  data: null;
  message: string;
}

export const checkUsername = http.post<any, RequestBody, ResponseBody>(
  `${API_BASE_URL}/auth/username/check`,
  async ({ request }) => {
    const { username } = await request.json();

    if (username === 'username') {
      const result = {
        status: 'failure',
        data: null,
        message: '동일한 아이디가 이미 존재합니다.',
      };
      return HttpResponse.json(result, { status: 409 });
    }

    const result = {
      status: 'success',
      data: null,
      message: '사용 가능한 닉네임 입니다.',
    };

    return HttpResponse.json(result, { status: 200 });
  },
);
