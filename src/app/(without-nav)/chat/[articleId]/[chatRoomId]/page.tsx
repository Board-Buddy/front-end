'use client';

import ErrorFallback from '@/components/ErrorFallback';
import Loading from '@/components/Loading';
import ChatRoom from '@/containers/chat/ChatRoom';
import { QueryErrorResetBoundary } from '@tanstack/react-query';
import { Suspense } from 'react';
import { ErrorBoundary } from 'react-error-boundary';

const Page = ({
  params,
}: {
  params: { articleId: string; chatRoomId: string };
}) => {
  return (
    <QueryErrorResetBoundary>
      {({ reset }) => (
        <ErrorBoundary
          onReset={reset}
          fallbackRender={({ resetErrorBoundary }) => (
            <ErrorFallback reset={resetErrorBoundary} />
          )}
        >
          <Suspense fallback={<Loading />}>
            <ChatRoom
              chatRoomId={params.chatRoomId}
              articleId={params.articleId}
            />
          </Suspense>
        </ErrorBoundary>
      )}
    </QueryErrorResetBoundary>
  );
};

export default Page;
