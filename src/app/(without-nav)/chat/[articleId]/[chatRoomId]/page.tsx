'use client';

import ArticleInfo from '@/containers/chat/ArticleInfo';
import WebSocketContainer from '@/containers/chat/WebSocketContainer';
import { useGetExistingMessages } from '@/hooks/useChat';

const Page = ({
  params,
}: {
  params: { articleId: string; chatRoomId: string };
}) => {
  const {
    data: chatMessages,
    isPending,
    isError,
    error,
  } = useGetExistingMessages(params.chatRoomId);

  if (isPending) {
    return <span>Loading...</span>;
  }

  if (isError) {
    return <span>Error: {error.message}</span>;
  }

  return (
    <>
      <ArticleInfo articleId={params.articleId} />
      <WebSocketContainer
        chatRoomId={params.chatRoomId}
        chatMessages={chatMessages}
      />
    </>
  );
};

export default Page;
