'use client';

import { Input } from '@/components/ui/input';
import { SearchIcon } from 'lucide-react';
import Image from 'next/image';
import { Dispatch, SetStateAction } from 'react';

interface Props {
  keyword: string;
  setKeyword: Dispatch<SetStateAction<string>>;
  refetch: () => void;
}

const SearchInput = ({ keyword, setKeyword, refetch }: Props) => {
  const activeEnter = (e: any) => {
    if (e.key === 'Enter') {
      refetch();
    }
  };

  return (
    <div className="border border-gray-200 rounded-3xl flex items-center shadow-md mb-4 ml-6">
      <Image
        src="/images/logo/boardbuddy_small_logo_orange.png"
        width={24}
        height={24}
        alt="보드버디 로고"
        className="ml-4 mr-1 my-2"
      />
      <Input
        className="border-none"
        value={keyword}
        onChange={(e) => setKeyword(e.target.value)}
        onKeyDown={(e) => activeEnter(e)}
        placeholder="검색어를 입력하세요."
      />
      <SearchIcon className="mr-4 text-gray-400" />
    </div>
  );
};

export default SearchInput;
