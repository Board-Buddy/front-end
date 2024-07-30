'use client';

import {
  getArticlePreview,
  getChatList,
  getExistingMessages,
} from '@/services/chat';
import { ArticlePreview, ChatRoom, Message } from '@/types/chat';
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

export const useGetArticlePreview = (
  chatRoomId: number | string,
  articleId: number | string,
) => {
  return useQuery<ArticlePreview>({
    queryKey: ['articlePreview', { chatRoomId, articleId }],
    queryFn: () => getArticlePreview(chatRoomId, articleId),
    staleTime: 0,
    gcTime: 0,
  });
};
