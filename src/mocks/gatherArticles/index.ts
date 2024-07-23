import { API_BASE_URL } from '@/constants/env';
import { http, HttpResponse } from 'msw';
import { getArticle } from './[gatherArticleId]';
import { getComments } from './[gatherArticleId]/comments';

export const getArticles = http.get(
  `${API_BASE_URL}/api/gatherArticles`,
  ({ request }) => {
    const url = new URL(request.url);
    const page = url.searchParams.get('page');
    const status = url.searchParams.get('status');
    const sort = url.searchParams.get('sort');

    if (!page) {
      return HttpResponse.json(
        { status: 'error', data: null, message: '올바른 요청이 아닙니다.' },
        { status: 404 },
      );
    }

    if (page === '0') {
      return HttpResponse.json({
        status: 'success',
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
              meetingLocation: '레드버튼 신림점',
              maxParticipants: 4,
              currentParticipants: 2,
              startTime: '2024-07-20 11:00',
              endTime: '2024-07-20 11:00',
              createdAt: '2024-07-20 14:00',
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
              meetingLocation: '레드버튼 신림점',
              maxParticipants: 4,
              currentParticipants: 2,
              date: '2024-07-20 11:00',
              startTime: '2024-07-20 11:00',
              endTime: '2024-07-20 12:00',
              createdAt: '2024-07-20 11:00',
              status: '모집중',
            },
            {
              id: 3,
              title: '퇴근 후 보드게임 ㄱㄱ하실분',
              description: '스플렌더 하실 분~',
              author: {
                nickname: '김보드',
                rank: 2,
              },
              meetingLocation: '레드버튼 신림점',
              maxParticipants: 4,
              currentParticipants: 2,
              startTime: '2024-07-20 11:00',
              endTime: '2024-07-20 13:00',
              createdAt: '2024-07-20 11:00',
              status: '모집중',
            },
          ],
          last: false,
        },
        message: '모집글 리스트 조회를 성공하였습니다.',
      });
    }

    if (page === '1') {
      return HttpResponse.json(
        {
          status: 'success',
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
                meetingLocation: '레드버튼 신림점',
                maxParticipants: 4,
                currentParticipants: 2,
                startTime: '2024-07-20 11:00',
                endTime: '2024-07-20 12:00',
                createdAt: '2024-07-20 11:00',
                status: '모집중',
              },
            ],
            last: true,
          },
          message: '모집글 리스트 조회를 성공하였습니다.',
        },
        { status: 200 },
      );
    }

    return HttpResponse.json(
      { status: 'error', data: null, message: '올바른 요청이 아닙니다.' },
      { status: 404 },
    );
  },
);

export const articleHandlers = [getArticles, getArticle, getComments];
