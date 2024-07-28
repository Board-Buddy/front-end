import { API_BASE_URL } from '@/constants/env';
import { http, HttpResponse } from 'msw';

export const getComments = http.get(
  `${API_BASE_URL}/api/gatherArticles/:id([0-9]+)/comments`,
  () => {
    return HttpResponse.json({
      status: 'success',
      data: {
        comments: [
          {
            id: 1,
            author: {
              nickname: '김한량',
              rank: 0,
              profileImageS3SavedURL: '',
            },
            content: '댓글 내용 어쩌구',
            createdAt: '2024-07-20 11:00',
            children: [
              {
                id: 4,
                author: {
                  nickname: '이한량',
                  rank: 1,
                  profileImageS3SavedURL: '',
                },
                content: '대댓글 내용 어쩌구',
                createdAt: '2024-07-20 11:00',
              },
              {
                id: 6,
                author: {
                  nickname: '아리랑',
                  rank: 0,
                  profileImageS3SavedURL: '',
                },
                content: '대댓글 내용 어쩌구',
                createdAt: '2024-07-20 11:00',
              },
            ],
          },
          {
            id: 2,
            author: {
              nickname: '김구구',
              rank: 2,
              profileImageS3SavedURL: '',
            },
            content: '댓글 내용 어쩌구',
            createdAt: '2024-07-20 11:00',
          },
        ],
      },
      message: '댓글 조회를 성공하였습니다.',
    });
  },
);
