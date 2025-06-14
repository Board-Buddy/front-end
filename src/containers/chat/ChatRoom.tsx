'use client';

import {
  useGetArticleSimpleInfo,
  useGetExistingMessages,
} from '@/hooks/useChat';
import { ChatRoom as ChatRoomType, Message } from '@/types/chat';
import { Article } from '@/types/article';
import ArticleInfo from './ArticleInfo';
import ChatContainer from './ChatContainer';
import { useState } from 'react';

interface Props {
  articleId: Article['id'];
  chatRoomId: ChatRoomType['chatRoomId'];
}

const ChatRoom = ({ chatRoomId, articleId }: Props) => {
  const [messages, setMessages] = useState<Message[] | null>(null);

  const { data: articleSimpleInfo } = useGetArticleSimpleInfo(
    chatRoomId,
    articleId,
  );

  return (
    <>
      <ArticleInfo
        articleId={articleId}
        articleSimpleInfo={articleSimpleInfo}
      />
      <ChatContainer
        chatRoomId={chatRoomId}
        messages={messages}
        setMessages={setMessages}
      />
    </>
  );
};

export default ChatRoom;
