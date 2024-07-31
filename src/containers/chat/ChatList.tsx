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
          gatherArticleSimpleInfo={chat.gatherArticleSimpleInfo}
          lastChatMessageInfo={chat.lastChatMessageInfo}
        />
      ))}
    </div>
  );
};

export default ChatList;
