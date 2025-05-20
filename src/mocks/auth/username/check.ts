import { API_BASE_URL } from '@/services/endpoint';
import { http, HttpResponse } from 'msw';

interface RequestBody {
  nickname: string;
}

interface ResponseBody {
  status: string;
  data: null;
  message: string;
}

export const checkNickname = http.post<any, RequestBody, ResponseBody>(
  `${API_BASE_URL}/auth/username/check`,
  async ({ request }) => {
    const { nickname } = await request.json();

    if (nickname === 'nickname') {
      const result = {
        status: 'failure',
        data: null,
        message: '동일한 닉네임이 이미 존재합니다.',
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
