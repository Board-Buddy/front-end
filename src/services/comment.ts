import api from '@/services';
import { handleApiError } from '@/utils/handleApiError';

/** 댓글 리스트 조회 API */
export const getComments = async ({
  gatherArticleId,
}: {
  gatherArticleId: number;
}) => {
  try {
    const response = await api.get(
      `/api/gather-articles/${gatherArticleId}/comments`,
    );
    return response.data.data.comments;
  } catch (error: unknown) {
    handleApiError(error);
  }
};

/** 댓글 작성 API */
export const addComment = async ({
  gatherArticleId,
  content,
  parentId,
}: {
  gatherArticleId: number;
  content: string;
  parentId?: string;
}) => {
  try {
    let response;

    if (parentId) {
      response = await api.post(
        `/api/gather-articles/${gatherArticleId}/comments/${parentId}`,
        {
          content,
        },
      );
    } else {
      response = await api.post(
        `/api/gather-articles/${gatherArticleId}/comments`,
        {
          content,
        },
      );
    }

    return response.data.status;
  } catch (error: unknown) {
    handleApiError(error);
  }
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
}) => {
  try {
    const response = await api.put(
      `/api/gather-articles/${gatherArticleId}/comments/${commentId}`,
      {
        content,
      },
    );
    return response.data.status;
  } catch (error: unknown) {
    handleApiError(error);
  }
};

/** 댓글 삭제 API */
export const deleteComment = async ({
  gatherArticleId,
  commentId,
}: {
  gatherArticleId: number;
  commentId: string;
}) => {
  try {
    const response = await api.delete(
      `/api/gather-articles/${gatherArticleId}/comments/${commentId}`,
    );
    return response.data.status;
  } catch (error: unknown) {
    handleApiError(error);
  }
};
