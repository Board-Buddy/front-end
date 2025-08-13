import Banner from '@/containers/home/Banner';
import Ranking from '@/containers/home/Ranking';
import { dehydrate, HydrationBoundary } from '@tanstack/react-query';
import { getRankings } from '@/services/ranking';
import getQueryClient from '@/utils/getQueryClient';
import NotificationButton from '@/containers/home/NotificationButton';
import ArticleListContainer from '@/containers/home/ArticleListContainer';
import { rankingQueryKeys } from '@/utils/queryKeys';
import HomeSearchInput from '@/containers/search/HomeSearchInput';

export const dynamic = 'force-dynamic';

const page = async () => {
  const queryClient = getQueryClient();

  await queryClient.prefetchQuery({
    queryKey: rankingQueryKeys.all,
    queryFn: getRankings,
  });

  return (
    <div>
      <NotificationButton />
      <Banner />
      <HomeSearchInput />
      <HydrationBoundary state={dehydrate(queryClient)}>
        <Ranking />
      </HydrationBoundary>
      <div className="p-8 pt-2">
        <ArticleListContainer />
      </div>
    </div>
  );
};

export default page;
