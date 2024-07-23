import { getArticle, getArticles } from '@/services/article';
import { Article } from '@/types/article';
import { useInfiniteQuery, useQuery } from '@tanstack/react-query';

export const useGetArticles = (
  location: string,
  status: string | null,
  sort: string | null,
) => {
  return useInfiniteQuery({
    queryKey: ['articles', { location, status, sort }],
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

export const useGetArticle = (articleId: number) => {
  return useQuery<Omit<Article, 'id'>>({
    queryKey: ['article', { articleId }],
    queryFn: () => getArticle({ gatherArticleId: articleId }),
    staleTime: 0,
    gcTime: 0,
  });
};
