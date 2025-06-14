import { ChatRoom, Message } from '@/types/chat';
import useWebSocket from '@/hooks/custom/useWebSocket';
import ChatSection from './ChatSection';
import ChatInput from './ChatInput';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { useGetExistingMessages } from '@/hooks/useChat';
import Loading from '@/components/Loading';

interface Props {
  chatRoomId: ChatRoom['chatRoomId'];
  messages: Message[] | null;
  setMessages: Dispatch<SetStateAction<Message[] | null>>;
}

const ChatContainer = ({ chatRoomId, messages, setMessages }: Props) => {
  const [isInitialMessagesLoaded, setIsInitialMessagesLoaded] = useState(false);

  const { handleSendMessage } = useWebSocket(chatRoomId, setMessages);

  const { data, isPending, isError, fetchPreviousPage, hasPreviousPage } =
    useGetExistingMessages({
      chatRoomId,
    });

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
  }, [data]);

  useEffect(() => {
    if (!isInitialMessagesLoaded && messages !== null) {
      // 최초 메시지 세팅 완료
      setIsInitialMessagesLoaded(true);
    }
  }, [messages]);

  if (isPending || isError || messages === null || !isInitialMessagesLoaded) {
    return <Loading />;
  }

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
