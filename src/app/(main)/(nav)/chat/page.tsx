import { QueryFallbackBoundary } from '@/components/QueryFallbackBoundary';
import ChatRoomList from '@/containers/chat/ChatRoomList';
import ChatRoomListContainer from '@/containers/chat/ChatRoomListContainer';
import { getChatRoomListOptions } from '@/hooks/useChat';
import getQueryClient from '@/utils/getQueryClient';
import { dehydrate, HydrationBoundary } from '@tanstack/react-query';

const page = () => {
  const queryClient = getQueryClient();

  queryClient.prefetchQuery(getChatRoomListOptions);

  const dehydratedState = dehydrate(queryClient);

  return (
    <ChatRoomListContainer>
      <HydrationBoundary state={dehydratedState}>
        <QueryFallbackBoundary>
          <ChatRoomList />
        </QueryFallbackBoundary>
      </HydrationBoundary>
    </ChatRoomListContainer>
  );
};

export default page;
