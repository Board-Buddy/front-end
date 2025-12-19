import { HttpResponse } from 'msw';
import { createMockHandler } from '..';
import { Profile } from '@/types/profile';
import { ACCOUNT_MOCK } from '../auth/register';

export const getUserProfile = createMockHandler<{ profile: Profile }>({
  method: 'get',
  endpoint: '/profiles/:nickname',
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

    // NOTE: 프로필 조회는 임시 데이터로 처리
    return HttpResponse.json(
      {
        status: 'success',
        data: {
          profile: {
            profileImageSignedURL: account.profileImageSignedURL,
            description: '안녕하세요',
            rank: 2,
            buddyScore: 68,
            badges: [
              {
                badgeImageSignedURL: '/images/default_profile.png',
                badgeYearMonth: '2024.09',
              },
            ],
            joinCount: 4,
            totalExcellentCount: 2,
            totalGoodCount: 2,
            totalBadCount: 0,
          },
        },
        message: '프로필이 조회되었습니다.',
      },
      { status: 200 },
    );
  },
});
