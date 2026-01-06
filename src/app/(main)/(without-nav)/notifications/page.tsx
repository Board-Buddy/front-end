import { QueryFallbackBoundary } from '@/components/QueryFallbackBoundary';
import NotificationList from '@/containers/notifications/NotificationList';
import NotificationListContainer from '@/containers/notifications/NotificationListContainer';
import { getNotificationListOptions } from '@/hooks/useNotifications';
import { getQueryClient } from '@/utils/get-query-client';
import { dehydrate, HydrationBoundary } from '@tanstack/react-query';

const Page = async () => {
  const queryClient = getQueryClient();

  queryClient.prefetchQuery(getNotificationListOptions());

  const dehydratedState = dehydrate(queryClient);

  return (
    <HydrationBoundary state={dehydratedState}>
      <NotificationListContainer>
        <QueryFallbackBoundary>
          <NotificationList />
        </QueryFallbackBoundary>
      </NotificationListContainer>
    </HydrationBoundary>
  );
};

export default Page;
