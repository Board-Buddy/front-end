'use client';

import { useGetChatList } from '@/hooks/useChat';
import ChatItem from './ChatItem';

const ChatList = () => {
  const { data: chatRooms, isPending, isError, error } = useGetChatList();

  if (isPending) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div className="flex flex-col gap-3">
      {chatRooms.map((chat) => (
        <ChatItem
          key={chat.chatRoomId}
          chatRoomId={chat.chatRoomId}
          gatherArticleId={chat.gatherArticleId}
          title={chat.title}
          participants={chat.participants}
          meetingLocation={chat.meetingLocation}
          lastMessage={chat.lastMessage}
        />
      ))}
    </div>
  );
};

export default ChatList;
