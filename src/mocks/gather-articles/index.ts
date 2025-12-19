import { HttpResponse } from 'msw';
import { deleteArticle, editArticle, getArticle } from './[gatherArticleId]';
import {
  addComment,
  addReply,
  deleteComment,
  editComment,
  getComments,
} from './[gatherArticleId]/comments';
import { getArticleParticipationStatus } from './[gatherArticleId]/participation-status';
import { Article, ArticleList } from '@/types/article';
import { createMockHandler } from '..';
import z from 'zod';
import { loggedInUserInfo } from '../auth/login';

export const GATHER_ARTICLE_MOCK_DATA: ArticleList = [
  {
    id: 1,
    title: '퇴근 후 보드게임 ㄱㄱ하실분 1',
    description: '스플렌더 하실 분~',
    author: { nickname: '김보드', rank: 1 },
    meetingLocation: '레드버튼 신림점',
    x: 126.929502,
    y: 37.4831938,
    maxParticipants: 4,
    currentParticipants: 2,
    startDateTime: '2024-07-20 19:00',
    endDateTime: '2024-07-20 21:00',
    createdAt: '2024-07-20 18:00',
    status: 'open',
    sido: '서울',
    sgg: '관악구',
  },
  {
    id: 2,
    title: '퇴근 후 보드게임 ㄱㄱ하실분 2',
    description: '카탄 하실 분~',
    author: { nickname: '박카탄', rank: 2 },
    meetingLocation: '레드버튼 강남점',
    x: 126.929502,
    y: 37.4831938,
    maxParticipants: 5,
    currentParticipants: 3,
    startDateTime: '2024-07-20 20:00',
    endDateTime: '2024-07-20 22:00',
    createdAt: '2024-07-20 18:30',
    status: 'open',
    sido: '서울',
    sgg: '강남구',
  },
  {
    id: 3,
    title: '주말에 보드게임 하실 분 3',
    description: '뱅! 하실 분 구해요',
    author: { nickname: '이뱅', rank: null },
    meetingLocation: '레드버튼 홍대점',
    x: 126.929502,
    y: 37.4831938,
    maxParticipants: 6,
    currentParticipants: 4,
    startDateTime: '2024-07-21 14:00',
    endDateTime: '2024-07-21 16:00',
    createdAt: '2024-07-20 19:00',
    status: 'closed',
    sido: '서울',
    sgg: '마포구',
  },
  {
    id: 4,
    title: '주말 낮 보드게임 모임 4',
    description: '아발론 하실 분~',
    author: { nickname: '최아발', rank: null },
    meetingLocation: '레드버튼 신촌점',
    x: 126.929502,
    y: 37.4831938,
    maxParticipants: 8,
    currentParticipants: 5,
    startDateTime: '2024-07-21 15:00',
    endDateTime: '2024-07-21 17:00',
    createdAt: '2024-07-20 19:30',
    status: 'completed',
    sido: '서울',
    sgg: '서대문구',
  },
  {
    id: 5,
    title: '밤샘 보드게임 하실 분 5',
    description: '테라포밍 마스 하실 분!',
    author: { nickname: '정테라', rank: null },
    meetingLocation: '더홀릭보드게임카페 철산점',
    x: 126.929502,
    y: 37.4831938,
    maxParticipants: 5,
    currentParticipants: 2,
    startDateTime: '2024-07-21 22:00',
    endDateTime: '2024-07-22 02:00',
    createdAt: '2024-07-20 20:00',
    status: 'completed',
    sido: '경기',
    sgg: '광명시',
  },
  {
    id: 6,
    title: '점심 보드게임 번개 6',
    description: '스플렌더, 카탄 구해요',
    author: { nickname: '스카이', rank: 3 },
    meetingLocation: '홈즈앤루팡 수원역점',
    x: 126.929502,
    y: 37.4831938,
    maxParticipants: 4,
    currentParticipants: 1,
    startDateTime: '2024-07-21 12:00',
    endDateTime: '2024-07-21 14:00',
    createdAt: '2024-07-20 20:30',
    status: 'open',
    sido: '경기',
    sgg: '수원시',
  },
  {
    id: 7,
    title: '보드게임 초보 환영 7',
    description: '아줄 해봅시다!',
    author: { nickname: '한아줄', rank: null },
    meetingLocation: '레드버튼 건대점',
    x: 127.069,
    y: 37.5404,
    maxParticipants: 4,
    currentParticipants: 2,
    startDateTime: '2024-07-22 14:00',
    endDateTime: '2024-07-22 16:00',
    createdAt: '2024-07-20 21:00',
    status: 'closed',
    sido: '서울',
    sgg: '광진구',
  },
  {
    id: 8,
    title: '주중 저녁 보드게임 8',
    description: '스컬킹 해보실 분',
    author: { nickname: '김스컬', rank: null },
    meetingLocation: '보드게임카페 다이스팩토리 부산서면점',
    x: 129.0594,
    y: 35.1579,
    maxParticipants: 5,
    currentParticipants: 3,
    startDateTime: '2024-07-22 19:00',
    endDateTime: '2024-07-22 21:00',
    createdAt: '2024-07-20 21:30',
    status: 'open',
    sido: '부산',
    sgg: '부산진구',
  },
  {
    id: 9,
    title: '주말 보드게임 대전 9',
    description: '게임 종류 상관없음',
    author: { nickname: '오픈마인드', rank: null },
    meetingLocation: '레드버튼 대전은행점',
    x: 127.4274,
    y: 36.3285,
    maxParticipants: 10,
    currentParticipants: 7,
    startDateTime: '2024-07-23 15:00',
    endDateTime: '2024-07-23 19:00',
    createdAt: '2024-07-20 22:00',
    status: 'closed',
    sido: '대전',
    sgg: '중구',
  },
  {
    id: 10,
    title: '밤샘 보드게임 10',
    description: '디텍티브, 스컬킹',
    author: { nickname: '이디텍', rank: null },
    meetingLocation: '보드카페 플레이존 대구동성로점',
    x: 128.5961,
    y: 35.8687,
    maxParticipants: 5,
    currentParticipants: 3,
    startDateTime: '2024-07-23 22:00',
    endDateTime: '2024-07-24 03:00',
    createdAt: '2024-07-20 22:30',
    status: 'open',
    sido: '대구',
    sgg: '중구',
  },
  {
    id: 11,
    title: '낮 보드게임 번개 11',
    description: '아발론, 루미큐브',
    author: { nickname: '김루미', rank: null },
    meetingLocation: '레드버튼 인천부평점',
    x: 126.7219,
    y: 37.4938,
    maxParticipants: 6,
    currentParticipants: 4,
    startDateTime: '2024-07-24 12:00',
    endDateTime: '2024-07-24 14:00',
    createdAt: '2024-07-21 12:00',
    status: 'completed',
    sido: '인천',
    sgg: '부평구',
  },
  {
    id: 12,
    title: '평일 저녁 보드게임 12',
    description: '카탄 마스터 모집',
    author: { nickname: '마스터카탄', rank: null },
    meetingLocation: '보드카페 마스터존 광주상무점',
    x: 126.8514,
    y: 35.1532,
    maxParticipants: 5,
    currentParticipants: 2,
    startDateTime: '2024-07-24 19:00',
    endDateTime: '2024-07-24 21:00',
    createdAt: '2024-07-21 12:30',
    status: 'open',
    sido: '광주',
    sgg: '서구',
  },
  {
    id: 13,
    title: '주말 오전 보드게임 13',
    description: '스플렌더, 아줄 환영',
    author: { nickname: '스아', rank: null },
    meetingLocation: '보드카페 루미큐브존 성남판교점',
    x: 127.1115,
    y: 37.3943,
    maxParticipants: 4,
    currentParticipants: 1,
    startDateTime: '2024-07-25 10:00',
    endDateTime: '2024-07-25 12:00',
    createdAt: '2024-07-21 13:00',
    status: 'completed',
    sido: '경기',
    sgg: '성남시 분당구',
  },
  {
    id: 14,
    title: '주말 밤샘 보드게임 14',
    description: '디텍티브 2인 모집',
    author: { nickname: '탐정킹', rank: null },
    meetingLocation: '보드카페 나이트플레이 전주점',
    x: 127.148,
    y: 35.8242,
    maxParticipants: 5,
    currentParticipants: 3,
    startDateTime: '2024-07-25 22:00',
    endDateTime: '2024-07-26 03:00',
    createdAt: '2024-07-21 13:30',
    status: 'open',
    sido: '전북',
    sgg: '전주시 완산구',
  },
  {
    id: 15,
    title: '퇴근 후 보드게임 15',
    description: '루미큐브, 카탄',
    author: { nickname: '루카탄', rank: null },
    meetingLocation: '레드버튼 울산삼산점',
    x: 129.3328,
    y: 35.5384,
    maxParticipants: 4,
    currentParticipants: 2,
    startDateTime: '2024-07-26 19:00',
    endDateTime: '2024-07-26 21:00',
    createdAt: '2024-07-21 14:00',
    status: 'open',
    sido: '울산',
    sgg: '남구',
  },
  {
    id: 16,
    title: '주중 저녁 보드게임 16',
    description: '아발론 팀전',
    author: { nickname: '팀아발', rank: null },
    meetingLocation: '보드카페 전략존 천안불당점',
    x: 127.1139,
    y: 36.8204,
    maxParticipants: 8,
    currentParticipants: 6,
    startDateTime: '2024-07-26 19:30',
    endDateTime: '2024-07-26 22:00',
    createdAt: '2024-07-21 14:30',
    status: 'closed',
    sido: '충남',
    sgg: '천안시 서북구',
  },
  {
    id: 17,
    title: '초보 보드게임 17',
    description: '뱅! 해봅시다',
    author: { nickname: '초뱅', rank: null },
    meetingLocation: '보드카페 플레이큐 제주점',
    x: 126.5312,
    y: 33.4996,
    maxParticipants: 5,
    currentParticipants: 2,
    startDateTime: '2024-07-27 13:00',
    endDateTime: '2024-07-27 15:00',
    createdAt: '2024-07-21 15:00',
    status: 'closed',
    sido: '제주',
    sgg: '제주시',
  },
  {
    id: 18,
    title: '주말 밤샘 보드게임 18',
    description: '테라포밍 마스 길게~',
    author: { nickname: '길테라', rank: null },
    meetingLocation: '보드카페 마스존 창원상남점',
    x: 128.6811,
    y: 35.2271,
    maxParticipants: 5,
    currentParticipants: 3,
    startDateTime: '2024-07-27 22:00',
    endDateTime: '2024-07-28 03:00',
    createdAt: '2024-07-21 15:30',
    status: 'open',
    sido: '경남',
    sgg: '창원시 성산구',
  },
  {
    id: 19,
    title: '주말 오전 보드게임 19',
    description: '스플렌더, 아줄',
    author: { nickname: '모닝보드', rank: null },
    meetingLocation: '보드카페 모닝큐 대전유성점',
    x: 127.356,
    y: 36.3622,
    maxParticipants: 4,
    currentParticipants: 1,
    startDateTime: '2024-07-28 10:00',
    endDateTime: '2024-07-28 12:00',
    createdAt: '2024-07-21 16:00',
    status: 'open',
    sido: '대전',
    sgg: '유성구',
  },
  {
    id: 20,
    title: '주말 오후 보드게임 20',
    description: '카탄, 아발론 팀전',
    author: { nickname: '카아팀', rank: null },
    meetingLocation: '보드카페 팀플레이 강릉점',
    x: 128.8761,
    y: 37.7519,
    maxParticipants: 6,
    currentParticipants: 4,
    startDateTime: '2024-07-28 14:00',
    endDateTime: '2024-07-28 17:00',
    createdAt: '2024-07-21 16:30',
    status: 'open',
    sido: '강원',
    sgg: '강릉시',
  },
];

