'use client';

import { Message } from '@/types/chat';
import { InfiniteQueryObserverResult } from '@tanstack/react-query';
import { useEffect, useRef } from 'react';
import ReceivedMessage from './ReceivedMessage';
import SentMessage from './SentMessage';
import EnterExitMessage from './EnterExitMessage';
import { useChatInfiniteScrollObserver } from '@/hooks/custom/useChatInfiniteScrollObserver';
import { useUserInfo } from '@/hooks/custom/useUserInfo';
import useIsWebView from '@/hooks/custom/useIsWebView';
import { cn } from '@/utils/tailwind';

interface Props {
  messages: Message[];
  hasPreviousPage: boolean;
  fetchPreviousPage: () => Promise<InfiniteQueryObserverResult>;
}

const ChatSection = ({
  messages,
  hasPreviousPage,
  fetchPreviousPage,
}: Props) => {
  const { userInfo } = useUserInfo();
  const nickname = userInfo?.nickname;

  const scrollRef = useRef<HTMLDivElement>(null);
  const messageEndRef = useRef<HTMLDivElement>(null);

  const isWebView = useIsWebView();

  const { setTarget } = useChatInfiniteScrollObserver({
    hasPreviousPage,
    fetchPreviousPage,
    scrollRef,
  });

  useEffect(() => {
    // 컴포넌트가 처음 마운트될 때 스크롤을 가장 아래로 이동시킨다.
    if (scrollRef && scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, []);

  useEffect(() => {
    // 새로운 메시지가 추가될 때 스크롤을 조정하여 가장 최근 메시지가 보이도록 한다.
    // TODO: 스크롤 위치가 최하단에 있을 때만 스크롤 이동하도록 변경 필요
    messageEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  return (
    <div
      className={cn(
        'overflow-y-auto',
        isWebView
          ? 'h-[calc(100dvh-100px)] pb-[70px]'
          : 'h-[calc(100dvh-222px)]',
      )}
      ref={scrollRef}
    >
      <div>
        <div ref={setTarget} className="h-0" />
        <div className="flex flex-col gap-4 p-4">
          {messages.map((message) => {
            if (message.messageType === 'TALK') {
              if (message.nickname === nickname) {
                return <SentMessage key={message.id} message={message} />;
              }
              return <ReceivedMessage key={message.id} message={message} />;
            }
            return <EnterExitMessage key={message.id} message={message} />;
          })}
        </div>
      </div>
      <div ref={messageEndRef} />
    </div>
  );
};

export default ChatSection;
