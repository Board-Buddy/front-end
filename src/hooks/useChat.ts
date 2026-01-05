import {
  getArticleSimpleInfo,
  getChatRoomList,
  getExistingMessages,
} from '@/services/chat';
import { Article } from '@/types/article';
import { ChatRoom } from '@/types/chat';
import { chatQueryKeys } from '@/utils/queryKeys';
import {
  infiniteQueryOptions,
  queryOptions,
  useSuspenseInfiniteQuery,
  useSuspenseQuery,
} from '@tanstack/react-query';

export const getChatRoomListOptions = queryOptions({
  queryKey: chatQueryKeys.chatRoomList(),
  queryFn: getChatRoomList,
  staleTime: 30 * 1000,
});

export const useGetChatRoomList = () =>
  useSuspenseQuery(getChatRoomListOptions);

export const getExistingMessagesOptions = (
  chatRoomId: ChatRoom['chatRoomId'],
) =>
  infiniteQueryOptions({
    queryKey: chatQueryKeys.messageList(chatRoomId),
    queryFn: ({ pageParam }) => {
      const direction = pageParam === undefined ? 'initial' : 'older';

      return getExistingMessages(
        chatRoomId,
        direction,
        pageParam as undefined | string,
      );
    },
    initialPageParam: undefined as string | undefined,
    getNextPageParam: () => undefined,
    getPreviousPageParam: (page) =>
      page.hasMore ? page.nextCursor : undefined,
    staleTime: 0,
  });

export const useGetExistingMessages = (chatRoomId: ChatRoom['chatRoomId']) =>
  useSuspenseInfiniteQuery(getExistingMessagesOptions(chatRoomId));

export const getArticleSimpleInfoOptions = (
  chatRoomId: ChatRoom['chatRoomId'],
  articleId: Article['id'],
) =>
  queryOptions({
    queryKey: chatQueryKeys.articleSimpleInfo(chatRoomId, articleId),
    queryFn: () => getArticleSimpleInfo(chatRoomId, articleId),
    staleTime: 30 * 1000,
    gcTime: 5 * 60 * 1000,
  });

export const useGetArticleSimpleInfo = (
  chatRoomId: ChatRoom['chatRoomId'],
  articleId: Article['id'],
) => useSuspenseQuery(getArticleSimpleInfoOptions(chatRoomId, articleId));
