'use client';

import { QueryErrorResetBoundary } from '@tanstack/react-query';
import { ComponentType, ReactNode, Suspense } from 'react';
import { ErrorBoundary, FallbackProps } from 'react-error-boundary';
import { LoadingSpinner } from './LoadingSpinner';
import { Button } from './ui/button';
import useAppRouter from '@/hooks/custom/useAppRouter';
import { CustomAxiosError } from '@/types/api';

const DefaultLoadingFallback = () => (
  <div className="flex size-full items-center justify-center">
    <LoadingSpinner />
  </div>
);

interface DefaultErrorFallbackProps {
  error: CustomAxiosError;
  reset: () => void;
}

const DefaultErrorFallback = ({ reset, error }: DefaultErrorFallbackProps) => {
  const router = useAppRouter();

  if (error.response?.status === 401) {
    router.push({ href: '/login/guide' });
  }

  return (
    <div className="flex h-full flex-col items-center justify-center text-sm">
      <p className="mb-2 text-sm text-gray-700">
        {error.message ?? '알 수 없는 문제가 발생했습니다.'}
      </p>
      <Button
        onClick={() => reset()}
        className="rounded-3xl text-sm text-white"
      >
        다시 시도하기
      </Button>
    </div>
  );
};

interface QueryFallbackBoundaryProps {
  errorFallback?: ComponentType<FallbackProps>;
  loadingFallback?: ReactNode;
  children: ReactNode;
}

export const QueryFallbackBoundary = ({
  errorFallback = ({ error, resetErrorBoundary }) => (
    <DefaultErrorFallback error={error} reset={resetErrorBoundary} />
  ),
  loadingFallback = <DefaultLoadingFallback />,
  children,
}: QueryFallbackBoundaryProps) => (
  <QueryErrorResetBoundary>
    {({ reset }) => (
      <ErrorBoundary onReset={reset} FallbackComponent={errorFallback}>
        <Suspense fallback={loadingFallback}>{children}</Suspense>
      </ErrorBoundary>
    )}
  </QueryErrorResetBoundary>
);
