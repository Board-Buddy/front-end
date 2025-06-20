import {
  addArticle,
  deleteArticle,
  editArticle,
  getArticle,
  getArticles,
  searchArticles,
} from '@/services/article';
import { CustomAxiosError } from '@/types/api';
import { Article, NewArticle } from '@/types/article';
import { successToast } from '@/utils/customToast';
import {
  InfiniteData,
  useInfiniteQuery,
  useMutation,
  useQuery,
  useQueryClient,
} from '@tanstack/react-query';
import { useRouter } from 'next/navigation';

export const useGetArticles = (status: string | null, sort: string | null) =>
  useInfiniteQuery<
    {
      posts: Article[];
      last: boolean;
    },
    CustomAxiosError,
    InfiniteData<{
      posts: Article[];
      last: boolean;
    }>,
    [string, { status: string | null; sort: string | null }],
    number
  >({
    queryKey: ['articles', { status, sort }],
    queryFn: ({ pageParam = 0 }) => getArticles({ pageParam, status, sort }),
    initialPageParam: 0,
    getNextPageParam: (lastPage, _, lastPageParam) => {
      if (lastPage.last) {
        return undefined;
      }
      return lastPageParam + 1;
    },
    staleTime: 30 * 1000,
    gcTime: 5 * 60 * 1000,
  });

export const useGetArticle = (articleId: Article['id']) =>
  useQuery<Omit<Article, 'id'>, CustomAxiosError>({
    queryKey: ['article', { articleId }],
    queryFn: () => getArticle(articleId),
    staleTime: 0,
    gcTime: 0,
  });

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
      successToast('article create', '모집글이 등록되었습니다.');
    },
  });
};

export const useEditArticle = (articleId: Article['id']) => {
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
      successToast('article edit', '모집글이 수정되었습니다.');
    },
  });
};

export const useDeleteArticle = (articleId: Article['id']) => {
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
      successToast('article delete', '모집글이 삭제되었습니다.');
    },
  });
};

export const useSearchArticles = (query: string) =>
  useQuery<Article[], CustomAxiosError>({
    queryKey: ['search', { query }],
    queryFn: () => searchArticles(query),
    enabled: false,
    staleTime: 1 * 60 * 1000,
    gcTime: 1 * 60 * 1000,
  });
