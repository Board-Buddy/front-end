'use client';

import { Message } from '@/types/chat';
import { useQueryClient } from '@tanstack/react-query';
import { UserInfo } from '@/types/user';
import { useEffect, useRef } from 'react';
import ReceivedMessage from './ReceivedMessage';
import SentMessage from './SentMessage';
import EnterExitMessage from './EnterExitMessage';

const ChatSection = ({ messages }: { messages: Message[] }) => {
  const cache = useQueryClient();
  const userInfo = cache.getQueryData(['userInfo']) as UserInfo;
  const { nickname } = userInfo;

  const scrollRef = useRef<HTMLDivElement>(null);
  const messageEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // 컴포넌트가 처음 마운트될 때 스크롤을 가장 아래로 이동시킨다.
    if (scrollRef && scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, []);

  useEffect(() => {
    // 새로운 메시지가 추가될 때 스크롤을 조정하여 가장 최근 메시지가 보이도록 한다.
    messageEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  return (
    <div className="h-[calc(100vh-222px)] overflow-y-auto" ref={scrollRef}>
      <div className="flex flex-col p-4 gap-4">
        {messages.map((message, i) => {
          if (message.messageType === 'talk') {
            if (message.nickname === nickname) {
              return <SentMessage key={i} message={message} />;
            }
            return <ReceivedMessage key={i} message={message} />;
          }
          return <EnterExitMessage key={i} message={message} />;
        })}
      </div>
      <div ref={messageEndRef} />
    </div>
  );
};

export default ChatSection;
