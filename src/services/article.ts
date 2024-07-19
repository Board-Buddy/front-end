import api from '@/services';
import { ArticleRequest } from '@/types/article';

/** 모집글 리스트 조회 API */
export const getArticles = ({ pageParam }: ArticleRequest) =>
  api
    .get('/api/gatherArticles', {
      params: { page: pageParam },
    })
    .then((response) => response.data.data.posts);
