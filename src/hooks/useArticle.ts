import {
  addArticle,
  deleteArticle,
  editArticle,
  getArticle,
  getArticles,
} from '@/services/article';
import { Article, NewArticle } from '@/types/article';
import {
  useInfiniteQuery,
  useMutation,
  useQuery,
  useQueryClient,
} from '@tanstack/react-query';
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
    staleTime: 0,
    gcTime: 0,
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
      // TODO queryKey 확인
      queryClient.invalidateQueries({
        queryKey: ['articles'],
      });
    },
    retry: 0,
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
    retry: 0,
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
      // TODO queryKey 확인
      queryClient.invalidateQueries({
        queryKey: ['articles'],
      });
    },
    retry: 0,
  });
};
