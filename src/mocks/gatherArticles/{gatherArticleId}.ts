import { API_BASE_URL } from '@/constants/env';
import { http, HttpResponse } from 'msw';

export const getArticle = http.get(
  `${API_BASE_URL}/api/gatherArticles/*`,
  () => {
    return HttpResponse.json({
      status: 'success',
      data: {
        post: {
          title: '퇴근 후 보드게임 ㄱㄱ하실분',
          description: '스플렌더 하실 분~',
          author: {
            nickname: '김보드',
            rank: 1,
            profileImageS3SavedURL: 'https://',
            description: '자기소개',
          },
          meetingLocation: '레드버튼 신림점',
          x: 126.929502,
          y: 37.4831938,
          maxParticipants: 4,
          currentParticipants: 2,
          startTime: '2024-07-20 11:00',
          endTime: '2024-07-20 13:00',
          createdAt: '2024-07-19 13:09',
          status: '모집중',
          participationStatus: 'author',
        },
      },
      message: '성공적으로 조회되었습니다.',
    });
  },
);
