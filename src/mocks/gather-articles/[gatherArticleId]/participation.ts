import { API_BASE_URL } from '@/constants/env';
import { http, HttpResponse } from 'msw';

export const getParticipants = http.get(
  `${API_BASE_URL}/api/gather-articles/:articleId([0-9]+)/participation`,
  ({ params }) => {
    const { articleId } = params;

    if (articleId === '2') {
      return HttpResponse.json({
        status: 'success',
        data: {
          participationAppliedMemberList: [],
        },
        message: '해당 모집글의 참가 신청 목록을 성공적으로 조회했습니다.',
      });
    }

    return HttpResponse.json({
      status: 'success',
      data: {
        participationAppliedMemberList: [
          {
            id: 1,
            nickname: 'kong1',
            rank: 1,
            profileImageS3SavedURL: null,
          },
          {
            id: 2,
            nickname: 'kong2',
            rank: 2,
            profileImageS3SavedURL: null,
          },
          {
            id: 3,
            nickname: 'kong3',
            rank: null,
            profileImageS3SavedURL: null,
          },
        ],
      },
      message: '댓글 조회를 성공하였습니다.',
    });
  },
);
