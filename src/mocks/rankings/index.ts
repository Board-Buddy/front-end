import { API_BASE_URL } from '@/services/endpoint';
import { http, HttpResponse } from 'msw';

export const getRankings = http.get(`${API_BASE_URL}/rankings`, () => {
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
});

export const rankingHandlers = [getRankings];
