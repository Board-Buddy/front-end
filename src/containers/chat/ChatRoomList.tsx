'use client';

import { useGetChatRoomList } from '@/hooks/useChat';
import Loading from '@/components/Loading';
import ErrorFallback from '@/components/ErrorFallback';
import ChatItem from './ChatItem';
import FallbackRender from '@/components/FallbackRender';
import EmptyFallback from '@/components/EmptyFallback';

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
      <FallbackRender
        render={chatRooms.length === 0}
        component={
          <EmptyFallback
            message={`아직 참여한 채팅방이 없어요🙂\n관심 있는 모집글에 참가 신청해보세요!`}
          />
        }
      >
        {chatRooms.map((chat) => (
          <ChatItem
            key={chat.chatRoomId}
            chatRoomId={chat.chatRoomId}
            gatherArticleSimpleInfo={chat.gatherArticleSimpleInfo}
            latestChatMessageInfo={chat.latestChatMessageInfo}
          />
        ))}
      </FallbackRender>
    </div>
  );
};

export default ChatRoomList;
