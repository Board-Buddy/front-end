import api from '@/services';

/** 후기 전송할 유저 조회 API */
export const getReviewList = (gatherArticleId: string) =>
  api
    .get(`/v1/reviews/${gatherArticleId}`)
    .then((response) => response.data.data.users);

/** 후기 전송 API */
export const sendReview = (
  gatherArticleId: string,
  nickname: string,
  review: string,
) =>
  api.post(`/v1/reviews/${gatherArticleId}`, {
    nickname,
    review,
  });
