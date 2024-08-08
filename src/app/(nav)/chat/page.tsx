import CustomErrorBoundary from '@/components/CustomErrorBoundary';
import Loading from '@/components/Loading';
import ChatList from '@/containers/chat/ChatList';
import { Suspense } from 'react';

export const dynamic = 'force-dynamic';
export const fetchCache = 'force-no-store';

const Page = () => {
  return (
    <CustomErrorBoundary>
      <Suspense fallback={<Loading />}>
        <ChatList />
      </Suspense>
    </CustomErrorBoundary>
  );
};

export default Page;
