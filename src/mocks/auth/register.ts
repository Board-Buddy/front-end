import { API_BASE_URL } from '@/services/endpoint';
import { http, HttpResponse } from 'msw';

interface RequestBody {
  username: string;
  password: string;
  nickname: string;
  phoneNumber: string;
}

interface ResponseBody {
  status: string;
  data: null;
  message: string;
}

export const register = http.post<any, RequestBody, ResponseBody>(
  `${API_BASE_URL}/auth/register`,
  async ({ request }) => {
    const requestBody = await request.json();

    if (requestBody.username === 'failure') {
      const result = {
        status: 'error',
        data: null,
        message:
          '서버 문제로 회원가입에 실패하였습니다. 관리자에게 문의하세요.',
      };

      return HttpResponse.json(result, { status: 500 });
    }

    const result = {
      status: 'success',
      data: null,
      message: '회원가입이 완료되었습니다.',
    };

    return HttpResponse.json(result, { status: 200 });
  },
);
