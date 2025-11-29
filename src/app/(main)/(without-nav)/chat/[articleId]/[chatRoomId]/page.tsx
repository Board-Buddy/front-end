'use client';

import CustomErrorBoundary from '@/components/CustomErrorBoundary';
import Loading from '@/components/Loading';
import ChatRoom from '@/containers/chat/ChatRoom';
import { Suspense } from 'react';

const Page = async ({
  params,
}: PageProps<'/chat/[articleId]/[chatRoomId]'>) => {
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
