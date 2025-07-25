'use client';

import { useUserInfo } from '@/hooks/custom/useUserInfo';
import Image from 'next/image';
import { ReactNode } from 'react';
import ChatListLoginPrompt from './ChatListLoginPrompt';

interface Props {
  children: ReactNode;
}

const ChatListContainer = ({ children }: Props) => {
  const userInfo = useUserInfo();

  return (
    <div className="flex h-full flex-col bg-gray-100">
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
      {userInfo ? children : <ChatListLoginPrompt />}
    </div>
  );
};

export default ChatListContainer;
