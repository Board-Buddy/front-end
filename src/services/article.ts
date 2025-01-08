import api from '@/services';
import { ArticleRequest, NewArticle } from '@/types/article';

/** 모집글 리스트 조회 API */
export const getArticles = ({ pageParam, status, sort }: ArticleRequest) =>
  api
    .get('/gather-articles', {
      params: { page: pageParam, status, sort },
    })
    .then((response) => response.data.data);

/** 모집글 상세 조회 API */
export const getArticle = ({ gatherArticleId }: { gatherArticleId: number }) =>
  api
    .get(`/gather-articles/${gatherArticleId}`)
    .then((response) => response.data.data.post);

/** 모집글 작성 API */
export const addArticle = (data: NewArticle) =>
  api.post('/gather-articles', data);

/** 모집글 수정 API */
export const editArticle = (data: NewArticle, articleId: number) =>
  api.put(`/gather-articles/${articleId}`, data);

/** 모집글 삭제 API */
export const deleteArticle = (articleId: number) =>
  api.delete(`/gather-articles/${articleId}`);

/** 모집글 검색 API */
export const searchArticles = (keyword: string) =>
  api
    .get('/gather-articles/search', {
      params: { query: keyword },
    })
    .then((response) => response.data.data.posts);
