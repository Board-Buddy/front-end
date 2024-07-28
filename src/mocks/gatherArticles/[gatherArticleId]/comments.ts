import { API_BASE_URL } from '@/constants/env';
import { Comment } from '@/types/comment';
import { http, HttpResponse } from 'msw';

const comments = new Map();

export const getComments = http.get(
  `${API_BASE_URL}/api/gatherArticles/:id([0-9]+)/comments`,
  () => {
    return HttpResponse.json({
      status: 'success',
      data: {
        comments: Array.from(comments.values()),
      },
      message: '댓글 조회를 성공하였습니다.',
    });
  },
);

interface RequestBody {
  content: string;
}

export const addComment = http.post<any, RequestBody>(
  `${API_BASE_URL}/api/gatherArticles/:id([0-9]+)/comments`,
  async ({ request }) => {
    const { content } = await request.json();

    const newComment = {
      id: comments.values.length,
      author: {
        nickname: 'yubin',
        rank: 0,
        profileImageS3SavedURL: '',
      },
      content,
      createdAt: '2024-07-28 23:12',
    } as Comment;

    comments.set(newComment.id, newComment);

    return HttpResponse.json({
      status: 'success',
      data: null,
      message: '댓글이 작성에 성공하였습니다.',
    });
  },
);
