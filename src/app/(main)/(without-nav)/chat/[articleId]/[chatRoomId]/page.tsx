import { QueryFallbackBoundary } from '@/components/QueryFallbackBoundary';
import ChatRoom from '@/containers/chat/ChatRoom';
import {
  getArticleSimpleInfoOptions,
  getExistingMessagesOptions,
} from '@/hooks/useChat';
import { getQueryClient } from '@/utils/get-query-client';
import { dehydrate, HydrationBoundary } from '@tanstack/react-query';

const Page = async ({
  params,
}: PageProps<'/chat/[articleId]/[chatRoomId]'>) => {
  const { articleId, chatRoomId } = await params;

  const queryClient = getQueryClient();

  queryClient.prefetchQuery(
    getArticleSimpleInfoOptions(Number(chatRoomId), Number(articleId)),
  );
  queryClient.prefetchInfiniteQuery(
    getExistingMessagesOptions(Number(chatRoomId)),
  );

  const dehydratedState = dehydrate(queryClient);

  return (
    <HydrationBoundary state={dehydratedState}>
      <QueryFallbackBoundary>
        <ChatRoom
          chatRoomId={Number(chatRoomId)}
          articleId={Number(articleId)}
        />
      </QueryFallbackBoundary>
    </HydrationBoundary>
  );
};

export default Page;
