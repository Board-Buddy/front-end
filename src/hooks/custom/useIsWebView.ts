'use client';

import { useWebViewContext } from '@/context/WebViewContext';

/**
 * 웹뷰 여부를 판단하는 커스텀 훅
 * 헤더에 x-webview: true가 포함되어 있으면 웹뷰로 간주
 */
const useIsWebView = (): boolean => useWebViewContext();

export default useIsWebView;
