import api from '@/services';
import { ArticleRequest, NewArticle } from '@/types/article';

/** 모집글 리스트 조회 API */
export const getArticles = ({ pageParam, status, sort }: ArticleRequest) =>
  api
    .get('/api/gather-articles', {
      params: { page: pageParam, status, sort },
    })
    .then((response) => response.data.data);

/** 모집글 상세 조회 API */
export const getArticle = ({ gatherArticleId }: { gatherArticleId: number }) =>
  api
    .get(`/api/gather-articles/${gatherArticleId}`)
    .then((response) => response.data.data.post);

/** 모집글 작성 API */
export const addArticle = (data: NewArticle) =>
  api.post('/api/gather-articles', data);

/** 모집글 수정 API */
export const editArticle = (data: NewArticle, articleId: number) =>
  api.put(`/api/gather-articles/${articleId}`, data);

/** 모집글 삭제 API */
export const deleteArticle = (articleId: number) =>
  api.delete(`/api/gather-articles/${articleId}`);
