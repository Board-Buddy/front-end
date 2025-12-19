import { createMockHandler } from '@/mocks';
import { Comment } from '@/types/comment';
import { HttpResponse } from 'msw';
import { GATHER_ARTICLE_MOCK_DATA } from '..';
import { loggedInUserInfo } from '@/mocks/auth/login';
import z from 'zod';
import { formatDateTime } from '@/utils/date';

// 댓글을 저장할 Map 객체 초기화
const COMMENT_MOCK_DATA = new Map<number, Comment[]>();

// 댓글 id 관리
let COMMENT_ID_SEQ = 1;
const nextCommentId = () => COMMENT_ID_SEQ++;

export const getComments = createMockHandler<{ comments: Comment[] }>({
  method: 'get',
  endpoint: '/gather-articles/:id([0-9]+)/comments',
  handler: ({ params }) => {
    const articleId = Number(params.id);
    const article = GATHER_ARTICLE_MOCK_DATA.find(
      (article) => article.id === articleId,
    );

    if (!article) {
      return HttpResponse.json(
        {
          status: 'failure',
          data: null,
          message: '존재하지 않는 모집글입니다.',
        },
        {
          status: 404,
        },
      );
    }

    return HttpResponse.json({
      status: 'success',
      data: {
        comments: COMMENT_MOCK_DATA.get(articleId) || [],
      },
      message: '댓글 조회를 성공하였습니다.',
    });
  },
});

const RequestBodySchema = z.object({
  content: z.string(),
});

export const addComment = createMockHandler<null>({
  method: 'post',
  endpoint: '/gather-articles/:articleId([0-9]+)/comments',
  handler: async ({ params, request }) => {
    const articleId = Number(params.articleId);

    const requestBody = await request.json();
    const { data } = RequestBodySchema.safeParse(requestBody);

    if (!data) {
      return HttpResponse.json(
        {
          status: 'failure',
          data: null,
          message: '댓글이 입력되지 않았습니다.',
        },
        { status: 400 },
      );
    }

    if (!loggedInUserInfo) {
      return HttpResponse.json(
        {
          status: 'error',
          data: null,
          message: '유효하지 않은 사용자입니다.',
        },
        { status: 500 },
      );
    }

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

    const now = new Date();

    const newComment = {
      id: nextCommentId(),
      author: {
        nickname: loggedInUserInfo.nickname,
        rank: 0,
        profileImageSignedURL: loggedInUserInfo.profileImageSignedURL,
      },
      content: data.content,
      createdAt: formatDateTime(now, now.getHours(), now.getMinutes()),
    } as Comment;

    COMMENT_MOCK_DATA.set(articleId, [
      ...(COMMENT_MOCK_DATA.get(articleId) || []),
      newComment,
    ]);

    return HttpResponse.json({
      status: 'success',
      data: null,
      message: '댓글이 작성에 성공하였습니다.',
    });
  },
});

// id로 댓글을 찾는 재귀 함수
const findCommentById = (
  comments: Comment[],
  commentId: number,
): Comment | null => {
  for (const comment of comments) {
    if (comment.id === commentId) {
      return comment;
    }

    if (comment.children?.length) {
      const found = findCommentById(comment.children, commentId);
      if (found) return found;
    }
  }

  return null;
};

