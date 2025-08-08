import ChatRoomList from '@/containers/chat/ChatRoomList';
import ChatRoomListContainer from '@/containers/chat/ChatRoomListContainer';
import { getChatRoomList } from '@/services/chat';
import getQueryClient from '@/utils/getQueryClient';
import { chatQueryKeys } from '@/utils/queryKeys';
import { dehydrate, HydrationBoundary } from '@tanstack/react-query';

const page = async () => {
  const queryClient = getQueryClient();

  await queryClient.prefetchQuery({
    queryKey: chatQueryKeys.chatRoomList(),
    queryFn: getChatRoomList,
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <ChatRoomListContainer>
        <ChatRoomList />
      </ChatRoomListContainer>
    </HydrationBoundary>
  );
};

export default page;
