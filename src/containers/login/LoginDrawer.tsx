'use client';

import { ChevronsDown, ChevronsUp } from 'lucide-react';
import Link from 'next/link';
import { API_BASE_URL } from '@/constants/env';
import { useState } from 'react';
import { cn } from '@/utils/tailwind';

const LoginDrawer = () => {
  const [toggleShowAll, setToggleShowAll] = useState(false);

  const handleClick = () => {
    setToggleShowAll((prev) => !prev);
  };

  return (
    <div
      className={cn(
        'absolute bottom-0 bg-primary w-full rounded-t-3xl flex flex-col items-center text-white p-4 transition-all',
        toggleShowAll ? 'translate-y-0' : 'translate-y-[208px]',
      )}
    >
      {toggleShowAll ? (
        <ChevronsDown
          size={18}
          onClick={handleClick}
          className="cursor-pointer"
        />
      ) : (
        <ChevronsUp
          size={18}
          onClick={handleClick}
          className="cursor-pointer"
        />
      )}

      <p className="font-extrabold mt-1 mb-3">지금 바로 함께해요!</p>
      <div className="w-4/5 flex flex-col items-center gap-2">
        <Link
          href={`${API_BASE_URL}/v1/oauth2/authorization/kakao`}
          className="w-full"
        >
          <div className="flex rounded-3xl bg-[#f9e000] border-[3px] border-white h-11 items-center justify-center gap-1.5">
            <div className="rounded-full bg-gray-700 size-3" />
            <p className="text-gray-700 font-extrabold text-sm">
              카카오로 계속하기
            </p>
          </div>
        </Link>
        <Link
          href={`${API_BASE_URL}/v1/oauth2/authorization/naver`}
          className="w-full"
        >
          <div className="flex rounded-3xl bg-[#2db400] border-[3px] border-white h-11 items-center justify-center gap-1.5">
            <div className="rounded-full bg-white size-3" />
            <p className="text-white font-extrabold text-sm">
              네이버로 계속하기
            </p>
          </div>
        </Link>
        <Link
          href={`${API_BASE_URL}/v1/oauth2/authorization/google`}
          className="w-full"
        >
          <div className="flex rounded-3xl bg-gray-300 border-[3px] border-white h-11 items-center justify-center gap-1.5">
            <div className="rounded-full bg-gray-700 size-3" />
            <p className="text-gray-800 font-extrabold text-sm">
              구글로 계속하기
            </p>
          </div>
        </Link>
      </div>
      <Link href="/login">
        <div className="mt-4 pb-2">
          <p className="text-sm font-semibold underline">
            이메일 또는 아이디로 계속하기
          </p>
        </div>
      </Link>
    </div>
  );
};

export default LoginDrawer;
