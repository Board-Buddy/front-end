'use client';

import useAppRouter from '@/hooks/custom/useAppRouter';
import { Button } from './ui/button';

interface Props {
  feature: string;
}

const LoginPrompt = ({ feature }: Props) => {
  const router = useAppRouter();

  return (
    <div className="pt-16 text-center">
      <p className="mb-4 text-center text-gray-700">
        로그인하시면 {feature} 기능을 이용하실 수 있어요🙂
      </p>
      <Button
        className="text-white"
        onClick={() => router.replace({ href: '/login' })}
      >
        로그인하러 가기
      </Button>
    </div>
  );
};

export default LoginPrompt;
