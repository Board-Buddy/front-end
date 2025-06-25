'use client';

import { useSearchFilterStore } from '@/store/searchFilterStore';
import { usePathname } from 'next/navigation';
import { useEffect } from 'react';

const useSearchPageDetection = () => {
  const pathname = usePathname();
  const isSearchPage = pathname.includes('/search');

  const setKeyword = useSearchFilterStore((state) => state.setKeyword);

  useEffect(() => {
    if (isSearchPage) {
      setKeyword(null);
    }
  }, [isSearchPage, setKeyword]);

  return { isSearchPage };
};

export default useSearchPageDetection;