const ARTICLE_COUNT_PER_PAGE = 5;

export const getArticles = createMockHandler<{
  posts: Article[];
  last: boolean;
}>({
  method: 'get',
  endpoint: '/gather-articles',
  handler: ({ request }) => {
    const url = new URL(request.url);
    const page = Number(url.searchParams.get('page'));
    const status = url.searchParams.get('status');
    const sort = url.searchParams.get('sort');
    const sido = url.searchParams.get('sido');
    const sgg = url.searchParams.get('sgg');
    const keyword = url.searchParams.get('keyword');

    if (!page && page !== 0) {
      return HttpResponse.json(
        { status: 'error', data: null, message: '올바른 요청이 아닙니다.' },
        { status: 404 },
      );
    }

    // 기본값이 최신순이므로 reverse
    let filteredArticles = [...GATHER_ARTICLE_MOCK_DATA].toReversed();

    if (keyword) {
      if (keyword.length < 2) {
        return HttpResponse.json(
          {
            status: 'failure',
            data: null,
            message: '검색어는 두 글자 이상이어야 합니다.',
          },
          { status: 400 },
        );
      }
      filteredArticles = filteredArticles.filter(
        (article) =>
          article.title.includes(keyword) ||
          article.description.includes(keyword),
      );
    }

    if (sido) {
      filteredArticles = filteredArticles.filter(
        (article) => article.sido === sido,
      );
    }

    if (sgg) {
      filteredArticles = filteredArticles.filter(
        (article) => article.sgg === sgg,
      );
    }

    if (status === 'open') {
      filteredArticles = filteredArticles.filter(
        (article) => article.status === 'open',
      );
    }

    if (sort === 'soon') {
      filteredArticles = filteredArticles.sort(
        (a, b) =>
          new Date(a.startDateTime).getTime() -
          new Date(b.startDateTime).getTime(),
      );
    }

    const startIndex = page * ARTICLE_COUNT_PER_PAGE;
    const endIndex = startIndex + ARTICLE_COUNT_PER_PAGE;
    const pagedArticleList = filteredArticles.slice(startIndex, endIndex);

    const isLastPage = endIndex >= filteredArticles.length;

    return HttpResponse.json(
      {
        status: 'success',
        data: { posts: pagedArticleList, last: isLastPage },
        message: '모집글 리스트 조회를 성공하였습니다.',
      },
      { status: 200 },
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

export const addArticle = createMockHandler<{ post: { id: number } }>({
  method: 'post',
  endpoint: '/gather-articles',
  handler: async ({ request }) => {
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

    // 유효하지 않은 최대 참가 인원을 입력한 경우
    if (data.maxParticipants <= 0 || !Number.isInteger(data.maxParticipants)) {
      return HttpResponse.json(
        {
          status: 'failure',
          data: null,
          message: '최대 참가 인원이 유효하지 않습니다.',
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

    const newArticle: Article = {
      id: GATHER_ARTICLE_MOCK_DATA.length + 1,
      ...data,
      createdAt: new Date().toISOString(),
      currentParticipants: 1,
      status: 'open',
      x: 126.929502, // x, y 좌표는 임의로 설정
      y: 37.4831938,
      author: {
        nickname: loggedInUserInfo?.nickname ?? 'user',
        rank: null,
      },
    };

    GATHER_ARTICLE_MOCK_DATA.push(newArticle);

    return HttpResponse.json({
      status: 'success',
      data: {
        post: {
          id: newArticle.id,
        },
      },
      message: '모집글이 업로드 되었습니다',
    });
  },
});

export const articleHandlers = [
  getArticles,
  getArticle,
  getArticleParticipationStatus,
  addArticle,
  editArticle,
  deleteArticle,
  getComments,
  addComment,
  addReply,
  editComment,
  deleteComment,
];
