'use client';

import Image from 'next/image';
import { Button } from '@/components/ui/button';
import useAppRouter from '@/hooks/custom/useAppRouter';

const NotFound = () => {
  const router = useAppRouter();

  const onClick = () => {
    router.replace({ href: '/home' });
  };

  return (
    <div className="flex h-full flex-col items-center justify-center">
      <Image
        src="/images/sundy/sundy_dice.png"
        width={120}
        height={182}
        alt="Not Found"
        className="mb-8"
      />
      <h1 className="mb-4 text-base text-gray-800">
        지원하지 않는 페이지입니다.
      </h1>
      <Button className="text-white" onClick={onClick}>
        홈 화면으로 돌아가기
      </Button>
    </div>
  );
};

export default NotFound;
