'use client';

import { useGetChatList } from '@/hooks/useChat';
import ChatItem from './ChatItem';

const ChatList = () => {
  const { data: chatRooms } = useGetChatList();

  return (
    <div className="flex flex-col gap-3">
      {chatRooms.map((chat) => (
        <ChatItem
          key={chat.chatRoomId}
          chatRoomId={chat.chatRoomId}
          gatherArticleSimpleInfo={chat.gatherArticleSimpleInfo}
          latestChatMessageInfo={chat.latestChatMessageInfo}
        />
      ))}
    </div>
  );
};

export default ChatList;
