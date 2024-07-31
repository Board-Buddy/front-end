'use client';

import ArticleInfo from '@/containers/chat/ArticleInfo';
import WebSocketContainer from '@/containers/chat/WebSocketContainer';
import {
  useGetArticleSimpleInfo,
  useGetExistingMessages,
} from '@/hooks/useChat';

const Page = ({
  params,
}: {
  params: { articleId: string; chatRoomId: string };
}) => {
  const {
    data: chatMessages,
    isPending: isChatMessagesPending,
    isError: isChatMessagesError,
    error: chatMessagesError,
  } = useGetExistingMessages(params.chatRoomId);

  const {
    data: articleSimpleInfo,
    isPending: isArticleSimpleInfoPending,
    isError: isArticleSimpleInfoError,
    error: articleSimpleInfoError,
  } = useGetArticleSimpleInfo(params.chatRoomId, params.articleId);

  if (isChatMessagesPending || isArticleSimpleInfoPending) {
    return <span>Loading...</span>;
  }

  if (isChatMessagesError) {
    return <span>Error: {chatMessagesError.message}</span>;
  }

  if (isArticleSimpleInfoError) {
    return <span>Error: {articleSimpleInfoError.message}</span>;
  }

  return (
    <>
      <ArticleInfo
        articleId={params.articleId}
        articleSimpleInfo={articleSimpleInfo}
      />
      <WebSocketContainer
        chatRoomId={params.chatRoomId}
        chatMessages={chatMessages}
      />
    </>
  );
};

export default Page;
