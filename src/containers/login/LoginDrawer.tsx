'use client';

import { ChevronsDown, ChevronsUp } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';
import { cn } from '@/utils/tailwind';
import { API_BASE_URL, ENDPOINT } from '@/services/endpoint';

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

      <p className="mb-3 mt-1 font-extrabold">지금 바로 함께해요!</p>
      <div className="flex w-4/5 flex-col items-center gap-2">
        <Link
          href={`${API_BASE_URL}${ENDPOINT.AUTH.SOCIAL_LOGIN.KAKAO()}`}
          className="w-full"
        >
          <div className="flex h-11 items-center justify-center gap-1.5 rounded-3xl border-[3px] border-white bg-[#f9e000]">
            <div className="size-3 rounded-full bg-gray-700" />
            <p className="text-sm font-extrabold text-gray-700">
              카카오로 계속하기
            </p>
          </div>
        </Link>
        <Link
          href={`${API_BASE_URL}${ENDPOINT.AUTH.SOCIAL_LOGIN.NAVER()}`}
          className="w-full"
        >
          <div className="flex h-11 items-center justify-center gap-1.5 rounded-3xl border-[3px] border-white bg-[#2db400]">
            <div className="size-3 rounded-full bg-white" />
            <p className="text-sm font-extrabold text-white">
              네이버로 계속하기
            </p>
          </div>
        </Link>
        <Link
          href={`${API_BASE_URL}${ENDPOINT.AUTH.SOCIAL_LOGIN.GOOGLE()}`}
          className="w-full"
        >
          <div className="flex h-11 items-center justify-center gap-1.5 rounded-3xl border-[3px] border-white bg-gray-300">
            <div className="size-3 rounded-full bg-gray-700" />
            <p className="text-sm font-extrabold text-gray-800">
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
