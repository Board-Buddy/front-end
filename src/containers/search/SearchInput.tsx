'use client';

import { Input } from '@/components/ui/input';
import { SearchIcon } from 'lucide-react';
import Image from 'next/image';
import { Dispatch, SetStateAction, useEffect, useRef } from 'react';

interface Props {
  keyword: string;
  setKeyword: Dispatch<SetStateAction<string>>;
  refetch: () => void;
}

const SearchInput = ({ keyword, setKeyword, refetch }: Props) => {
  const inputRef = useRef<HTMLInputElement>(null);

  const activeEnter = (e: unknown) => {
    if (e instanceof KeyboardEvent && e.key === 'Enter') {
      refetch();
    }
  };

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  return (
    <div className="mb-4 ml-6 flex items-center rounded-3xl border border-gray-200 shadow-md">
      <Image
        src="/images/logo/boardbuddy_small_logo_orange.png"
        width={24}
        height={24}
        alt="보드버디 로고"
        className="my-2 ml-4 mr-1"
      />
      <Input
        className="border-none"
        value={keyword}
        onChange={(e) => setKeyword(e.target.value)}
        onKeyDown={(e) => activeEnter(e)}
        placeholder="검색어를 입력하세요."
        ref={inputRef}
      />
      <SearchIcon className="mr-4 text-gray-400" onClick={() => refetch()} />
    </div>
  );
};

export default SearchInput;
