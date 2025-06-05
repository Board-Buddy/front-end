'use client';

import {
  useGetArticleSimpleInfo,
  useGetExistingMessages,
} from '@/hooks/useChat';
import { ChatRoom as ChatRoomType } from '@/types/chat';
import { Article } from '@/types/article';
import ArticleInfo from './ArticleInfo';
import WebSocketContainer from './WebSocketContainer';

interface Props {
  articleId: Article['id'];
  chatRoomId: ChatRoomType['chatRoomId'];
}

const ChatRoom = ({ chatRoomId, articleId }: Props) => {
  const { data: chatMessages } = useGetExistingMessages(chatRoomId);

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
      <WebSocketContainer chatRoomId={chatRoomId} chatMessages={chatMessages} />
    </>
  );
};

export default ChatRoom;
