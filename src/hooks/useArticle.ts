import {
  addArticle,
  deleteArticle,
  editArticle,
  getArticle,
  getArticleParticipationStatus,
  getArticles,
} from '@/services/article';
import { CustomAxiosError } from '@/types/api';
import { Article, GetArticleRequestParams, NewArticle } from '@/types/article';
import { successToast } from '@/utils/customToast';
import {
  InfiniteData,
  useInfiniteQuery,
  useMutation,
  useQuery,
  useQueryClient,
} from '@tanstack/react-query';
import { useRouter } from 'next/navigation';

export const useGetArticles = ({
  status,
  sort,
  sido,
  sgg,
  keyword,
  search,
}: GetArticleRequestParams & { search: boolean }) =>
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
    [string, 'search' | 'browse', Omit<GetArticleRequestParams, 'pageParam'>],
    number
  >({
    queryKey: [
      'articles',
      search ? 'search' : 'browse',
      { status, sort, sido, sgg, keyword },
    ],
    queryFn: ({ pageParam = 0 }) =>
      getArticles({ pageParam, status, sort, sido, sgg, keyword }),
    initialPageParam: 0,
    getNextPageParam: (lastPage, _, lastPageParam) =>
      lastPage.last ? undefined : lastPageParam + 1,
    staleTime: 5 * 60 * 1000,
    gcTime: 5 * 60 * 1000,
    enabled: search ? !!keyword : true,
  });

export const useGetArticle = (articleId: Article['id']) =>
  useQuery<
    Omit<Article, 'id' | 'participationApplicationStatus'>,
    CustomAxiosError
  >({
    queryKey: ['article', { articleId }],
    queryFn: () => getArticle(articleId),
    staleTime: 0,
    gcTime: 0,
  });

export const useGetArticleParticipationStatus = (articleId: Article['id']) =>
  useQuery<
    {
      participationApplicationStatus: Article['participationApplicationStatus'];
    },
    CustomAxiosError
  >({
    queryKey: ['article', 'participation-status', { articleId }],
    queryFn: () => getArticleParticipationStatus(articleId),
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
