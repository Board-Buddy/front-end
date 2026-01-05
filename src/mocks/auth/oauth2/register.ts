import { createMockHandler } from '@/mocks';
import { HttpResponse } from 'msw';
import z from 'zod';

const RequestBodySchema = z.object({
  phoneNumber: z.string(),
});

export const oauthRegister = createMockHandler<null>({
  method: 'post',
  endpoint: '/auth/oauth2/register',
  handler: async ({ request }) => {
    const requestBody = await request.json();
    const { data } = RequestBodySchema.safeParse(requestBody);

    if (!data) {
      return HttpResponse.json(
        {
          status: 'failure' as const,
          data: null,
          message:
            '요청 본문이 잘못된 형식이거나 유효하지 않은 데이터를 포함하고 있습니다. 올바른 형식으로 요청을 다시 시도하세요.',
        },
        { status: 400 },
      );
    }

    // 인증 객체가 누락된 경우 (동일한 동작을 구현할 수는 없으므로 임의의 번호로 테스트)
    if (data.phoneNumber === '01000000000') {
      return HttpResponse.json(
        {
          status: 'failure',
          data: null,
          message: '유효하지 않은 사용자의 요청입니다.',
        },
        { status: 404 },
      );
    }

    return HttpResponse.json(
      {
        status: 'success',
        data: null,
        message: '회원가입이 완료되었습니다.',
      },
      { status: 201 },
    );
  },
});
