import api from '@/services';
import { Article, GetArticleRequestParams, NewArticle } from '@/types/article';
import { SuccessResponse } from '@/types/api';
import { ENDPOINT } from './endpoint';

/** 모집글 리스트 조회 API */
export const getArticles = ({
  pageParam,
  status,
  sort,
  sido,
  sgg,
  keyword,
}: GetArticleRequestParams & { pageParam: number }) =>
  api
    .get<SuccessResponse<{ posts: Article[]; last: boolean }>>(
      ENDPOINT.GATHER_ARTICLE.LIST(),
      {
        params: { page: pageParam, status, sort, sido, sgg, keyword },
      },
    )
    .then((response) => response.data.data);

/** 모집글 상세 조회 API */
export const getArticle = (articleId: Article['id']) =>
  api
    .get<
      SuccessResponse<{ post: Omit<Article, 'id'> }>
    >(ENDPOINT.GATHER_ARTICLE.DETAIL(articleId))
    .then((response) => response.data.data.post);

/** 모집글 작성 API */
export const addArticle = (data: NewArticle) =>
  api
    .post<
      SuccessResponse<{ post: { id: number } }>
    >(ENDPOINT.GATHER_ARTICLE.LIST(), data)
    .then((response) => response.data.data);

/** 모집글 수정 API */
export const editArticle = (data: NewArticle, articleId: Article['id']) =>
  api.put<SuccessResponse<{ post: { id: number } }>>(
    ENDPOINT.GATHER_ARTICLE.DETAIL(articleId),
    data,
  );

/** 모집글 삭제 API */
export const deleteArticle = (articleId: Article['id']) =>
  api.delete<SuccessResponse<{ post: { id: number } }>>(
    ENDPOINT.GATHER_ARTICLE.DETAIL(articleId),
  );
