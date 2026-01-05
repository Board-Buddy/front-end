import { HttpResponse } from 'msw';
import { createMockHandler } from '..';
import { UserInfo } from '@/types/user';
import { getLoggedInUserInfo } from '../auth/login';

export const getUserInfo = createMockHandler<{ memberInfo: UserInfo }>({
  method: 'get',
  endpoint: '/members/me',
  handler: () => {
    const loggedInUserInfo = getLoggedInUserInfo();

    if (!loggedInUserInfo) {
      return HttpResponse.json(
        {
          status: 'failure',
          data: null,
          message: '유효하지 않은 사용자의 요청입니다.',
        },
        {
          status: 404,
        },
      );
    }

    return HttpResponse.json({
      status: 'success',
      data: {
        memberInfo: loggedInUserInfo,
      },
      message: '유저 정보를 성공적으로 조회 했습니다.',
    });
  },
});
