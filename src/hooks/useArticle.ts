import {
  addArticle,
  deleteArticle,
  editArticle,
  getArticle,
  getArticles,
  searchArticles,
} from '@/services/article';
import { CustomError } from '@/types/api';
import { Article, NewArticle } from '@/types/article';
import {
  useInfiniteQuery,
  useMutation,
  useQuery,
  useQueryClient,
} from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { useRouter } from 'next/navigation';

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
    staleTime: 30 * 1000,
    gcTime: 5 * 60 * 1000,
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

export const useAddArticle = () => {
  const queryClient = useQueryClient();
  const router = useRouter();

  return useMutation({
    mutationFn: (data: NewArticle) => addArticle(data),
    onSuccess: () => {
      router.push('/home');
      // 성공 시 모집글 리스트 쿼리 무효화
      queryClient.invalidateQueries({
        queryKey: ['articles'],
      });
    },
  });
};

export const useEditArticle = (articleId: number) => {
  const queryClient = useQueryClient();
  const router = useRouter();

  return useMutation({
    mutationFn: (data: NewArticle) => editArticle(data, articleId),
    onSuccess: () => {
      router.push('/home');
      // 성공 시 모집글 쿼리 무효화
      queryClient.invalidateQueries({
        queryKey: ['article', { articleId }],
      });
    },
  });
};

export const useDeleteArticle = (articleId: number) => {
  const queryClient = useQueryClient();
  const router = useRouter();

  return useMutation({
    mutationFn: () => deleteArticle(articleId),
    onSuccess: () => {
      router.push('/home');
      // 성공 시 모집글 리스트 쿼리 무효화
      queryClient.invalidateQueries({
        queryKey: ['articles'],
      });
    },
  });
};

export const useSearchArticles = (query: string) => {
  return useQuery<Article[], AxiosError<CustomError>>({
    queryKey: ['search', { query }],
    queryFn: () => searchArticles(query),
    enabled: false,
    staleTime: 1 * 60 * 1000,
    gcTime: 1 * 60 * 1000,
  });
};
