import { API_BASE_URL } from '@/constants/env';
import { http, HttpResponse } from 'msw';

export const getArticle = http.get(
  `${API_BASE_URL}/api/gatherArticles/:id([0-9]+)`,
  () => {
    return HttpResponse.json({
      status: 'success',
      data: {
        post: {
          title: '퇴근 후 보드게임 ㄱㄱ하실분',
          description: '스플렌더 하실 분~',
          author: {
            nickname: 'yubin',
            rank: 1,
            profileImageS3SavedURL: 'https://',
            description: '자기소개',
          },
          meetingLocation: '레드버튼 신림점',
          x: 127.07539554630631,
          y: 37.61945601185591,
          maxParticipants: 4,
          currentParticipants: 2,
          startDateTime: '2024-07-20 11:00',
          endDateTime: '2024-07-20 13:00',
          sido: '서울특별시',
          sigu: '관악구',
          dong: '신림동',
          createdAt: '2024-07-19 13:09',
          status: 'open',
          participationApplicationStatus: 'none',
        },
      },
      message: '성공적으로 조회되었습니다.',
    });
  },
);

export const editArticle = http.put(
  `${API_BASE_URL}/api/gatherArticles/:id([0-9]+)`,
  () => {
    return HttpResponse.json({
      status: 'success',
      data: {
        post: {
          id: 1,
        },
      },
      message: '모집글이 수정되었습니다.',
    });
  },
);
