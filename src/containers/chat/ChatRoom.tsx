'use client';

import {
  useGetArticleSimpleInfo,
  useGetExistingMessages,
} from '@/hooks/useChat';
import ArticleInfo from './ArticleInfo';
import WebSocketContainer from './WebSocketContainer';

interface Props {
  articleId: string;
  chatRoomId: any;
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
