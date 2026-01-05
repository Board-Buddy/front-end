import { QueryFallbackBoundary } from '@/components/QueryFallbackBoundary';
import BadgeListDetail from '@/containers/profile/BadgeListDetail';
import { getBadgeListOptions } from '@/hooks/useProfile';
import getQueryClient from '@/utils/getQueryClient';
import { dehydrate, HydrationBoundary } from '@tanstack/react-query';

const page = async ({ params }: PageProps<'/profile/[nickname]/badges'>) => {
  const { nickname } = await params;

  const queryClient = getQueryClient();

  queryClient.prefetchQuery(getBadgeListOptions(nickname));

  const dehydratedState = dehydrate(queryClient);

  return (
    <HydrationBoundary state={dehydratedState}>
      <QueryFallbackBoundary>
        <BadgeListDetail nickname={nickname} />
      </QueryFallbackBoundary>
    </HydrationBoundary>
  );
};

export default page;
