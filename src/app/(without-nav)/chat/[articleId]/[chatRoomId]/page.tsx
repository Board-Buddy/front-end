'use client';

import ArticleInfo from '@/containers/chat/ArticleInfo';
import ChatInput from '@/containers/chat/ChatInput';
import ChatSection from '@/containers/chat/ChatSection';
import useWebSocket from '@/hooks/custom/useWebSocket';
import { Message } from '@/types/chat';

const Page = ({
  params,
}: {
  params: { articleId: string; chatRoomId: string };
}) => {
  const chatMessages: Message[] = [
    {
      content: '[입장] kong1님이 채팅방에 입장했습니다.',
      messageType: 'enter',
    },
    {
      content: '메시지 입니다.',
      nickname: 'yubin',
      profileImageS3SavedURL: null,
      rank: 2,
      messageType: 'talk',
      sentAt: '2024-07-30 12:33',
    },
    {
      content: '메시지 입니다.',
      nickname: 'kong3',
      profileImageS3SavedURL: null,
      rank: 2,
      messageType: 'talk',
      sentAt: '2024-07-30 12:33',
    },
    {
      content: '전송 메시지',
      nickname: 'yubin',
      profileImageS3SavedURL: null,
      rank: 2,
      messageType: 'talk',
      sentAt: '2024-07-30 12:33',
    },
    {
      content: '[퇴장] kong1님이 채팅방에서 퇴장했습니다.',
      messageType: 'exit',
    },
    {
      content:
        'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not',
      nickname: 'kong3',
      profileImageS3SavedURL: null,
      rank: 2,
      messageType: 'talk',
      sentAt: '2024-07-30 12:33',
    },
    {
      content:
        'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not',
      nickname: 'kong3',
      profileImageS3SavedURL: null,
      rank: 2,
      messageType: 'talk',
      sentAt: '2024-07-30 12:33',
    },
  ];

  const { messages, handleSendMessage } = useWebSocket(
    params.chatRoomId,
    chatMessages,
  );

  return (
    <>
      <ArticleInfo articleId={params.articleId} />
      <ChatSection messages={messages} />
      <ChatInput sendMessage={handleSendMessage} />
    </>
  );
};

export default Page;
