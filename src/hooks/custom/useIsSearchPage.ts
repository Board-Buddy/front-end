'use client';

import { usePathname } from 'next/navigation';

const useIsSearchPage = () => {
  const pathname = usePathname();
  const isSearchPage = pathname.includes('/search');

  if (isSearchPage) return true;

  return false;
};

export default useIsSearchPage;
