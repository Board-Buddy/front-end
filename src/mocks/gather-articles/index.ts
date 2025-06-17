import { http, HttpResponse } from 'msw';
import { API_BASE_URL } from '@/services/endpoint';
import { deleteArticle, editArticle, getArticle } from './[gatherArticleId]';
import {
  addComment,
  addReply,
  deleteComment,
  editComment,
  getComments,
} from './[gatherArticleId]/comments';
import { searchArticles } from './search';

const GATHER_ARTICLE_MOCK_DATA = [
  {
    id: 1,
    title: '퇴근 후 보드게임 ㄱㄱ하실분 1',
    description: '스플렌더 하실 분~',
    author: { nickname: '김보드', rank: 1 },
    meetingLocation: '레드버튼 신림점',
    maxParticipants: 4,
    currentParticipants: 2,
    startDateTime: '2024-07-20 19:00',
    endDateTime: '2024-07-20 21:00',
    createdAt: '2024-07-20 18:00',
    status: 'open',
  },
  {
    id: 2,
    title: '퇴근 후 보드게임 ㄱㄱ하실분 2',
    description: '카탄 하실 분~',
    author: { nickname: '박카탄', rank: 2 },
    meetingLocation: '레드버튼 강남점',
    maxParticipants: 5,
    currentParticipants: 3,
    startDateTime: '2024-07-20 20:00',
    endDateTime: '2024-07-20 22:00',
    createdAt: '2024-07-20 18:30',
    status: 'open',
  },
  {
    id: 3,
    title: '주말에 보드게임 하실 분 3',
    description: '뱅! 하실 분 구해요',
    author: { nickname: '이뱅' },
    meetingLocation: '보드카페 홍대점',
    maxParticipants: 6,
    currentParticipants: 4,
    startDateTime: '2024-07-21 14:00',
    endDateTime: '2024-07-21 16:00',
    createdAt: '2024-07-20 19:00',
    status: 'closed',
  },
  {
    id: 4,
    title: '주말 낮 보드게임 모임 4',
    description: '아발론 하실 분~',
    author: { nickname: '최아발' },
    meetingLocation: '레드버튼 신촌점',
    maxParticipants: 8,
    currentParticipants: 5,
    startDateTime: '2024-07-21 15:00',
    endDateTime: '2024-07-21 17:00',
    createdAt: '2024-07-20 19:30',
    status: 'completed',
  },
  {
    id: 5,
    title: '밤샘 보드게임 하실 분 5',
    description: '테라포밍 마스 하실 분!',
    author: { nickname: '정테라' },
    meetingLocation: '레드버튼 강남점',
    maxParticipants: 5,
    currentParticipants: 2,
    startDateTime: '2024-07-21 22:00',
    endDateTime: '2024-07-22 02:00',
    createdAt: '2024-07-20 20:00',
    status: 'completed',
  },
  {
    id: 6,
    title: '점심 보드게임 번개 6',
    description: '스플렌더, 카탄 구해요',
    author: { nickname: '스카이', rank: 3 },
    meetingLocation: '보드카페 종로점',
    maxParticipants: 4,
    currentParticipants: 1,
    startDateTime: '2024-07-21 12:00',
    endDateTime: '2024-07-21 14:00',
    createdAt: '2024-07-20 20:30',
    status: 'open',
  },
  {
    id: 7,
    title: '보드게임 초보 환영 7',
    description: '아줄 해봅시다!',
    author: { nickname: '한아줄' },
    meetingLocation: '레드버튼 건대점',
    maxParticipants: 4,
    currentParticipants: 2,
    startDateTime: '2024-07-22 14:00',
    endDateTime: '2024-07-22 16:00',
    createdAt: '2024-07-20 21:00',
    status: 'closed',
  },
  {
    id: 8,
    title: '주중 저녁 보드게임 8',
    description: '스컬킹 해보실 분',
    author: { nickname: '김스컬' },
    meetingLocation: '레드버튼 신림점',
    maxParticipants: 5,
    currentParticipants: 3,
    startDateTime: '2024-07-22 19:00',
    endDateTime: '2024-07-22 21:00',
    createdAt: '2024-07-20 21:30',
    status: 'open',
  },
  {
    id: 9,
    title: '주말 보드게임 대전 9',
    description: '게임 종류 상관없음',
    author: { nickname: '오픈마인드' },
    meetingLocation: '보드카페 홍대점',
    maxParticipants: 10,
    currentParticipants: 7,
    startDateTime: '2024-07-23 15:00',
    endDateTime: '2024-07-23 19:00',
    createdAt: '2024-07-20 22:00',
    status: 'closed',
  },
  {
    id: 10,
    title: '밤샘 보드게임 10',
    description: '디텍티브, 스컬킹',
    author: { nickname: '이디텍' },
    meetingLocation: '레드버튼 강남점',
    maxParticipants: 5,
    currentParticipants: 3,
    startDateTime: '2024-07-23 22:00',
    endDateTime: '2024-07-24 03:00',
    createdAt: '2024-07-20 22:30',
    status: 'open',
  },
  {
    id: 11,
    title: '낮 보드게임 번개 11',
    description: '아발론, 루미큐브',
    author: { nickname: '김루미' },
    meetingLocation: '레드버튼 강남점',
    maxParticipants: 6,
    currentParticipants: 4,
    startDateTime: '2024-07-24 12:00',
    endDateTime: '2024-07-24 14:00',
    createdAt: '2024-07-21 12:00',
    status: 'completed',
  },
  {
    id: 12,
    title: '평일 저녁 보드게임 12',
    description: '카탄 마스터 모집',
    author: { nickname: '마스터카탄' },
    meetingLocation: '보드카페 종로점',
    maxParticipants: 5,
    currentParticipants: 2,
    startDateTime: '2024-07-24 19:00',
    endDateTime: '2024-07-24 21:00',
    createdAt: '2024-07-21 12:30',
    status: 'open',
  },
  {
    id: 13,
    title: '주말 오전 보드게임 13',
    description: '스플렌더, 아줄 환영',
    author: { nickname: '스아' },
    meetingLocation: '레드버튼 신촌점',
    maxParticipants: 4,
    currentParticipants: 1,
    startDateTime: '2024-07-25 10:00',
    endDateTime: '2024-07-25 12:00',
    createdAt: '2024-07-21 13:00',
    status: 'completed',
  },
  {
    id: 14,
    title: '주말 밤샘 보드게임 14',
    description: '디텍티브 2인 모집',
    author: { nickname: '탐정킹' },
    meetingLocation: '보드카페 홍대점',
    maxParticipants: 5,
    currentParticipants: 3,
    startDateTime: '2024-07-25 22:00',
    endDateTime: '2024-07-26 03:00',
    createdAt: '2024-07-21 13:30',
    status: 'open',
  },
  {
    id: 15,
    title: '퇴근 후 보드게임 15',
    description: '루미큐브, 카탄',
    author: { nickname: '루카탄' },
    meetingLocation: '레드버튼 강남점',
    maxParticipants: 4,
    currentParticipants: 2,
    startDateTime: '2024-07-26 19:00',
    endDateTime: '2024-07-26 21:00',
    createdAt: '2024-07-21 14:00',
    status: 'open',
  },
  {
    id: 16,
    title: '주중 저녁 보드게임 16',
    description: '아발론 팀전',
    author: { nickname: '팀아발' },
    meetingLocation: '레드버튼 건대점',
    maxParticipants: 8,
    currentParticipants: 6,
    startDateTime: '2024-07-26 19:30',
    endDateTime: '2024-07-26 22:00',
    createdAt: '2024-07-21 14:30',
    status: 'closed',
  },
  {
    id: 17,
    title: '초보 보드게임 17',
    description: '뱅! 해봅시다',
    author: { nickname: '초뱅' },
    meetingLocation: '보드카페 종로점',
    maxParticipants: 5,
    currentParticipants: 2,
    startDateTime: '2024-07-27 13:00',
    endDateTime: '2024-07-27 15:00',
    createdAt: '2024-07-21 15:00',
    status: 'closed',
  },
  {
    id: 18,
    title: '주말 밤샘 보드게임 18',
    description: '테라포밍 마스 길게~',
    author: { nickname: '길테라' },
    meetingLocation: '레드버튼 강남점',
    maxParticipants: 5,
    currentParticipants: 3,
    startDateTime: '2024-07-27 22:00',
    endDateTime: '2024-07-28 03:00',
    createdAt: '2024-07-21 15:30',
    status: 'open',
  },
  {
    id: 19,
    title: '주말 오전 보드게임 19',
    description: '스플렌더, 아줄',
    author: { nickname: '모닝보드' },
    meetingLocation: '보드카페 홍대점',
    maxParticipants: 4,
    currentParticipants: 1,
    startDateTime: '2024-07-28 10:00',
    endDateTime: '2024-07-28 12:00',
    createdAt: '2024-07-21 16:00',
    status: 'open',
  },
  {
    id: 20,
    title: '주말 오후 보드게임 20',
    description: '카탄, 아발론 팀전',
    author: { nickname: '카아팀' },
    meetingLocation: '레드버튼 신촌점',
    maxParticipants: 6,
    currentParticipants: 4,
    startDateTime: '2024-07-28 14:00',
    endDateTime: '2024-07-28 17:00',
    createdAt: '2024-07-21 16:30',
    status: 'open',
  },
];

const ARTICLE_COUNT_PER_PAGE = 3;

export const getArticles = http.get(
  `${API_BASE_URL}/gather-articles`,
  ({ request }) => {
    const url = new URL(request.url);
    const page = Number(url.searchParams.get('page'));
    const status = url.searchParams.get('status');
    const sort = url.searchParams.get('sort');

    if (!page && page !== 0) {
      return HttpResponse.json(
        { status: 'error', data: null, message: '올바른 요청이 아닙니다.' },
        { status: 404 },
      );
    }

    // 기본값이 최신순이므로 reverse
    let filteredArticles = [...GATHER_ARTICLE_MOCK_DATA].toReversed();

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
);

export const addArticle = http.post(`${API_BASE_URL}/gather-articles`, () => {
  return HttpResponse.json({
    status: 'success',
    data: {
      post: {
        id: 1,
      },
    },
    message: '모집글이 업로드 되었습니다',
  });
});

export const articleHandlers = [
  getArticles,
  getArticle,
  addArticle,
  editArticle,
  deleteArticle,
  getComments,
  addComment,
  addReply,
  editComment,
  deleteComment,
  searchArticles,
];
