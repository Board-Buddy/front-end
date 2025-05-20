import { API_BASE_URL } from '@/services/endpoint';
import { http, HttpResponse } from 'msw';

interface RequestBody {
  phoneNumber: string;
  certificationNumber: string;
}

interface ResponseBody {
  status: string;
  data: boolean | null;
  message: string;
}

export const smsCertificationVerify = http.post<any, RequestBody, ResponseBody>(
  `${API_BASE_URL}/auth/sms-certifications/verify`,
  async ({ request }) => {
    const { certificationNumber } = await request.json();

    if (certificationNumber === '1234') {
      const result = {
        status: 'success',
        data: true,
        message: '입력하신 SMS 인증 번호가 일치합니다.',
      };

      return HttpResponse.json(result, { status: 200 });
    }

    const result = {
      status: 'failure',
      data: null,
      message: '입력하신 인증번호가 일치하지 않습니다.',
    };

    return HttpResponse.json(result, { status: 400 });
  },
);
