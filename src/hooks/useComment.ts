import { getComments } from '@/services/comment';
import { Comment } from '@/types/comment';
import { useQuery } from '@tanstack/react-query';

export const useGetComments = (articleId: number) => {
  return useQuery<Comment[]>({
    queryKey: ['comments', { articleId }],
    queryFn: () => getComments({ gatherArticleId: articleId }),
    staleTime: 0,
    gcTime: 0,
  });
};
