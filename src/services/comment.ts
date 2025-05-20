import api from '@/services';
import { ENDPOINT } from './endpoint';

/** 댓글 리스트 조회 API */
export const getComments = ({ gatherArticleId }: { gatherArticleId: number }) =>
  api
    .get(ENDPOINT.GATHER_ARTICLE.COMMENT.LIST(gatherArticleId))
    .then((response) => response.data.data.comments);

/** 댓글 작성 API */
export const addComment = ({
  gatherArticleId,
  content,
  parentId,
}: {
  gatherArticleId: number;
  content: string;
  parentId?: number;
}) =>
  api.post(ENDPOINT.GATHER_ARTICLE.COMMENT.LIST(gatherArticleId, parentId), {
    content,
  });

/** 댓글 수정 API */
export const editComment = async ({
  gatherArticleId,
  content,
  commentId,
}: {
  gatherArticleId: number;
  content: string;
  commentId: number;
}) =>
  api.put(ENDPOINT.GATHER_ARTICLE.COMMENT.DETAIL(gatherArticleId, commentId), {
    content,
  });

/** 댓글 삭제 API */
export const deleteComment = async ({
  gatherArticleId,
  commentId,
}: {
  gatherArticleId: number;
  commentId: number;
}) =>
  api.delete(
    ENDPOINT.GATHER_ARTICLE.COMMENT.DETAIL(gatherArticleId, commentId),
  );
