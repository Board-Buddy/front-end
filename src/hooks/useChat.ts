'use client';

import {
  getArticleSimpleInfo,
  getChatList,
  getExistingMessages,
} from '@/services/chat';
import { CustomAxiosError } from '@/types/api';
import { Article } from '@/types/article';
import { ArticleSimpleInfo, ChatRoom, Message } from '@/types/chat';
import { useQuery, useSuspenseQuery } from '@tanstack/react-query';

export const useGetExistingMessages = (chatRoomId: ChatRoom['chatRoomId']) => {
  return useSuspenseQuery<Message[], CustomAxiosError>({
    queryKey: ['chat', { chatRoomId }],
    queryFn: () => getExistingMessages(chatRoomId),
    staleTime: 0,
    gcTime: 0,
  });
};

export const useGetChatList = () => {
  return useQuery<ChatRoom[], CustomAxiosError>({
    queryKey: ['chat'],
    queryFn: getChatList,
    staleTime: 60 * 1000,
    gcTime: 0,
  });
};

export const useGetArticleSimpleInfo = (
  chatRoomId: ChatRoom['chatRoomId'],
  articleId: Article['id'],
) => {
  return useSuspenseQuery<Omit<ArticleSimpleInfo, 'id'>>({
    queryKey: ['articlePreview', { chatRoomId, articleId }],
    queryFn: () => getArticleSimpleInfo(chatRoomId, articleId),
    staleTime: 30 * 1000,
    gcTime: 5 * 60 * 1000,
  });
};
