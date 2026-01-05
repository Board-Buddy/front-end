import {
  addArticle,
  deleteArticle,
  editArticle,
  getArticle,
  getArticleParticipationStatus,
  getArticles,
} from '@/services/article';
import { Article, GetArticleRequestParams, NewArticle } from '@/types/article';
import { successToast } from '@/utils/customToast';
import {
  infiniteQueryOptions,
  queryOptions,
  useMutation,
  useQueryClient,
  useSuspenseInfiniteQuery,
  useSuspenseQuery,
} from '@tanstack/react-query';
import useAppRouter from './custom/useAppRouter';
import { articleQueryKeys } from '@/utils/queryKeys';

export const getArticleListOptions = ({
  status,
  sort,
  sido,
  sgg,
  keyword,
  search,
}: GetArticleRequestParams & { search: boolean }) =>
  infiniteQueryOptions({
    queryKey: articleQueryKeys.list({
      status,
      sort,
      sido,
      sgg,
      keyword,
      search,
    }),
    queryFn: ({ pageParam = 0 }) =>
      getArticles({ pageParam, status, sort, sido, sgg, keyword }),
    initialPageParam: 0,
    getNextPageParam: (lastPage, _, lastPageParam) =>
      lastPage.last ? undefined : lastPageParam + 1,
    staleTime: 5 * 60 * 1000,
    gcTime: 5 * 60 * 1000,
    enabled: search ? !!keyword : true,
  });

export const useGetArticles = ({
  status,
  sort,
  sido,
  sgg,
  keyword,
  search,
}: GetArticleRequestParams & { search: boolean }) =>
  useSuspenseInfiniteQuery(
    getArticleListOptions({ status, sort, sido, sgg, keyword, search }),
  );

export const getArticleOptions = (articleId: Article['id']) =>
  queryOptions({
    queryKey: articleQueryKeys.detail(articleId),
    queryFn: () => getArticle(articleId),
    staleTime: 0,
    gcTime: 0,
  });

export const useGetArticle = (articleId: Article['id']) =>
  useSuspenseQuery(getArticleOptions(articleId));

export const getArticleParticipationStatusOptions = (
  articleId: Article['id'],
) =>
  queryOptions({
    queryKey: articleQueryKeys.participationStatus(articleId),
    queryFn: () => getArticleParticipationStatus(articleId),
    staleTime: 0,
    gcTime: 0,
  });

export const useGetArticleParticipationStatus = (articleId: Article['id']) =>
  useSuspenseQuery(getArticleParticipationStatusOptions(articleId));

export const useAddArticle = () => {
  const queryClient = useQueryClient();
  const router = useAppRouter();

  return useMutation({
    mutationFn: (data: NewArticle) => addArticle(data),
    onSuccess: () => {
      router.push({ href: '/home', screenName: 'HomeScreen' });

      queryClient.invalidateQueries({
        queryKey: articleQueryKeys.listAll(),
      });

      successToast('article create', '모집글이 등록되었습니다.');
    },
  });
};

export const useEditArticle = (articleId: Article['id']) => {
  const queryClient = useQueryClient();
  const router = useAppRouter();

  return useMutation({
    mutationFn: (data: NewArticle) => editArticle(data, articleId),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: articleQueryKeys.listAll(),
      });

      queryClient.invalidateQueries({
        queryKey: articleQueryKeys.detail(articleId),
      });

      router.replace({
        href: `/article/${articleId}`,
        headerTitle: '모집글 상세',
      });

      successToast('article edit', '모집글이 수정되었습니다.');
    },
  });
};

export const useDeleteArticle = (articleId: Article['id']) => {
  const queryClient = useQueryClient();
  const router = useAppRouter();

  return useMutation({
    mutationFn: () => deleteArticle(articleId),
    onSuccess: () => {
      router.replace({ href: '/home', screenName: 'HomeScreen' });

      queryClient.invalidateQueries({
        queryKey: articleQueryKeys.listAll(),
      });

      successToast('article delete', '모집글이 삭제되었습니다.');
    },
  });
};