export const addReply = createMockHandler<null>({
  method: 'post',
  endpoint: '/gather-articles/:articleId([0-9]+)/comments/:parentId([0-9]+)',
  handler: async ({ request, params }) => {
    const articleId = Number(params.articleId);
    const parentId = Number(params.parentId);

    const requestBody = await request.json();
    const { data } = RequestBodySchema.safeParse(requestBody);

    if (!data) {
      return HttpResponse.json(
        {
          status: 'failure',
          data: null,
          message: '댓글이 입력되지 않았습니다.',
        },
        { status: 400 },
      );
    }

    if (!loggedInUserInfo) {
      return HttpResponse.json(
        {
          status: 'error',
          data: null,
          message: '유효하지 않은 사용자입니다.',
        },
        { status: 500 },
      );
    }

    if (!GATHER_ARTICLE_MOCK_DATA.find((a) => a.id === articleId)) {
      return HttpResponse.json(
        {
          status: 'failure',
          data: null,
          message: '존재하지 않는 모집글입니다.',
        },
        { status: 404 },
      );
    }

    const now = new Date();

    const newComment = {
      id: nextCommentId(),
      author: {
        nickname: loggedInUserInfo.nickname,
        rank: 0,
        profileImageSignedURL: loggedInUserInfo.profileImageSignedURL,
      },
      content: data.content,
      createdAt: formatDateTime(now, now.getHours(), now.getMinutes()),
    } as Comment;

    const comments = COMMENT_MOCK_DATA.get(articleId);

    if (!comments) {
      return HttpResponse.json(
        {
          status: 'failure',
          data: null,
          message: '존재하지 않는 댓글입니다.',
        },
        { status: 404 },
      );
    }

    // 부모 댓글을 찾아 자식 댓글로 추가
    const parentComment = findCommentById(comments, parentId);

    if (!parentComment) {
      return HttpResponse.json(
        {
          status: 'failure',
          data: null,
          message: '존재하지 않는 댓글입니다.',
        },
        {
          status: 404,
        },
      );
    }

    if (!parentComment.children) {
      parentComment.children = [];
    }

    parentComment.children.push(newComment);

    return HttpResponse.json(
      {
        status: 'success',
        data: null,
        message: '댓글이 작성에 성공하였습니다.',
      },
      { status: 200 },
    );
  },
});

export const editComment = createMockHandler<null>({
  method: 'put',
  endpoint: '/gather-articles/:articleId([0-9]+)/comments/:commentId([0-9]+)',
  handler: async ({ request, params }) => {
    const articleId = Number(params.articleId);
    const commentId = Number(params.commentId);

    const requestBody = await request.json();
    const { data } = RequestBodySchema.safeParse(requestBody);

    if (!data) {
      return HttpResponse.json(
        {
          status: 'failure',
          data: null,
          message: '댓글이 입력되지 않았습니다.',
        },
        { status: 400 },
      );
    }

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

    const comments = COMMENT_MOCK_DATA.get(articleId);
    const comment = findCommentById(comments || [], commentId);

    if (!comments || comment === null) {
      return HttpResponse.json(
        {
          status: 'failure',
          data: null,
          message: '존재하지 않는 댓글입니다.',
        },
        { status: 404 },
      );
    }

    comment.content = data.content;

    return HttpResponse.json(
      {
        status: 'success',
        data: null,
        message: '댓글 수정을 성공하였습니다.',
      },
      { status: 200 },
    );
  },
});

const removeCommentById = (
  comments: Comment[],
  commentId: number,
): Comment[] => {
  return comments
    .filter((comment) => comment.id !== commentId)
    .map((comment) => ({
      ...comment,
      children: comment.children
        ? removeCommentById(comment.children, commentId)
        : undefined,
    }));
};

export const deleteComment = createMockHandler<null>({
  method: 'delete',
  endpoint: '/gather-articles/:articleId([0-9]+)/comments/:commentId([0-9]+)',
  handler: async ({ params }) => {
    const articleId = Number(params.articleId);
    const commentId = Number(params.commentId);

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

    const comments = COMMENT_MOCK_DATA.get(articleId) ?? [];

    if (!findCommentById(comments, commentId)) {
      return HttpResponse.json(
        {
          status: 'failure',
          data: null,
          message: '존재하지 않는 댓글입니다.',
        },
        { status: 404 },
      );
    }

    COMMENT_MOCK_DATA.set(articleId, removeCommentById(comments, commentId));

    return HttpResponse.json(
      {
        status: 'success',
        data: null,
        message: '댓글 삭제에 성공하였습니다.',
      },
      { status: 200 },
    );
  },
});
