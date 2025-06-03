import api from '@/services';
import { Article } from '@/types/article';
import { Review } from '@/types/review';
import { ENDPOINT } from './endpoint';

/** 후기 전송할 유저 조회 API */
export const getReviewList = (gatherArticleId: Article['id']) =>
  api
    .get(ENDPOINT.GATHER_ARTICLE.REVIEWS(gatherArticleId))
    .then((response) => response.data.data.users);

/** 후기 전송 API */
export const sendReview = (
  gatherArticleId: Article['id'],
  nickname: Review['nickname'],
  review: string,
) =>
  api.post(ENDPOINT.GATHER_ARTICLE.REVIEWS(gatherArticleId), {
    nickname,
    review,
  });
