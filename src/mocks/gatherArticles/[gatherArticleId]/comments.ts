import { API_BASE_URL } from '@/constants/env';
import { Comment } from '@/types/comment';
import { http, HttpResponse } from 'msw';

// 댓글을 저장할 Map 객체 초기화
const comments = new Map<number, Comment>();

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

export const addComment = http.post<any, { content: string }>(
  `${API_BASE_URL}/api/gatherArticles/:id([0-9]+)/comments`,
  async ({ request }) => {
    const { content } = await request.json();

    const newComment = {
      id: comments.size,
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

export const addReply = http.post<any, { content: string }>(
  `${API_BASE_URL}/api/gatherArticles/:articleId([0-9]+)/comments/:parentId([0-9]+)`,
  async ({ request, params }) => {
    const { content } = await request.json();
    const { parentId } = params;

    const newComment = {
      id: comments.size,
      author: {
        nickname: 'yubin',
        rank: 1,
        profileImageS3SavedURL: '',
      },
      content,
      createdAt: '2024-07-28 23:12',
    } as Comment;

    // 부모 댓글을 찾고, 자식 댓글을 추가합니다.
    const parentComment = comments.get(parseInt(parentId, 10));
    if (parentComment) {
      if (!parentComment.children) {
        parentComment.children = [];
      }
      parentComment.children.push(newComment);
    } else {
      return HttpResponse.json({
        status: 'error',
        data: null,
        message: '부모 댓글을 찾을 수 없습니다.',
      });
    }

    return HttpResponse.json({
      status: 'success',
      data: null,
      message: '댓글이 작성에 성공하였습니다.',
    });
  },
);

export const editComment = http.put<any, { content: string }>(
  `${API_BASE_URL}/api/gatherArticles/:articleId([0-9]+)/comments/:commentId([0-9]+)`,
  async ({ request, params }) => {
    const { content } = await request.json();
    const { commentId } = params;

    const existingComment = comments.get(parseInt(commentId, 10));
    if (existingComment) {
      existingComment.content = content;
      comments.set(parseInt(commentId, 10), existingComment);

      return HttpResponse.json({
        status: 'success',
        data: null,
        message: '댓글 수정을 성공하였습니다.',
      });
    }
    return HttpResponse.json({
      status: 'error',
      data: null,
      message: '댓글을 찾을 수 없습니다.',
    });
  },
);

export const deleteComment = http.delete<any>(
  `${API_BASE_URL}/api/gatherArticles/:articleId([0-9]+)/comments/:commentId([0-9]+)`,
  async ({ params }) => {
    const { commentId } = params;

    if (comments.has(parseInt(commentId, 10))) {
      comments.delete(parseInt(commentId, 10));

      return HttpResponse.json({
        status: 'success',
        data: null,
        message: '댓글 삭제에 성공하였습니다.',
      });
    }
    return HttpResponse.json({
      status: 'error',
      data: null,
      message: '댓글을 찾을 수 없습니다.',
    });
  },
);
