'use client';

import { useGetChatList } from '@/hooks/useChat';
import Loading from '@/components/Loading';
import ErrorFallback from '@/components/ErrorFallback';
import Image from 'next/image';
import ChatItem from './ChatItem';

const ChatList = () => {
  const {
    data: chatRooms,
    isPending,
    isError,
    error,
    refetch,
  } = useGetChatList();

  if (isPending) {
    return <Loading />;
  }

  if (isError) {
    return (
      <ErrorFallback errMsg={error.response?.data.message} reset={refetch} />
    );
  }

  return (
    <div className="flex h-[calc(100vh-113px)] flex-col bg-gray-100">
      <div className="flex items-center border-b border-primary bg-white py-4">
        <div className="pl-8 text-3xl">
          <p className="text-gray-700">
            <span className="font-extrabold text-primary">보드</span>게임할사람
          </p>
          <p className="text-gray-700">
            여기<span className="font-extrabold text-primary">버디</span>모여라
          </p>
        </div>
        <Image
          src="/images/sundy/sundy_chess_peeking.png"
          alt="빼꼼 쳐다보는 썬디"
          width={120}
          height={147}
          className="ml-auto"
        />
      </div>
      <div className="flex w-full flex-col gap-3 bg-gray-100 px-8 py-4">
        {chatRooms.map((chat) => (
          <ChatItem
            key={chat.chatRoomId}
            chatRoomId={chat.chatRoomId}
            gatherArticleSimpleInfo={chat.gatherArticleSimpleInfo}
            latestChatMessageInfo={chat.latestChatMessageInfo}
          />
        ))}
      </div>
    </div>
  );
};

export default ChatList;
