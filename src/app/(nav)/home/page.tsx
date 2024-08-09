import Banner from '@/containers/home/Banner';
import Ranking from '@/containers/home/Ranking';
import WriteButton from '@/containers/home/WriteButton';
import { dehydrate, HydrationBoundary } from '@tanstack/react-query';
import { getRankings } from '@/services/ranking';
import getQueryClient from '@/utils/getQueryClient';
import ArticleList from '@/containers/home/ArticleList';
import NotificationButton from '@/containers/home/NotificationButton';
import SearchInputMockUp from '@/containers/search/SearchInputMockUp';

export const dynamic = 'force-dynamic';
export const fetchCache = 'force-no-store';

const page = async () => {
  const queryClient = getQueryClient();

  await queryClient.prefetchQuery({
    queryKey: ['ranking'],
    queryFn: getRankings,
  });

  return (
    <div className="relative">
      <NotificationButton />
      <Banner />
      <SearchInputMockUp />
      <HydrationBoundary state={dehydrate(queryClient)}>
        <Ranking />
      </HydrationBoundary>
      <ArticleList />
      <WriteButton />
    </div>
  );
};

export default page;
