import { Author } from './article';

export interface Reply {
  id: number;
  author: Author;
  content: string;
  createdAt: string;
}

export interface Comment extends Reply {
  children?: Reply[];
}
