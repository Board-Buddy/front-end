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
    <div className="flex flex-col bg-gray-100 h-[calc(100vh-113px)]">
      <div className="flex py-4 items-center border-b border-primary bg-white">
        <div className="pl-8 text-3xl">
          <p>
            <span className="font-extrabold text-primary">보드</span>게임할사람
          </p>
          <p>
            여기<span className="font-extrabold text-primary">버디</span>모여라
          </p>
        </div>
        <Image
          src="/images/sundy/sundy_chess_peeking.png"
          alt="빼꼼 쳐다보는 썬디"
          width={120}
          height={120}
          className="ml-auto"
        />
      </div>
      <div className="flex flex-col gap-3 w-full bg-gray-100 py-4 px-8">
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
