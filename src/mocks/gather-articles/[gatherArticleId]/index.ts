import { HttpResponse } from 'msw';
import { GATHER_ARTICLE_MOCK_DATA } from '..';
import { createMockHandler } from '@/mocks';
import { Article } from '@/types/article';
import z from 'zod';

export const getArticle = createMockHandler<{
  post: Omit<Article, 'id' | 'participationApplicationStatus'>;
}>({
  method: 'get',
  endpoint: '/gather-articles/:articleId([0-9]+)',
  handler: ({ params }) => {
    const articleId = Number(params.articleId);

    if (isNaN(articleId)) {
      return HttpResponse.json(
        {
          status: 'error',
          message: '모집글 id는 숫자여야 합니다.',
          data: null,
        },
        { status: 400 },
      );
    }

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

    return HttpResponse.json(
      {
        status: 'success',
        data: {
          post: article,
        },
        message: '모집글이 조회되었습니다.',
      },
      {
        status: 200,
      },
    );
  },
});

const RequestBodySchema = z.object({
  title: z.string(),
  description: z.string(),
  meetingLocation: z.string(),
  sido: z.string(),
  sgg: z.string(),
  emd: z.string(),
  x: z.string(),
  y: z.string(),
  maxParticipants: z.number(),
  startDateTime: z.string(),
  endDateTime: z.string(),
});

export const editArticle = createMockHandler<{ post: { id: number } }>({
  method: 'put',
  endpoint: '/gather-articles/:id([0-9]+)',
  handler: async ({ params, request }) => {
    const articleId = Number(params.articleId);

    const requestBody = await request.json();
    const { data } = RequestBodySchema.safeParse(requestBody);

    if (!data) {
      return HttpResponse.json(
        {
          status: 'failure',
          data: null,
          message:
            '요청 본문이 잘못된 형식이거나 유효하지 않은 데이터를 포함하고 있습니다. 올바른 형식으로 요청을 다시 시도하세요.',
        },
        { status: 400 },
      );
    }

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

    // 이미 참가 중인 인원보다 적은 정원을 입력한 경우
    if (data.maxParticipants < article.currentParticipants) {
      return HttpResponse.json(
        {
          status: 'failure',
          data: null,
          message:
            '최대 참가 인원은 현재 참가 인원보다 적을 수 없습니다.\n 현재 참가 인원 : 3명',
        },
        { status: 400 },
      );
    }

    // 시작 시간이 현재 시간보다 이전인 경우
    if (new Date(data.startDateTime) <= new Date()) {
      return HttpResponse.json(
        {
          status: 'failure',
          data: null,
          message: '시작 시간은 현재 시간보다 늦어야 합니다.',
        },
        { status: 400 },
      );
    }

    // 종료 시간이 현재 시간보다 이전인 경우
    if (new Date(data.endDateTime) <= new Date()) {
      return HttpResponse.json(
        {
          status: 'failure',
          data: null,
          message: '종료 시간은 현재 시간보다 늦어야 합니다.',
        },
        { status: 400 },
      );
    }

    // 종료 시간이 시작 시간보다 이전인 경우
    if (new Date(data.endDateTime) <= new Date(data.startDateTime)) {
      return HttpResponse.json(
        {
          status: 'failure',
          data: null,
          message: '종료 시간은 시작 시간보다 늦어야 합니다.',
        },
        { status: 400 },
      );
    }

    return HttpResponse.json({
      status: 'success',
      data: {
        post: {
          id: articleId,
        },
      },
      message: '모집글이 수정되었습니다.',
    });
  },
});

export const deleteArticle = createMockHandler<{ post: { id: number } }>({
  method: 'delete',
  endpoint: '/gather-articles/:id([0-9]+)',
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

    return HttpResponse.json(
      {
        status: 'success',
        data: {
          post: {
            id: articleId,
          },
        },
        message: '글이 삭제되었습니다.',
      },
      {
        status: 200,
      },
    );
  },
});
