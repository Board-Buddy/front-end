'use client';

import CustomErrorBoundary from '@/components/CustomErrorBoundary';
import Loading from '@/components/Loading';
import ChatRoom from '@/containers/chat/ChatRoom';
import { Suspense } from 'react';

const Page = ({
  params,
}: {
  params: { articleId: string; chatRoomId: string };
}) => {
  return (
    <CustomErrorBoundary>
      <Suspense fallback={<Loading />}>
        <ChatRoom chatRoomId={params.chatRoomId} articleId={params.articleId} />
      </Suspense>
    </CustomErrorBoundary>
  );
};

export default Page;
