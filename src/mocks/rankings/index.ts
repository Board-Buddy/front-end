import { API_BASE_URL } from '@/constants/env';
import { http, HttpResponse } from 'msw';

export const getRankings = http.get(`${API_BASE_URL}/api/rankings`, () => {
  return HttpResponse.json({
    status: 'success',
    data: {
      rankings: [
        {
          nickname: '김송송',
          profileImageS3SavedURL: null,
        },
        {
          nickname: '김구구',
          profileImageS3SavedURL: null,
        },
        {
          nickname: '김나나',
          profileImageS3SavedURL: null,
        },
      ],
    },
    message: '랭킹 조회에 성공했습니다.',
  });
});

export const rankingHandlers = [getRankings];