import { API_BASE_URL } from '@/constants/env';
import { http, HttpResponse } from 'msw';

export const searchArticles = http.get(
  `${API_BASE_URL}/gather-articles/search`,
  ({ request }) => {
    const url = new URL(request.url);
    const keyword = decodeURIComponent(url.searchParams.get('query')!);

    if (keyword === '결과없음') {
      return HttpResponse.json(
        {
          status: 'failure',
          data: null,
          message: '검색 결과가 없습니다.',
        },
        { status: 404 },
      );
    }

    return HttpResponse.json({
      status: 'success',
      data: {
        posts: [
          {
            id: 3,
            title: '퇴근 후 보드게임 ㄱㄱ하실분',
            description: '스플렌더 하실 분~',
            author: {
              nickname: '김보드',
              rank: 1,
            },
            meetingLocation: '레드버튼 신림점',
            maxParticipants: 4,
            currentParticipants: 2,
            startDateTime: '2024-07-20 11:00',
            endDateTime: '2024-07-20 13:00',
            createdAt: '2024-07-19 13:09',
            status: 'completed',
          },
          {
            id: 2,
            title: '퇴근 후 보드게임 ㄱㄱ하실분',
            description: '스플렌더 하실 분~',
            author: {
              nickname: '김구구',
              rank: null,
            },
            meetingLocation: '레드버튼 신림점',
            maxParticipants: 4,
            currentParticipants: 2,
            startDateTime: '2024-07-20 11:00',
            endDateTime: '2024-07-20 13:00',
            createdAt: '2024-07-19 13:09',
            status: 'closed',
          },
          {
            id: 1,
            title: '퇴근 후 보드게임 ㄱㄱ하실분',
            description: '스플렌더 하실 분~',
            author: {
              nickname: '김보드',
              rank: 2,
            },
            meetingLocation: '레드버튼 신림점',
            maxParticipants: 4,
            currentParticipants: 2,
            date: '2024-07-20 00:00',
            startDateTime: '2024-07-20 11:00',
            endDateTime: '2024-07-20 13:00',
            createdAt: '2024-07-19 13:09',
            status: 'open',
          },
        ],
      },
      message: '모집글 검색에 성공하였습니다',
    });
  },
);
