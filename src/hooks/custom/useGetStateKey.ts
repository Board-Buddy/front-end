'use client';

import { STATE_KEYS } from '@/utils/webview';
import { usePathname, useSearchParams } from 'next/navigation';

/**
 * pathname에 따라 article-filter 또는 search-filter 상태 키를 반환하는 훅
 */
const useGetStateKey = () => {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // searchParams에 'from'이 있는 경우 해당 값에 따라 상태 키를 결정
  if (searchParams.get('from')) {
    switch (searchParams.get('from')) {
      case 'home':
        return STATE_KEYS.ARTICLE_FILTER;
      case 'search':
        return STATE_KEYS.SEARCH_FILTER;
    }
  }

  // searchParams에 'from'이 없으면 pathname에 따라 상태 키를 결정
  const stateKey = pathname.includes('home')
    ? STATE_KEYS.ARTICLE_FILTER
    : STATE_KEYS.SEARCH_FILTER;

  return stateKey;
};

export default useGetStateKey;
