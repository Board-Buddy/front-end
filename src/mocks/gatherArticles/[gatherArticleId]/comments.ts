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
              nickname: '김구구',
              rank: 0,
              profileImageS3SavedURL: '',
            },
            content: '댓글 내용 어쩌구',
            createdAt: '2024-06-20 13:21',
            replies: [
              {
                id: 4,
                author: {
                  nickname: 'yubin',
                  rank: 1,
                  profileImageS3SavedURL: '',
                },
                content: '대댓글 내용 어쩌구',
                createdAt: '2024-06-20 13:21',
              },
              {
                id: 6,
                author: {
                  nickname: '아리랑',
                  rank: 0,
                  profileImageS3SavedURL: '',
                },
                content: '대댓글 내용 어쩌구',
                createdAt: '2024-06-20 13:21',
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
            createdAt: '2024-06-20 13:21',
            replies: [],
          },
        ],
      },
      message: '댓글 조회를 성공하였습니다.',
    });
  },
);
