import { RequiredOnly } from '@/utils/type';

export type ArticleList = Article[];

export interface Article {
  id: number;
  title: string;
  description: string;
  meetingLocation: string;
  maxParticipants: number;
  currentParticipants: number;
  startDateTime: string;
  endDateTime: string;
  createdAt: string;
  status: string;
  author?: Author;
  sido?: string;
  sgg?: string;
  emd?: string;
  x?: number;
  y?: number;
  participationApplicationStatus?: string;
}

export type MyArticle = RequiredOnly<Article>;
export type JoinedArticle = RequiredOnly<Article> & { author: Author };

export interface Author {
  nickname: string;
  rank: number | null;
  profileImageSignedURL?: string;
  description?: string;
}

export interface SearchParams {
  location: string;
  status: string | null;
  sort: string | null;
}

export interface GetArticleRequestParams {
  status?: string | null;
  sort?: string | null;
  sido?: string | null;
  sgg?: string | null;
  keyword?: string | null;
}

export interface NewArticle {
  title: string;
  description: string;
  meetingLocation: string;
  sido: string;
  sgg: string;
  emd: string;
  x: string;
  y: string;
  maxParticipants: number;
  startDateTime: string;
  endDateTime: string;
}

export interface ParticipantInfo {
  id: number;
  rank: number | null;
  nickname: string;
  profileImageSignedURL: string | null;
}
