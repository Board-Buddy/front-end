'use client';

import {
  isServer,
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { checkUserLogin } from '@/services/auth';
import { clearStoredUser, getStoredUser } from './localStorage';
import handleApiError from './handleApiError';

function makeQueryClient() {
  return new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 60 * 1000,
      },
      mutations: {
        onError: handleApiError,
      },
    },
  });
}

let browserQueryClient: QueryClient | undefined;

function getQueryClient() {
  if (isServer) {
    // Server일 경우
    // 매번 새로운 queryClient를 만든다.
    return makeQueryClient();
  }
  // Browser일 경우
  // queryClient가 존재하지 않을 경우에만 새로운 queryClient를 만든다.
  // React가 새 Client를 만들게 하기 위해 중요하다.
  if (!browserQueryClient) browserQueryClient = makeQueryClient();
  return browserQueryClient;
}

export default function ReactQueryProviders({
  children,
}: React.PropsWithChildren) {
  // queryClient를 useState를 사용하여 초기화 하면 안된다.
  // suspense boundary가 없을 경우 React의 렌더링이 중단될 수도 있고
  // queryClient 자체를 폐기할 수도 있다.
  const queryClient = getQueryClient();

  const router = useRouter();

  console.log('reactQueryProviders');

  useEffect(() => {
    const userInfo = getStoredUser();
    console.log('useEffect', userInfo);

    if (userInfo) {
      queryClient.setQueryData(['userInfo'], userInfo);

      // 유저가 서버에서도 로그인 상태가 유지되고 있는지 확인
      checkUserLogin()
        .then(() => {
          // 로그인되어 있다면 홈 페이지로 이동
          router.push('/home');
        })
        .catch(() => {
          // 로그인되어 있지 않다면 로그인 페이지로 이동
          clearStoredUser();
          queryClient.setQueryData(['userInfo'], null);
          router.push('/login');
        });
    } else {
      router.push('/');
    }
  }, [queryClient, router]);

  return (
    <QueryClientProvider client={queryClient}>
      {children}
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}
