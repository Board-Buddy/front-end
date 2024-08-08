'use client';

import {
  isServer,
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import handleApiError from './handleApiError';

function makeQueryClient() {
  return new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 24 * 60 * 60 * 1000, // 쿼리가 stale 상태가 되기 전에 유지되는 시간(24시간)
        gcTime: 24 * 60 * 60 * 1000, // 캐시 데이터가 메모리에 유지되는 시간(24시간)
        refetchInterval: false, // 백그라운드 자동 새로고침 비활성화
        refetchOnWindowFocus: true, // 페이지가 포커스를 얻거나 네트워크 상태가 변경될 때 쿼리 자동 새로고침
        refetchOnReconnect: true, // 네트워크가 다시 연결될 때 자동 새로고침
        refetchOnMount: true, // 마운트 시 쿼리 자동 새로고침
        retry: 1, // 쿼리 실패 시 재시도 횟수
      },
      mutations: {
        retry: 1, // 뮤테이션 실패 시 재시도 횟수
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

  return (
    <QueryClientProvider client={queryClient}>
      {children}
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}
