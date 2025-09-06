'use client';

import { Button } from '@/components/ui/button';
import useAppRouter from '@/hooks/custom/useAppRouter';
import Image from 'next/image';
import SundyDice from '@images/sundy/sundy_dice.png';

const LoginGuide = () => {
  const router = useAppRouter();

  return (
    <div className="flex h-screen w-full flex-col items-center justify-center gap-8">
      <Image src={SundyDice} alt="주사위를 든 썬디" width={120} height={182} />
      <div className="flex flex-col gap-4">
        <p className="text-center text-gray-700">
          세션이 만료되었거나 로그인이 필요한 기능이예요.
          <br />
          로그인해 주세요🙂
        </p>
        <div className="flex justify-center gap-2">
          <Button
            className="w-32 text-white"
            onClick={() => router.replace({ href: '/login' })}
          >
            로그인하러 가기
          </Button>
          <Button
            variant="outline"
            className="w-32"
            onClick={() => router.back()}
          >
            이전으로 돌아가기
          </Button>
        </div>
      </div>
    </div>
  );
};

export default LoginGuide;
