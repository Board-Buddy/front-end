import api from '@/services';
import { Article } from '@/types/article';
import { Comment, Reply } from '@/types/comment';
import { SuccessResponse } from '@/types/api';
import { ENDPOINT } from './endpoint';

/** 댓글 리스트 조회 API */
export const getComments = ({
  gatherArticleId,
}: {
  gatherArticleId: Article['id'];
}) =>
  api
    .get<
      SuccessResponse<{ comments: Comment[] }>
    >(ENDPOINT.GATHER_ARTICLE.COMMENT.LIST(gatherArticleId))
    .then((response) => response.data.data.comments);

/** 댓글 작성 API */
export const addComment = ({
  gatherArticleId,
  content,
  parentId,
}: {
  gatherArticleId: Article['id'];
  content: Reply['content'];
  parentId?: Reply['id'];
}) =>
  api.post<SuccessResponse<null>>(
    ENDPOINT.GATHER_ARTICLE.COMMENT.LIST(gatherArticleId, parentId),
    {
      content,
    },
  );

/** 댓글 수정 API */
export const editComment = async ({
  gatherArticleId,
  content,
  commentId,
}: {
  gatherArticleId: Article['id'];
  content: Reply['content'];
  commentId: Reply['id'];
}) =>
  api.put<SuccessResponse<null>>(
    ENDPOINT.GATHER_ARTICLE.COMMENT.DETAIL(gatherArticleId, commentId),
    {
      content,
    },
  );

/** 댓글 삭제 API */
export const deleteComment = async ({
  gatherArticleId,
  commentId,
}: {
  gatherArticleId: Article['id'];
  commentId: Reply['id'];
}) =>
  api.delete<SuccessResponse<null>>(
    ENDPOINT.GATHER_ARTICLE.COMMENT.DETAIL(gatherArticleId, commentId),
  );
