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
  x?: number;
  y?: number;
  maxParticipants: number;
  currentParticipants: number;
  startTime: string;
  endTime: string;
  createdAt: string;
  status: string;
  participationStatus?: string;
}

export interface Author {
  nickname: string;
  rank: number;
  profileImageS3SavedURL?: string;
  description?: string;
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
