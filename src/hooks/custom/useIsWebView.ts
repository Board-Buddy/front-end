'use client';

import { useSearchParams } from 'next/navigation';

/**
 * 웹뷰 여부를 판단하는 커스텀 훅
 * query string에 `?webview=true`가 있는 경우 true 반환
 */
const useIsWebView = (): boolean => {
  const searchParams = useSearchParams();
  return searchParams.get('webview') === 'true';
};

export default useIsWebView;
