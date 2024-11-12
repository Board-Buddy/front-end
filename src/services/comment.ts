import api from '@/services';

/** 댓글 리스트 조회 API */
export const getComments = ({ gatherArticleId }: { gatherArticleId: number }) =>
  api
    .get(`/v1/gather-articles/${gatherArticleId}/comments`)
    .then((response) => response.data.data.comments);

/** 댓글 작성 API */
export const addComment = ({
  gatherArticleId,
  content,
  parentId,
}: {
  gatherArticleId: number;
  content: string;
  parentId?: string;
}) => {
  return parentId
    ? api.post(`/v1/gather-articles/${gatherArticleId}/comments/${parentId}`, {
        content,
      })
    : api.post(`/v1/gather-articles/${gatherArticleId}/comments`, {
        content,
      });
};

/** 댓글 수정 API */
export const editComment = async ({
  gatherArticleId,
  content,
  commentId,
}: {
  gatherArticleId: number;
  content: string;
  commentId: string;
}) =>
  api.put(`/v1/gather-articles/${gatherArticleId}/comments/${commentId}`, {
    content,
  });

/** 댓글 삭제 API */
export const deleteComment = async ({
  gatherArticleId,
  commentId,
}: {
  gatherArticleId: number;
  commentId: string;
}) =>
  api.delete(`/v1/gather-articles/${gatherArticleId}/comments/${commentId}`);
