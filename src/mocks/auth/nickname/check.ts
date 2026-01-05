import { ACCOUNT_MOCK } from './../register';
import { createMockHandler } from '@/mocks';
import { HttpResponse } from 'msw';
import z from 'zod';

const RequestBodySchema = z.object({
  nickname: z.string(),
});

export const checkNickname = createMockHandler<null>({
  method: 'post',
  endpoint: '/auth/nickname/check',
  handler: async ({ request }) => {
    const requestBody = await request.json();
    const { data } = RequestBodySchema.safeParse(requestBody);

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

    if (ACCOUNT_MOCK.find((account) => account.nickname === data.nickname)) {
      return HttpResponse.json(
        {
          status: 'failure',
          data: null,
          message: '동일한 닉네임이 이미 존재합니다.',
        },
        { status: 409 },
      );
    }

    return HttpResponse.json(
      {
        status: 'success',
        data: null,
        message: '사용가능한 아이디 입니다.',
      },
      { status: 200 },
    );
  },
});
