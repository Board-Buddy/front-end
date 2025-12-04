import { HttpResponse } from 'msw';
import { createMockHandler } from '..';
import { loggedInUserInfo } from './login';
import { UserInfo } from '@/types/user';

export const status = createMockHandler<{ profileDTO: UserInfo }>({
  method: 'get',
  endpoint: 'auth/status',
  handler: () => {
    if (!loggedInUserInfo) {
      return HttpResponse.json(
        {
          status: 'failure',
          data: null,
          message: '로그인 하지 않은 사용자의 요청입니다.',
        },
        {
          status: 404,
        },
      );
    }

    return HttpResponse.json({
      status: 'success',
      data: {
        profileDTO: loggedInUserInfo,
      },
      message: `${loggedInUserInfo.nickname}님의 세션은 유효합니다.`,
    });
  },
});
