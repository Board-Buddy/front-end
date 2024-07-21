import api from '@/services';
import { ArticleRequest } from '@/types/article';

/** 모집글 리스트 조회 API */
export const getArticles = ({ pageParam, status, sort }: ArticleRequest) =>
  api
    .get('/api/gatherArticles', {
      params: { page: pageParam, status, sort },
    })
    .then((response) => response.data.data);
