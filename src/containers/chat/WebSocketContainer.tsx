import { ChatRoom, Message } from '@/types/chat';
import useWebSocket from '@/hooks/custom/useWebSocket';
import ChatSection from './ChatSection';
import ChatInput from './ChatInput';

interface Props {
  chatRoomId: ChatRoom['chatRoomId'];
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
