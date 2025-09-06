'use client';

import { Input } from '@/components/ui/input';
import useRestoreAppState from '@/hooks/custom/useRestoreAppState';
import {
  useKeywordSelector,
  useSearchFilterStore,
} from '@/store/searchFilterStore';
import { GetArticleRequestParams } from '@/types/article';
import { MessageType } from '@/types/webview';
import { postRNMessage, STATE_KEYS } from '@/utils/webview';
import { SearchIcon } from 'lucide-react';
import Image from 'next/image';
import React, { useCallback, useRef, useState } from 'react';
import SmallLogoOrange from '@images/logo/boardbuddy_small_logo_orange.png';

const SearchInput = () => {
  const [restoredState, setRestoredState] =
    useState<GetArticleRequestParams | null>(null);

  useRestoreAppState(
    STATE_KEYS.SEARCH_FILTER,
    useCallback((state: GetArticleRequestParams) => {
      setRestoredState(state);
    }, []),
  );

  const keyword = useKeywordSelector();
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
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    const confirmKeys = ['Enter', 'Go', 'Search', 'Done'];

    if (confirmKeys.includes(e.key)) handleSearch();
  };

  const mergedKeyword = restoredState?.keyword || keyword || '';

  return (
    <div className="flex w-full items-center rounded-3xl border border-gray-200 shadow-md">
      <Image
        src={SmallLogoOrange}
        width={24}
        height={24}
        alt="보드버디 로고"
        className="my-2 ml-4 mr-1"
      />
      <Input
        type="search"
        className="border-none"
        onKeyDown={handleKeyDown}
        defaultValue={mergedKeyword}
        ref={searchKeywordRef}
      />
      <SearchIcon className="mr-4 text-gray-400" onClick={handleSearch} />
    </div>
  );
};

export default SearchInput;
