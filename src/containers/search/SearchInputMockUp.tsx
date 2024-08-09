'use client';

import { Input } from '@/components/ui/input';
import { SearchIcon } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

const SearchInputMockUp = () => {
  return (
    <div className="relative border border-gray-200 rounded-3xl flex items-center shadow-md w-[350px] mx-auto bg-white -translate-y-1/2 h-12">
      <Image
        src="/images/logo/boardbuddy_small_logo_orange.png"
        width={24}
        height={24}
        alt="보드버디 로고"
        className="ml-4 mr-1 my-2"
      />
      <Link href="/search" className="flex items-center grow">
        <Input className="border-none" placeholder="홍대 보드게임 카페" />
        <SearchIcon className="text-gray-400 ml-auto mr-4" />
      </Link>
    </div>
  );
};

export default SearchInputMockUp;
