import { getLoggedInUserInfo } from '@/mocks/auth/login';

import { delay, HttpResponse } from 'msw';
import { createMockHandler } from '..';
import { ACCOUNT_MOCK } from './register';
import { setLoggedInUserInfo } from './login';

export const withdrawal = createMockHandler<null>({
  method: 'post',
  endpoint: '/auth/withdrawal',
  handler: async () => {
    await delay();

    const loggedInUserInfo = getLoggedInUserInfo();

    const accountIndex = ACCOUNT_MOCK.findIndex(
      (account) => account.nickname === loggedInUserInfo?.nickname,
    );

    if (accountIndex === -1) {
      ACCOUNT_MOCK.splice(accountIndex, 1);
    }

    setLoggedInUserInfo(null);

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
