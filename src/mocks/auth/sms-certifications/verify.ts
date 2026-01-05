import { createMockHandler } from '@/mocks';
import { HttpResponse } from 'msw';
import z from 'zod';

const requestBodySchema = z.object({
  phoneNumber: z.string(),
  certificationNumber: z.string(),
});

export const smsCertificationVerify = createMockHandler<null>({
  method: 'post',
  endpoint: '/auth/sms-certifications/verify',
  handler: async ({ request }) => {
    const requestBody = await request.json();
    const { data } = requestBodySchema.safeParse(requestBody);

    if (!data) {
      return HttpResponse.json(
        {
          status: 'failure',
          data: null,
          message:
            '요청 본문이 잘못된 형식이거나 유효하지 않은 데이터를 포함하고 있습니다. 올바른 형식으로 요청을 다시 시도하세요.',
        },
        { status: 400 },
      );
    }

    if (data.certificationNumber === '1234') {
      return HttpResponse.json(
        {
          status: 'success',
          data: null,
          message: '입력하신 SMS 인증 번호가 일치합니다.',
        },
        { status: 200 },
      );
    }

    return HttpResponse.json(
      {
        status: 'failure',
        data: null,
        message: '입력하신 인증번호가 일치하지 않습니다.',
      },
      { status: 400 },
    );
  },
});
