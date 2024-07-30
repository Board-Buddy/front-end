import useWebSocket from '@/hooks/custom/useWebSocket';
import { Message } from '@/types/chat';
import ChatSection from './ChatSection';
import ChatInput from './ChatInput';

interface Props {
  chatRoomId: string;
  chatMessages: Message[];
}

const WebSocketContainer = ({ chatRoomId, chatMessages }: Props) => {
  const { messages, handleSendMessage } = useWebSocket(
    chatRoomId,
    chatMessages,
  );

  return (
    <>
      <ChatSection messages={messages} />
      <ChatInput sendMessage={handleSendMessage} />
    </>
  );
};

export default WebSocketContainer;
