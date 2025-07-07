import { API_BASE_URL } from '@/services/endpoint';
import { http, HttpResponse } from 'msw';
import { GATHER_ARTICLE_MOCK_DATA } from '..';

export const getArticleParticipationStatus = http.get(
  `${API_BASE_URL}/gather-articles/:id([0-9]+)/participation-status`,
  ({ params }) => {
    const { id } = params;

    if (
      !GATHER_ARTICLE_MOCK_DATA.find((article) => article.id === Number(id))
    ) {
      return HttpResponse.json({
        status: 'failure',
        data: null,
        message: '존재하지 않는 모집글입니다.',
      });
    }

    return HttpResponse.json({
      status: 'success',
      data: {
        post: { participationApplicationStatus: 'none' },
      },
      message: '모집글 참가 신청 현황을 성공적으로 조회 하였습니다.',
    });
  },
);
