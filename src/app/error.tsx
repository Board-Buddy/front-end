'use client';

import { Button } from '@/components/ui/button';
import Link from 'next/link';

const error = () => {
  return (
    <div className="flex h-[calc(100dvh-100px)] flex-col items-center justify-center">
      <p className="mb-2 font-bold text-gray-900">
        오류가 발생했습니다. 다시 로그인해주세요.
      </p>
      <Link href="/login-splash">
        <Button className="h-8 w-28 rounded-3xl text-sm font-bold text-white">
          로그인하러 가기
        </Button>
      </Link>
    </div>
  );
};

export default error;
