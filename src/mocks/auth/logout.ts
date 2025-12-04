import { delay, HttpResponse } from 'msw';
import { createMockHandler } from '..';

export const logout = createMockHandler<null>({
  method: 'post',
  endpoint: 'auth/logout',
  handler: async () => {
    await delay();

    return HttpResponse.json(
      {
        status: 'success',
        data: null,
        message: '성공적으로 로그아웃 되었습니다.',
      },
      { status: 200 },
    );
  },
});
