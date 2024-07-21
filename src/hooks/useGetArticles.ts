import { getArticles } from '@/services/article';
import { useInfiniteQuery } from '@tanstack/react-query';

export const useGetArticles = (status: string | null, sort: string | null) => {
  return useInfiniteQuery({
    queryKey: ['articles', { status, sort }],
    queryFn: ({ pageParam = 0 }) => getArticles({ pageParam, status, sort }),
    initialPageParam: 0,
    getNextPageParam: (lastPage, allPages, lastPageParam) => {
      if (lastPage.last) {
        return undefined;
      }
      return lastPageParam + 1;
    },
  });
};
