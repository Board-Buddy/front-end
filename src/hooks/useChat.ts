'use client';

import {
  getArticleSimpleInfo,
  getChatList,
  getExistingMessages,
} from '@/services/chat';
import { ArticleSimpleInfo, ChatRoom, Message } from '@/types/chat';
import { useSuspenseQuery } from '@tanstack/react-query';

export const useGetExistingMessages = (chatRoomId: number | string) => {
  return useSuspenseQuery<Message[]>({
    queryKey: ['chat', { chatRoomId }],
    queryFn: () => getExistingMessages(chatRoomId),
    staleTime: 0,
    gcTime: 0,
  });
};

export const useGetChatList = () => {
  return useSuspenseQuery<ChatRoom[]>({
    queryKey: ['chat'],
    queryFn: getChatList,
    staleTime: 0,
    gcTime: 0,
  });
};

export const useGetArticleSimpleInfo = (
  chatRoomId: number | string,
  articleId: number | string,
) => {
  return useSuspenseQuery<ArticleSimpleInfo>({
    queryKey: ['articlePreview', { chatRoomId, articleId }],
    queryFn: () => getArticleSimpleInfo(chatRoomId, articleId),
    staleTime: 30 * 1000,
    gcTime: 5 * 60 * 1000,
  });
};
