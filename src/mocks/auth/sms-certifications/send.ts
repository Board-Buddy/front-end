import { API_BASE_URL } from '@/constants/env';
import { http, HttpResponse } from 'msw';

export const smsCertificationSend = http.post(
  `${API_BASE_URL}/auth/sms-certifications/send`,
  async () => {
    const result = {
      status: 'success',
      data: null,
      message: 'SMS 인증 번호가 성공적으로 발송되었습니다.',
    };

    return HttpResponse.json(result, { status: 200 });
  },
);
