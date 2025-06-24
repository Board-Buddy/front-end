'use client';

import { Input } from '@/components/ui/input';
import { useSearchFilterStore } from '@/store/searchFilterStore';
import { SearchIcon } from 'lucide-react';
import Image from 'next/image';
import React, { useEffect, useRef } from 'react';

const SearchInput = () => {
  const setKeyword = useSearchFilterStore((state) => state.setKeyword);

  const inputRef = useRef<HTMLInputElement>(null);

  const activeEnter = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      setKeyword(inputRef.current?.value ?? '');
    }
  };

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  return (
    <div className="flex w-full items-center rounded-3xl border border-gray-200 shadow-md">
      <Image
        src="/images/logo/boardbuddy_small_logo_orange.png"
        width={24}
        height={24}
        alt="보드버디 로고"
        className="my-2 ml-4 mr-1"
      />
      <Input
        className="border-none"
        onKeyDown={activeEnter}
        placeholder="검색어를 입력하세요."
        ref={inputRef}
      />
      <SearchIcon
        className="mr-4 text-gray-400"
        onClick={() => setKeyword(inputRef.current?.value ?? '')}
      />
    </div>
  );
};

export default SearchInput;
