import { HttpResponse } from 'msw';
import { createMockHandler } from '..';
import { ArticleList } from '@/types/article';
import { GATHER_ARTICLE_MOCK_DATA } from '../gather-articles';
import { getLoggedInUserInfo } from '../auth/login';

// NOTE: 참가 여부까지 모킹하지 않으므로 내가 작성한 모집글 조회 API와 동일하게 구성
export const getMyJoinedArticles = createMockHandler<{ posts: ArticleList }>({
  method: 'get',
  endpoint: '/my/participations',
  handler: () => {
    const loggedInUserInfo = getLoggedInUserInfo();

    const articles = GATHER_ARTICLE_MOCK_DATA.filter(
      (article) => article.author?.nickname === loggedInUserInfo?.nickname,
    );

    return HttpResponse.json(
      {
        status: 'success',
        data: {
          posts: articles,
        },
        message: '작성한 모집글이 조회되었습니다.',
      },
      { status: 200 },
    );
  },
});
