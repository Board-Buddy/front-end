import Banner from '@/containers/home/Banner';
import NotificationButton from '@/containers/home/NotificationButton';
import ArticleListContainer from '@/containers/home/ArticleListContainer';
import HomeSearchInput from '@/containers/search/HomeSearchInput';
import {
  dehydrate,
  HydrationBoundary,
  infiniteQueryOptions,
} from '@tanstack/react-query';
import RankingContainer from '@/containers/home/RankingContainer';
import { getArticleListOptions } from '@/hooks/useArticle';
import { getRankingsOptions } from '@/hooks/useRankings';
import { getQueryClient } from '@/utils/get-query-client';

// 필터 기본값 상수화
// TODO: searchParams 활용해 필터 초기값 설정하기
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
  queryClient.prefetchQuery(getRankingsOptions());

  // 필터 기본값 상수화
  // TODO: searchParams 활용해 필터 초기값 설정하기
  queryClient.prefetchInfiniteQuery(
    infiniteQueryOptions(getArticleListOptions(DEFAULT_FILTER)),
  );

  const dehydratedState = dehydrate(queryClient);

  return (
    <>
      <NotificationButton />
      <Banner />
      <HomeSearchInput />
      <HydrationBoundary state={dehydratedState}>
        <RankingContainer />
        <div className="flex flex-1 p-8 pt-2">
          <ArticleListContainer />
        </div>
      </HydrationBoundary>
    </>
  );
};

export default page;
