import api from '@/services';

/** 모집글 리스트 조회 API */
export const getArticles = () =>
  api.get('/api/gatherArticles').then((response) => response.data.data.posts);
