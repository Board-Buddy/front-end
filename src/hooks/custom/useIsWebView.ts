'use client';

import { useSearchParams } from 'next/navigation';

// TODO: 웹뷰 판단 방식 query string -> http header로 변경
/**
 * 웹뷰 여부를 판단하는 커스텀 훅
 * query string에 `?webview=true`가 있는 경우 true 반환
 */
const useIsWebView = (): boolean => {
  const searchParams = useSearchParams();
  return searchParams.get('webview') === 'true';
};

export default useIsWebView;
