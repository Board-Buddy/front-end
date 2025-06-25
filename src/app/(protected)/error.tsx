'use client';

import { Button } from '@/components/ui/button';
import Link from 'next/link';

const error = () => {
  return (
    <div className="flex h-[calc(100dvh-100px)] flex-col items-center justify-center">
      <p className="mb-4 text-center font-semibold text-gray-800">
        로그인 세션이 만료되어 자동으로 로그아웃되었어요
        <br />
        보안을 위해 다시 로그인해 주세요
      </p>
      <Link href="/login-splash" replace>
        <Button className="h-8 w-28 rounded-3xl text-sm font-bold text-white">
          다시 로그인하기
        </Button>
      </Link>
    </div>
  );
};

export default error;
