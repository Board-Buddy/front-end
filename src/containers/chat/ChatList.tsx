'use client';

import { useGetChatList } from '@/hooks/useChat';
import Loading from '@/components/Loading';
import ErrorFallback from '@/components/ErrorFallback';
import ChatItem from './ChatItem';

const ChatList = () => {
  const { data: chatRooms, isPending, isError, refetch } = useGetChatList();

  if (isPending) {
    return <Loading />;
  }

  if (isError) {
    return <ErrorFallback reset={refetch} />;
  }

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
