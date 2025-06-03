import {
  addComment,
  deleteComment,
  editComment,
  getComments,
} from '@/services/comment';
import { AxiosCustomError } from '@/types/api';
import { Article } from '@/types/article';
import { Comment, Reply } from '@/types/comment';
import { successToast } from '@/utils/customToast';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

export const useGetComments = (articleId: Article['id']) => {
  return useQuery<Comment[], AxiosCustomError>({
    queryKey: ['comments', { articleId }],
    queryFn: () => getComments({ gatherArticleId: articleId }),
    staleTime: 0,
    gcTime: 3 * 60 * 1000,
  });
};

export const useAddComment = (articleId: Article['id']) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      content,
      parentId,
    }: {
      content: Reply['content'];
      parentId?: Reply['id'];
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

export const useEditComment = (articleId: Article['id']) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      content,
      commentId,
    }: {
      content: Reply['content'];
      commentId: Reply['id'];
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

export const useDeleteComment = (articleId: Article['id']) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (commentId: Reply['id']) =>
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
