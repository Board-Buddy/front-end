'use client';

import {
  getArticleSimpleInfo,
  getChatList,
  getExistingMessages,
} from '@/services/chat';
import { CustomAxiosError, InfiniteScrollResponseData } from '@/types/api';
import { Article } from '@/types/article';
import { ArticleSimpleInfo, ChatRoom, Message } from '@/types/chat';
import { chatQueryKeys } from '@/utils/queryKeys';
import {
  useInfiniteQuery,
  useQuery,
  useSuspenseQuery,
} from '@tanstack/react-query';

export const useGetChatList = () => {
  return useQuery<ChatRoom[], CustomAxiosError>({
    queryKey: chatQueryKeys.chatRoomList(),
    queryFn: getChatList,
    staleTime: 30 * 1000,
  });
};

export const useGetExistingMessages = ({
  chatRoomId,
}: {
  chatRoomId: ChatRoom['chatRoomId'];
}) =>
  useInfiniteQuery<InfiniteScrollResponseData<Message>, CustomAxiosError>({
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

export const useGetArticleSimpleInfo = (
  chatRoomId: ChatRoom['chatRoomId'],
  articleId: Article['id'],
) => {
  return useSuspenseQuery<Omit<ArticleSimpleInfo, 'id'>>({
    queryKey: chatQueryKeys.articleSimpleInfo(chatRoomId, articleId),
    queryFn: () => getArticleSimpleInfo(chatRoomId, articleId),
    staleTime: 30 * 1000,
    gcTime: 5 * 60 * 1000,
  });
};
