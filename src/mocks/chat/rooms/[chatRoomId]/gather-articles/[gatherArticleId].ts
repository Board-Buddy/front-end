import { createMockHandler } from '@/mocks';
import { GATHER_ARTICLE_MOCK_DATA } from '@/mocks/gather-articles';
import { ArticleSimpleInfo } from '@/types/chat';
import { HttpResponse } from 'msw';

export const getArticleSimpleInfo = createMockHandler<{
  gatherArticleSimpleInfo: ArticleSimpleInfo;
}>({
  method: 'get',
  endpoint:
    '/chat/rooms/:chatRoomId([0-9]+)/gather-articles/:gatherArticleId([0-9]+)',
  handler: ({ params }) => {
    const gatherArticleId = Number(params.gatherArticleId);

    const article = GATHER_ARTICLE_MOCK_DATA.find(
      (article) => article.id === gatherArticleId,
    );

    if (!article) {
      return HttpResponse.json(
        {
          status: 'failure',
          data: null,
          message: '모집글 정보를 찾을 수 없습니다.',
        },
        { status: 404 },
      );
    }

    return HttpResponse.json(
      {
        status: 'success',
        data: {
          gatherArticleSimpleInfo: {
            title: article.title,
            meetingLocation: article.meetingLocation,
            maxParticipants: article.maxParticipants,
            currentParticipants: article.currentParticipants,
            startDateTime: article.startDateTime,
            endDateTime: article.endDateTime,
          },
        },
        message: '모집글 정보를 성공적으로 조회했습니다.',
      },
      { status: 200 },
    );
  },
});
