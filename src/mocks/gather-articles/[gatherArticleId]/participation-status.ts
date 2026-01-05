import { HttpResponse } from 'msw';
import { GATHER_ARTICLE_MOCK_DATA } from '..';
import { createMockHandler } from '@/mocks';

export const getArticleParticipationStatus = createMockHandler<{
  post: { participationApplicationStatus: string };
}>({
  method: 'get',
  endpoint: '/gather-articles/:id([0-9]+)/participation-status',
  handler: ({ params }) => {
    const articleId = Number(params.id);

    if (!GATHER_ARTICLE_MOCK_DATA.find((article) => article.id === articleId)) {
      return HttpResponse.json(
        {
          status: 'failure',
          data: null,
          message: '존재하지 않는 모집글입니다.',
        },
        { status: 404 },
      );
    }

    return HttpResponse.json({
      status: 'success',
      data: {
        post: { participationApplicationStatus: 'none' },
      },
      message: '모집글 참가 신청 현황을 성공적으로 조회 하였습니다.',
    });
  },
});
