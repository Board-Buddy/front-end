import ChatList from '@/containers/chat/ChatList';
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
        <ChatList />
      </HydrationBoundary>
    </>
  );
};

export default Page;
