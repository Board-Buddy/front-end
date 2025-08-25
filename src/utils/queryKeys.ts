import { Article, GetArticleRequestParams } from '@/types/article';
import { ChatRoom } from '@/types/chat';
import { Province } from '@/types/location';

export const authQueryKeys = {
  all: ['auth'] as const,
  userInfo: () => [...authQueryKeys.all, 'userInfo'] as const,
} as const;

export const articleQueryKeys = {
  all: ['article'] as const,
  listAll: () => [...articleQueryKeys.all, 'list'] as const,
  list: ({
    status,
    sort,
    sido,
    sgg,
    keyword,
    search,
  }: GetArticleRequestParams & { search: boolean }) =>
    [
      ...articleQueryKeys.listAll(),
      search ? 'search' : 'browse',
      { status, sort, sido, sgg, keyword },
    ] as const,
  detail: (articleId: Article['id']) =>
    [...articleQueryKeys.all, 'detail', { articleId }] as const,
  comment: (articleId: Article['id']) =>
    [articleQueryKeys.detail(articleId), 'comment'] as const,
  participationStatus: (articleId: Article['id']) =>
    [
      ...articleQueryKeys.detail(articleId),
      'participationStatus',
      { articleId },
    ] as const,
  participationRequestList: (articleId: Article['id']) =>
    [
      ...articleQueryKeys.all,
      'participationRequestList',
      { articleId },
    ] as const,
} as const;

export const chatQueryKeys = {
  all: ['chat'] as const,
  chatRoomList: () => [...chatQueryKeys.all, 'roomList'] as const,
  messageList: (chatRoomId: ChatRoom['chatRoomId']) =>
    [...chatQueryKeys.all, 'messageList', { chatRoomId }] as const,
  articleSimpleInfo: (
    chatRoomId: ChatRoom['chatRoomId'],
    articleId: Article['id'],
  ) =>
    [
      ...chatQueryKeys.all,
      'articleSimpleInfo',
      { chatRoomId, articleId },
    ] as const,
} as const;

export const locationQueryKeys = {
  all: ['location'] as const,
  province: () => [...locationQueryKeys.all, 'province'] as const,
  district: (provinceCode: Province['code']) =>
    [...locationQueryKeys.all, 'district', { provinceCode }] as const,
} as const;

export const boardCafeQueryKeys = {
  all: ['boardCafe'] as const,
} as const;

export const notificationQueryKeys = {
  all: ['notification'] as const,
  list: () => [...notificationQueryKeys.all, 'list'] as const,
} as const;

export const rankingQueryKeys = {
  all: ['ranking'] as const,
} as const;

export const profileQueryKeys = {
  all: ['profile'] as const,
  userProfile: (nickname: string) =>
    [...profileQueryKeys.all, { nickname }] as const,
  badgeList: (nickname: string) =>
    [...profileQueryKeys.userProfile(nickname), 'badgeList'] as const,
} as const;

export const myQueryKeys = {
  all: ['my'] as const,
  postedArticle: () => [...myQueryKeys.all, 'postedArticle'] as const,
  joinedArticle: () => [...myQueryKeys.all, 'joinedArticle'] as const,
} as const;

export const reviewTargetUserQueryKeys = {
  all: ['review'] as const,
  list: (articleId: Article['id']) =>
    [...reviewTargetUserQueryKeys.all, 'list', { articleId }] as const,
} as const;
