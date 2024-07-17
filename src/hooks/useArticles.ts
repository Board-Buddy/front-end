import { getArticles } from '@/services/article';
import { ArticleList } from '@/types/article';
import { useQuery } from '@tanstack/react-query';

export const useGetArticles = () => {
  return useQuery<ArticleList>({
    queryKey: ['articles'],
    queryFn: getArticles,
  });
};
