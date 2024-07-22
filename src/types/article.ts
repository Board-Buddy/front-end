export interface ArticleListResponse {
  data: {
    posts: ArticleList;
    last: boolean;
  };
  message: string;
}

export type ArticleList = Article[];

export interface Article {
  id: number;
  title: string;
  description: string;
  author: Author;
  meetingLocation: string;
  maxParticipants: number;
  currentParticipants: number;
  startTime: string;
  endTime: string;
  createdAt: string;
  status: string;
}

export interface Author {
  nickname: string;
  rank: number;
}

export interface SearchParams {
  location: string;
  status: string | null;
  sort: string | null;
}

export interface ArticleRequest {
  pageParam: number;
  status: string | null;
  sort: string | null;
}
