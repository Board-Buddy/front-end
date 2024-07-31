import api from '@/services';
import { ArticleRequest, NewArticle } from '@/types/article';
import { handleApiError } from '@/utils/handleApiError';

/** 모집글 리스트 조회 API */
export const getArticles = async ({
  pageParam,
  status,
  sort,
}: ArticleRequest) => {
  try {
    const response = await api.get('/api/gather-articles', {
      params: { page: pageParam, status, sort },
    });
    return response.data.data;
  } catch (error: unknown) {
    handleApiError(error);
  }
};

/** 모집글 상세 조회 API */
export const getArticle = async ({
  gatherArticleId,
}: {
  gatherArticleId: number;
}) => {
  try {
    const response = await api.get(`/api/gather-articles/${gatherArticleId}`);
    return response.data.data.post;
  } catch (error: unknown) {
    handleApiError(error);
  }
};

/** 모집글 작성 API */
export const addArticle = async (data: NewArticle) => {
  try {
    await api.post('/api/gather-articles', data);
  } catch (error: unknown) {
    handleApiError(error);
  }
};

/** 모집글 수정 API */
export const editArticle = async (data: NewArticle, articleId: number) => {
  try {
    await api.put(`/api/gather-articles/${articleId}`, data);
  } catch (error: unknown) {
    handleApiError(error);
  }
};

/** 모집글 삭제 API */
export const deleteArticle = async (articleId: number) => {
  try {
    await api.delete(`/api/gather-articles/${articleId}`);
  } catch (error: any) {
    handleApiError(error);
  }
};
