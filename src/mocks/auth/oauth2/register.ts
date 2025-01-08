import { API_BASE_URL } from '@/constants/env';
import { http, HttpResponse } from 'msw';

interface RequestBody {
  phoneNumber: string;
  sido: string;
  sgg: string;
  emd: string;
}

interface ResponseBody {
  status: string;
  data: null;
  message: string;
}

export const oauthRegister = http.post<any, RequestBody, ResponseBody>(
  `${API_BASE_URL}/auth/oauth2/register`,
  async ({ request }) => {
    const requestBody = await request.json();

    if (requestBody.phoneNumber === '01000000000') {
      const result = {
        status: 'failure',
        data: null,
        message: '유효하지 않은 사용자의 요청입니다.',
      };

      return HttpResponse.json(result, { status: 404 });
    }

    const result = {
      status: 'success',
      data: null,
      message: '회원가입이 완료되었습니다.',
    };

    return HttpResponse.json(result, { status: 201 });
  },
);
