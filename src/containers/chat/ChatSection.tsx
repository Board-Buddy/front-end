'use client';

import { Message } from '@/types/chat';
import {
  InfiniteQueryObserverResult,
  useQueryClient,
} from '@tanstack/react-query';
import { UserInfo } from '@/types/user';
import { useEffect, useRef } from 'react';
import ReceivedMessage from './ReceivedMessage';
import SentMessage from './SentMessage';
import EnterExitMessage from './EnterExitMessage';
import { useChatInfiniteScrollObserver } from '@/hooks/custom/useChatInfiniteScrollObserver';

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
  const cache = useQueryClient();
  const userInfo = cache.getQueryData(['userInfo']) as UserInfo;
  const { nickname } = userInfo;

  const scrollRef = useRef<HTMLDivElement>(null);
  const messageEndRef = useRef<HTMLDivElement>(null);

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
    const scroll = scrollRef.current;
    if (!scroll) return;

    const isAtBottom =
      scroll.scrollHeight - scroll.scrollTop - scroll.clientHeight < 50;

    if (isAtBottom) {
      // 새로운 메시지가 추가될 때 스크롤을 조정하여 가장 최근 메시지가 보이도록 한다.
      messageEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  return (
    <div className="h-[calc(100dvh-222px)] overflow-y-auto" ref={scrollRef}>
      <div>
        <div ref={setTarget} className="h-0" />
        <div className="flex flex-col p-4 gap-4">
          {messages.map((message, i) => {
            if (message.messageType === 'TALK') {
              if (message.nickname === nickname) {
                return <SentMessage key={i} message={message} />;
              }
              return <ReceivedMessage key={i} message={message} />;
            }
            return <EnterExitMessage key={i} message={message} />;
          })}
        </div>
      </div>
      <div ref={messageEndRef} />
    </div>
  );
};

export default ChatSection;
