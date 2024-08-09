import {
  addComment,
  deleteComment,
  editComment,
  getComments,
} from '@/services/comment';
import { AxiosCustomError } from '@/types/api';
import { Comment } from '@/types/comment';
import { successToast } from '@/utils/customToast';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

export const useGetComments = (articleId: number) => {
  return useQuery<Comment[], AxiosCustomError>({
    queryKey: ['comments', { articleId }],
    queryFn: () => getComments({ gatherArticleId: articleId }),
    staleTime: 0,
    gcTime: 3 * 60 * 1000,
  });
};

export const useAddComment = (articleId: number) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      content,
      parentId,
    }: {
      content: string;
      parentId?: string;
    }) =>
      addComment({
        gatherArticleId: articleId,
        content,
        parentId,
      }),
    onSuccess: () => {
      // 성공 시 댓글 쿼리 리스트 무효화
      queryClient.invalidateQueries({ queryKey: ['comments', { articleId }] });
    },
    retry: 0,
  });
};

export const useEditComment = (articleId: number) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      content,
      commentId,
    }: {
      content: string;
      commentId: string;
    }) =>
      editComment({
        gatherArticleId: articleId,
        content,
        commentId,
      }),
    onSuccess: () => {
      // 성공 시 댓글 쿼리 리스트 무효화
      queryClient.invalidateQueries({ queryKey: ['comments', { articleId }] });
    },
    retry: 0,
  });
};

export const useDeleteComment = (articleId: number) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (commentId: string) =>
      deleteComment({
        gatherArticleId: articleId,
        commentId,
      }),
    onSuccess: () => {
      // 성공 시 댓글 리스트 쿼리 무효화
      queryClient.invalidateQueries({ queryKey: ['comments', { articleId }] });
      successToast('comment delete', '댓글이 삭제되었습니다.');
    },
    retry: 0,
  });
};
