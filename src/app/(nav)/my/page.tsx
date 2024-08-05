import { Suspense } from 'react';
import Profile from '@/containers/profile/Profile';
import { ErrorBoundary } from 'react-error-boundary';
import { LoaderCircleIcon } from 'lucide-react';

const Page = () => {
  const UserProfileFallback = ({
    error,
    resetErrorBoundary,
  }: {
    error: any;
    resetErrorBoundary: any;
  }) => (
    <div>
      <p> 에러: {error.message} </p>
      <button type="button" onClick={() => resetErrorBoundary()}>
        다시 시도
      </button>
    </div>
  );

  const UserProfileLoading = () => (
    <div className="flex justify-center items-center h-[calc(100vh-100px)]">
      <LoaderCircleIcon className="animate-spin text-primary" />
    </div>
  );

  return (
    <>
      <ErrorBoundary FallbackComponent={UserProfileFallback}>
        <Suspense fallback={<UserProfileLoading />}>
          <Profile />
        </Suspense>
      </ErrorBoundary>
    </>
  );
};

export default Page;
