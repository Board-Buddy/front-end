import { API_BASE_URL } from '@/constants/env';
import { http, HttpResponse } from 'msw';

export const getArticles = http.get(
  `${API_BASE_URL}/api/gatherArticles`,
  () => {
    return HttpResponse.json({
      data: {
        posts: [
          {
            id: 1,
            title: '퇴근 후 보드게임 ㄱㄱ하실분',
            description: '스플렌더 하실 분~',
            author: {
              nickname: '김보드',
              rank: 1,
            },
            location: '레드버튼 신림점',
            maxParticipants: 4,
            currentParticipants: 2,
            startTime: '2024-07-20 11:00',
            endTime: '2024-07-20 13:00',
            createdAt: '2024-07-17 08:09',
            status: '모집중',
          },
          {
            id: 2,
            title: '퇴근 후 보드게임 ㄱㄱ하실분',
            description: '스플렌더 하실 분~',
            author: {
              nickname: '김구구',
              rank: 0,
            },
            location: '레드버튼 신림점',
            maxParticipants: 4,
            currentParticipants: 2,
            startTime: '2024-07-20 11:00',
            endTime: '2024-07-20 13:00',
            createdAt: '2024-07-06 13:09',
            status: '모집마감',
          },
          {
            id: 3,
            title: '퇴근 후 보드게임 ㄱㄱ하실분',
            description: '스플렌더 하실 분~',
            author: {
              nickname: '김보드',
              rank: 2,
            },
            location: '레드버튼 신림점',
            maxParticipants: 4,
            currentParticipants: 2,
            startTime: '2024-07-20 11:00',
            endTime: '2024-07-20 13:00',
            createdAt: '2024-07-10 13:09',
            status: '모집중',
          },
        ],
      },
      message: '모집글 리스트 조회에 성공하였습니다.',
    });
  },
);

export const articleHandlers = [getArticles];