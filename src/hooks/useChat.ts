import { getExistingMessages } from '@/services/chat';
import { Message } from '@/types/chat';
import { useQuery } from '@tanstack/react-query';

export const useGetExistingMessages = (chatRoomId: number | string) => {
  return useQuery<Message[]>({
    queryKey: ['chat', { chatRoomId }],
    queryFn: () => getExistingMessages(chatRoomId),
    staleTime: 0,
    gcTime: 0,
  });
};
