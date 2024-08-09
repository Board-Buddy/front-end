'use client';

import { Button } from '@/components/ui/button';
import Link from 'next/link';

const error = () => {
  return (
    <div className="flex flex-col items-center justify-center h-[calc(100dvh-100px)]">
      <p className="font-bold mb-2 text-gray-900">
        오류가 발생했습니다. 다시 로그인해주세요.
      </p>
      <Link href="/login">
        <Button className="text-white text-sm font-bold w-28 rounded-3xl h-8">
          로그인하러 가기
        </Button>
      </Link>
    </div>
  );
};

export default error;
