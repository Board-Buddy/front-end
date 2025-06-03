'use client';

import {
  getArticleSimpleInfo,
  getChatList,
  getExistingMessages,
} from '@/services/chat';
import { AxiosCustomError } from '@/types/api';
import { Article } from '@/types/article';
import { ArticleSimpleInfo, ChatRoom, Message } from '@/types/chat';
import { useQuery, useSuspenseQuery } from '@tanstack/react-query';

export const useGetExistingMessages = (chatRoomId: ChatRoom['chatRoomId']) => {
  return useSuspenseQuery<Message[], AxiosCustomError>({
    queryKey: ['chat', { chatRoomId }],
    queryFn: () => getExistingMessages(chatRoomId),
    staleTime: 0,
    gcTime: 0,
  });
};

export const useGetChatList = () => {
  return useQuery<ChatRoom[], AxiosCustomError>({
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
  return useSuspenseQuery<ArticleSimpleInfo>({
    queryKey: ['articlePreview', { chatRoomId, articleId }],
    queryFn: () => getArticleSimpleInfo(chatRoomId, articleId),
    staleTime: 30 * 1000,
    gcTime: 5 * 60 * 1000,
  });
};
