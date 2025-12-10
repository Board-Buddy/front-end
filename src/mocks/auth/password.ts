import { HttpResponse } from 'msw';
import { createMockHandler } from '..';
import z from 'zod';

const requestBodySchema = z.object({
  password: z.string(),
});

export const passwordCheck = createMockHandler<null>({
  method: 'post',
  endpoint: '/auth/password',
  handler: async ({ request }) => {
    const requestBody = await request.json();
    const { data } = requestBodySchema.safeParse(requestBody);

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

    // 임의의 비밀번호로 올바르지 않은 경우 테스트
    if (data.password === 'asdf') {
      return HttpResponse.json(
        {
          status: 'failure',
          data: null,
          message: '입력하신 비밀번호가 올바르지 않습니다.',
        },
        { status: 400 },
      );
    }

    return HttpResponse.json({
      status: 'success',
      data: null,
      message: '비밀번호 검증이 완료되었습니다.',
    });
  },
});
