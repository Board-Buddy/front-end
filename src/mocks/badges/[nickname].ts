import { HttpResponse } from 'msw';
import { createMockHandler } from '..';
import { Badge } from '@/types/profile';
import { ACCOUNT_MOCK } from '../auth/register';

export const getBadgeList = createMockHandler<{ badges: Badge[] }>({
  method: 'get',
  endpoint: '/badges/:nickname',
  handler: ({ params }) => {
    const nickname = params.nickname;

    const account = ACCOUNT_MOCK.find(
      (account) => account.nickname === nickname,
    );

    if (!account) {
      return HttpResponse.json(
        {
          status: 'failure',
          data: null,
          message: '해당 유저를 찾을 수 없습니다.',
        },
        { status: 400 },
      );
    }

    // NOTE: 뱃지 조회는 임시 데이터로 처리
    return HttpResponse.json(
      {
        status: 'success',
        data: {
          badges: [
            {
              badgeImageSignedURL: '/images/default_profile.png',
              badgeYearMonth: '2024.09',
            },
            {
              badgeImageSignedURL: '/images/default_profile.png',
              badgeYearMonth: '2024.08',
            },
            {
              badgeImageSignedURL: '/images/default_profile.png',
              badgeYearMonth: '2024.07',
            },
          ],
        },
        message: '뱃지가 조회되었습니다.',
      },
      { status: 200 },
    );
  },
});
