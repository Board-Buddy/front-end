'use client';

import CustomErrorBoundary from '@/components/CustomErrorBoundary';
import Loading from '@/components/Loading';
import ChatRoom from '@/containers/chat/ChatRoom';
import { Suspense } from 'react';

type Params = Promise<{ articleId: string; chatRoomId: string }>;

const Page = async ({ params }: { params: Params }) => {
  const { articleId, chatRoomId } = await params;

  return (
    <CustomErrorBoundary>
      <Suspense fallback={<Loading />}>
        <ChatRoom
          chatRoomId={Number(chatRoomId)}
          articleId={Number(articleId)}
        />
      </Suspense>
    </CustomErrorBoundary>
  );
};

export default Page;
