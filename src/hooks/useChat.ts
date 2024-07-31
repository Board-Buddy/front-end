'use client';

import {
  getArticleSimpleInfo,
  getChatList,
  getExistingMessages,
} from '@/services/chat';
import { ArticleSimpleInfo, ChatRoom, Message } from '@/types/chat';
import { useQuery } from '@tanstack/react-query';

export const useGetExistingMessages = (chatRoomId: number | string) => {
  return useQuery<Message[]>({
    queryKey: ['chat', { chatRoomId }],
    queryFn: () => getExistingMessages(chatRoomId),
    staleTime: 0,
    gcTime: 0,
  });
};

export const useGetChatList = () => {
  return useQuery<ChatRoom[]>({
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
  return useQuery<ArticleSimpleInfo>({
    queryKey: ['articlePreview', { chatRoomId, articleId }],
    queryFn: () => getArticleSimpleInfo(chatRoomId, articleId),
    staleTime: 0,
    gcTime: 0,
  });
};
