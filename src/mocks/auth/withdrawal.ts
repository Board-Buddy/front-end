import { delay, HttpResponse } from 'msw';
import { createMockHandler } from '..';

export const withdrawal = createMockHandler<null>({
  method: 'post',
  endpoint: 'auth/withdrawal',
  handler: async () => {
    await delay();

    return HttpResponse.json(
      {
        status: 'success',
        data: null,
        message: '회원탈퇴가 완료되었습니다.',
      },
      { status: 200 },
    );
  },
});
