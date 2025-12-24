import { QueryFallbackBoundary } from '@/components/QueryFallbackBoundary';
import ParticipantList from '@/containers/participants/ParticipantList';
import { getParticipationListOptions } from '@/hooks/useParticipation';
import getQueryClient from '@/utils/getQueryClient';
import { dehydrate, HydrationBoundary } from '@tanstack/react-query';

const page = async ({
  params,
}: PageProps<'/article/[articleId]/participants'>) => {
  const { articleId } = await params;

  const queryClient = getQueryClient();

  queryClient.prefetchQuery(getParticipationListOptions(Number(articleId)));

  const dehydratedState = dehydrate(queryClient);

  return (
    <HydrationBoundary state={dehydratedState}>
      <QueryFallbackBoundary>
        <ParticipantList articleId={Number(articleId)} />
      </QueryFallbackBoundary>
    </HydrationBoundary>
  );
};

export default page;
