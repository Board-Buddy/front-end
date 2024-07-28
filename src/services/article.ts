import api from '@/services';
import { ArticleRequest, NewArticle } from '@/types/article';

/** 모집글 리스트 조회 API */
export const getArticles = ({ pageParam, status, sort }: ArticleRequest) =>
  api
    .get('/api/gatherArticles', {
      params: { page: pageParam, status, sort },
    })
    .then((response) => response.data.data);

/** 모집글 상세 조회 API */
export const getArticle = ({ gatherArticleId }: { gatherArticleId: number }) =>
  api
    .get(`/api/gatherArticles/${gatherArticleId}`)
    .then((response) => response.data.data.post);

/** 모집글 작성 API */
export const addArticle = async (data: NewArticle) => {
  try {
    const response = await api.post('/api/gatherArticles', data);

    return {
      status: 'success',
      data: response.data.data,
      message: response.data.message,
    };
  } catch (error: any) {
    if (error.response) {
      // 서버 응답 오류 처리
      return {
        status: 'error',
        message: error.response.data.message || '서버 오류가 발생했습니다.',
      };
    }
    // 기타 오류 처리
    return {
      status: 'error',
      message: '알 수 없는 오류가 발생했습니다. 다시 시도해주세요.',
    };
  }
};

/** 모집글 수정 API */
export const editArticle = async (data: NewArticle, articleId: number) => {
  try {
    const response = await api.put(`/api/gatherArticles/${articleId}`, data);

    return {
      status: 'success',
      data: response.data.data,
      message: response.data.message,
    };
  } catch (error: any) {
    if (error.response) {
      // 서버 응답 오류 처리
      return {
        status: 'error',
        message: error.response.data.message || '서버 오류가 발생했습니다.',
      };
    }
    // 기타 오류 처리
    return {
      status: 'error',
      message: '알 수 없는 오류가 발생했습니다. 다시 시도해주세요.',
    };
  }
};

/** 모집글 삭제 API */
export const deleteArticle = async (articleId: number) => {
  try {
    const response = await api.delete(`/api/gatherArticles/${articleId}`);

    return {
      status: 'success',
      data: response.data.data,
      message: response.data.message,
    };
  } catch (error: any) {
    if (error.response) {
      // 서버 응답 오류 처리
      return {
        status: 'error',
        message: error.response.data.message || '서버 오류가 발생했습니다.',
      };
    }
    // 기타 오류 처리
    return {
      status: 'error',
      message: '알 수 없는 오류가 발생했습니다. 다시 시도해주세요.',
    };
  }
};
