import { getArticles } from '@/services/article';
import { ArticleList } from '@/types/article';
import { useInfiniteQuery, useQuery } from '@tanstack/react-query';

export const useGetArticles = (status: string, sort: string) => {
  return useInfiniteQuery<ArticleList>({
    queryKey: ['articles'],
    queryFn: getArticles({ status, sort}),
    initialPageParam: 0,
    getNextPageParam: 
  });
};
