import api from '@/services';

/** 댓글 리스트 조회 API */
export const getComments = ({ gatherArticleId }: { gatherArticleId: number }) =>
  api
    .get(`/api/gatherArticles/${gatherArticleId}/comments`)
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
    ? api
        .post(`/api/gatherArticles/${gatherArticleId}/comments/${parentId}`, {
          content,
        })
        .then((response) => response.data.status)
    : api
        .post(`/api/gatherArticles/${gatherArticleId}/comments`, {
          content,
        })
        .then((response) => response.data.status);
};

/** 댓글 수정 API */
export const editComment = ({
  gatherArticleId,
  content,
  commentId,
}: {
  gatherArticleId: number;
  content: string;
  commentId: string;
}) =>
  api
    .put(`/api/gatherArticles/${gatherArticleId}/comments/${commentId}`, {
      content,
    })
    .then((response) => response.data.status);
