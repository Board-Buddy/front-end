import {
  defaultShouldDehydrateQuery,
  isServer,
  QueryClient,
} from '@tanstack/react-query';
import handleApiError from './handleApiError';

function makeQueryClient() {
  return new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 60 * 1000, // 쿼리 데이터가 신선하다고 간주되는 시간(1분)
        gcTime: 5 * 60 * 1000, // 캐시 데이터가 메모리에 유지되는 시간(5분)
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
      dehydrate: {
        shouldDehydrateQuery: (query) =>
          defaultShouldDehydrateQuery(query) ||
          query.state.status === 'pending',
        shouldRedactErrors: () => process.env.NODE_ENV === 'production',
      },
    },
  });
}

let browserQueryClient: QueryClient | undefined;

export function getQueryClient() {
  if (isServer) {
    // Server인 경우 매번 새로운 queryClient를 만든다.
    return makeQueryClient();
  }
  // Browser인 경우 queryClient가 존재하지 않을 때만 새로운 queryClient를 만든다.
  // 리액트가 초기 렌더링 중에 일시 중단되더라도 클라이언트를 새로 만들지 않는다.
  if (!browserQueryClient) browserQueryClient = makeQueryClient();
  return browserQueryClient;
}
