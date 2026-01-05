'use client';

import { Input } from '@/components/ui/input';
import useAppRouter from '@/hooks/custom/useAppRouter';
import { useSearchFilterStore } from '@/store/searchFilterStore';
import { MessageType } from '@/types/webview';
import { postRNMessage, STATE_KEYS } from '@/utils/webview';
import { SearchIcon } from 'lucide-react';
import Image from 'next/image';
import React, { useRef } from 'react';
import SmallLogoOrange from '@images/logo/boardbuddy_small_logo_orange.png';

const HomeSearchInput = () => {
  const router = useAppRouter();
  const searchKeywordRef = useRef<HTMLInputElement>(null);
  const setKeyword = useSearchFilterStore((state) => state.setKeyword);

  const getKeyword = () => searchKeywordRef.current?.value.trim() || '';

  const handleSearch = () => {
    const keyword = getKeyword();
    if (!keyword) return;

    setKeyword(keyword);

    postRNMessage(MessageType.SAVE_STATE, {
      key: STATE_KEYS.SEARCH_FILTER,
      state: { keyword },
    });

    if (searchKeywordRef.current) {
      searchKeywordRef.current.value = '';
    }

    router.push({
      href: '/search',
      headerTitle: '모집글 검색',
    });
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    const confirmKeys = ['Enter', 'Go', 'Search', 'Done'];

    if (confirmKeys.includes(e.key)) handleSearch();
  };

  return (
    <div className="mx-8 flex min-h-12 -translate-y-1/2 items-center rounded-3xl border border-gray-200 bg-white shadow-md">
      <Image
        src={SmallLogoOrange}
        width={24}
        height={24}
        alt="보드버디 로고"
        className="my-2 ml-4 mr-1"
      />
      <div className="flex grow items-center">
        <Input
          aria-label="검색어 입력"
          type="search"
          className="border-none"
          placeholder="검색어를 입력하세요"
          ref={searchKeywordRef}
          onKeyDown={handleKeyDown}
        />
        <SearchIcon
          aria-label="검색"
          role="button"
          className="ml-auto mr-4 text-gray-400"
          onClick={handleSearch}
          tabIndex={0}
        />
      </div>
    </div>
  );
};

export default HomeSearchInput;
