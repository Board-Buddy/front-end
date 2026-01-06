import { QueryFallbackBoundary } from '@/components/QueryFallbackBoundary';
import ReviewTargetUserList from '@/containers/reviews/ReviewTargetUserList';
import { getReviewTargetUserListOptions } from '@/hooks/useReview';
import { getQueryClient } from '@/utils/get-query-client';
import { dehydrate, HydrationBoundary } from '@tanstack/react-query';

const page = async ({ params }: PageProps<'/article/[articleId]/reviews'>) => {
  const { articleId } = await params;

  const queryClient = getQueryClient();

  queryClient.prefetchQuery(getReviewTargetUserListOptions(Number(articleId)));

  const dehydratedState = dehydrate(queryClient);

  return (
    <div className="p-4">
      <HydrationBoundary state={dehydratedState}>
        <QueryFallbackBoundary>
          <ReviewTargetUserList articleId={Number(articleId)} />
        </QueryFallbackBoundary>
      </HydrationBoundary>
    </div>
  );
};

export default page;
