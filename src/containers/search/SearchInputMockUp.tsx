'use client';

import { Input } from '@/components/ui/input';
import { SearchIcon } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

const SearchInputMockUp = () => {
  return (
    <div className="relative mx-auto flex h-12 w-[350px] -translate-y-1/2 items-center rounded-3xl border border-gray-200 bg-white shadow-md">
      <Image
        src="/images/logo/boardbuddy_small_logo_orange.png"
        width={24}
        height={24}
        alt="보드버디 로고"
        className="my-2 ml-4 mr-1"
      />
      <Link href="/search" className="flex grow items-center">
        <Input className="border-none" placeholder="홍대 보드게임 카페" />
        <SearchIcon className="ml-auto mr-4 text-gray-400" />
      </Link>
    </div>
  );
};

export default SearchInputMockUp;
