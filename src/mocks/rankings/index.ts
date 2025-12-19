import { delay, HttpResponse } from 'msw';
import { createMockHandler } from '..';
import { Ranking } from '@/types/ranking';

export const getRankings = createMockHandler<{ rankings: Ranking[] }>({
  method: 'get',
  endpoint: '/rankings',
  handler: async () => {
    await delay(300);

    return HttpResponse.json({
      status: 'success',
      data: {
        rankings: [
          {
            nickname: '김송송',
            profileImageSignedURL: null,
          },
          {
            nickname: '김구구',
            profileImageSignedURL: null,
          },
          {
            nickname: '김나나',
            profileImageSignedURL: null,
          },
        ],
      },
      message: '랭킹 조회에 성공했습니다.',
    });
  },
});

export const rankingHandlers = [getRankings];
