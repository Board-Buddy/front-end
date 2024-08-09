import NotificationList from '@/containers/notifications/NotificationList';
import { getNotificationList } from '@/services/notification';
import getQueryClient from '@/utils/getQueryClient';
import { dehydrate, HydrationBoundary } from '@tanstack/react-query';

const Page = async () => {
  const queryClient = getQueryClient();

  await queryClient.prefetchQuery({
    queryKey: ['notifications'],
    queryFn: getNotificationList,
  });

  return (
    <>
      <HydrationBoundary state={dehydrate(queryClient)}>
        <NotificationList />
      </HydrationBoundary>
    </>
  );
};

export default Page;
