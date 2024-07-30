'use client';

import ArticleInfo from '@/containers/chat/ArticleInfo';
import WebSocketContainer from '@/containers/chat/WebSocketContainer';
import { useGetArticlePreview, useGetExistingMessages } from '@/hooks/useChat';

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
    data: articlePreview,
    isPending: isArticlePreviewPending,
    isError: isArticlePreviewError,
    error: articlePreviewError,
  } = useGetArticlePreview(params.chatRoomId, params.articleId);

  if (isChatMessagesPending || isArticlePreviewPending) {
    return <span>Loading...</span>;
  }

  if (isChatMessagesError) {
    return <span>Error: {chatMessagesError.message}</span>;
  }

  if (isArticlePreviewError) {
    return <span>Error: {articlePreviewError.message}</span>;
  }

  return (
    <>
      <ArticleInfo
        articleId={params.articleId}
        articlePreview={articlePreview}
      />
      <WebSocketContainer
        chatRoomId={params.chatRoomId}
        chatMessages={chatMessages}
      />
    </>
  );
};

export default Page;
