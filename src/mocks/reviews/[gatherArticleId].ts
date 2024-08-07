import { API_BASE_URL } from '@/constants/env';
import { http, HttpResponse } from 'msw';

export const getReviewList = http.get(
  `${API_BASE_URL}/api/reviews/:articleId([0-9]+)`,
  () => {
    const result = {
      status: 'success',
      data: {
        users: [
          {
            profileImageS3SavedURL: null,
            rank: 2,
            nickname: '숨코다',
            isReviewed: false,
          },
          {
            profileImageS3SavedURL: null,
            rank: null,
            nickname: '보드조아',
            isReviewed: true,
          },
        ],
      },
      message: '뱃지가 조회되었습니다.',
    };

    return HttpResponse.json(result, { status: 200 });
  },
);

export const sendReview = http.post(
  `${API_BASE_URL}/api/reviews/:articleId([0-9]+)`,
  () => {
    const result = {
      status: 'success',
      data: null,
      message: '후기가 전송되었습니다.',
    };

    return HttpResponse.json(result, { status: 200 });
  },
);
