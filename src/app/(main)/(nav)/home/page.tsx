import Banner from '@/containers/home/Banner';
import NotificationButton from '@/containers/home/NotificationButton';
import ArticleListContainer from '@/containers/home/ArticleListContainer';
import HomeSearchInput from '@/containers/search/HomeSearchInput';
import {
  dehydrate,
  HydrationBoundary,
  infiniteQueryOptions,
  queryOptions,
} from '@tanstack/react-query';
import { rankingQueryKeys } from '@/utils/queryKeys';
import RankingContainer from '@/containers/home/RankingContainer';
import getQueryClient from '@/utils/getQueryClient';
import { getArticleListOptions } from '@/hooks/useArticle';

const DEFAULT_FILTER = {
  status: null,
  sort: null,
  sido: null,
  sgg: null,
  keyword: null,
  search: false,
};

const page = () => {
  const queryClient = getQueryClient();

  queryClient.prefetchQuery(queryOptions({ queryKey: rankingQueryKeys.all }));

  // 필터 기본값 상수화
  // TODO: searchParams 활용해 필터 초기값 설정하기
  queryClient.prefetchInfiniteQuery(
    infiniteQueryOptions(getArticleListOptions(DEFAULT_FILTER)),
  );

  const dehydratedState = dehydrate(queryClient);

  return (
    <div>
      <NotificationButton />
      <Banner />
      <HomeSearchInput />
      <HydrationBoundary state={dehydratedState}>
        <RankingContainer />
        <div className="p-8 pt-2">
          <ArticleListContainer />
        </div>
      </HydrationBoundary>
    </div>
  );
};

export default page;
