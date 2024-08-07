'use client';

import { useSearchArticles } from '../useArticle';

export const useSearchResultRefetch = (query: string) => {
  const { refetch, isRefetching } = useSearchArticles(query);

  return {
    refetch,
    isRefetching,
  };
};
