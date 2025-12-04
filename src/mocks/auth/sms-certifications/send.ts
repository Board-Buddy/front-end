import { createMockHandler } from '@/mocks';
import { HttpResponse } from 'msw';

export const smsCertificationSend = createMockHandler<null>({
  method: 'post',
  endpoint: 'auth/sms-certifications/send',
  handler: () => {
    return HttpResponse.json(
      {
        status: 'success',
        data: null,
        message: 'SMS 인증 번호가 성공적으로 발송되었습니다.',
      },
      { status: 200 },
    );
  },
});
