import { getArticles } from '@/services/article';
import { useInfiniteQuery } from '@tanstack/react-query';

export const useGetArticles = (status: string, sort: string) => {
  return useInfiniteQuery({
    queryKey: ['articles'],
    queryFn: getArticles,
    initialPageParam: 0,
    getNextPageParam: (lastPage, allPages, lastPageParam) => {
      if (lastPage.last) {
        return undefined;
      }
      return lastPageParam + 1;
    },
  });
};
