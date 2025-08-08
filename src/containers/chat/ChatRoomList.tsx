'use client';

import { useGetChatRoomList } from '@/hooks/useChat';
import Loading from '@/components/Loading';
import ErrorFallback from '@/components/ErrorFallback';
import ChatItem from './ChatItem';

const ChatRoomList = () => {
  const {
    data: chatRooms,
    isPending,
    isError,
    error,
    refetch,
  } = useGetChatRoomList();

  if (isPending) {
    return <Loading />;
  }

  if (isError) {
    if (error.response?.status === 401) {
      throw error;
    }

    return (
      <ErrorFallback reset={refetch} errMsg={error.response!.data.message} />
    );
  }

  return (
    <div className="flex w-full flex-col gap-3 px-8 py-4">
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

export default ChatRoomList;
