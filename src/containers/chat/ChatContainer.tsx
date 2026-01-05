import { ChatRoom, Message } from '@/types/chat';
import useWebSocket from '@/hooks/custom/useWebSocket';
import ChatSection from './ChatSection';
import ChatInput from './ChatInput';
import { Dispatch, SetStateAction, useEffect } from 'react';
import { useGetExistingMessages } from '@/hooks/useChat';

interface Props {
  chatRoomId: ChatRoom['chatRoomId'];
  messages: Message[];
  setMessages: Dispatch<SetStateAction<Message[]>>;
}

const ChatContainer = ({ chatRoomId, messages, setMessages }: Props) => {
  const { handleSendMessage } = useWebSocket(chatRoomId, setMessages);

  const { data, fetchPreviousPage, hasPreviousPage } =
    useGetExistingMessages(chatRoomId);

  useEffect(() => {
    if (!data) return;

    const pastMessages = data.pages.flatMap((page) => page.dataList);

    setMessages((prev) => {
      // 메시지 중복 방지를 위한 메시지 id 기반 필터링
      const existingIds = new Set((prev || []).map((message) => message.id));
      const uniquePastMessages = pastMessages.filter(
        (message) => !existingIds.has(message.id),
      );

      return [...uniquePastMessages, ...(prev || [])];
    });
  }, [setMessages, data]);

  return (
    <>
      <ChatSection
        messages={messages}
        hasPreviousPage={hasPreviousPage}
        fetchPreviousPage={fetchPreviousPage}
      />
      <ChatInput sendMessage={handleSendMessage} />
    </>
  );
};

export default ChatContainer;
