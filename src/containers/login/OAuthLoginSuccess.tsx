'use client';

import { useUserLoginCheck } from '@/hooks/useAuth';
import { LoaderCircleIcon } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

const OAuthLoginSuccess = () => {
  const router = useRouter();
  const { isLoading, isError, isSuccess } = useUserLoginCheck({
    isReady: true,
  });

  useEffect(() => {
    if (isSuccess) {
      alert('로그인 되었습니다.');
      router.push('/home');
    } else if (isError) {
      alert('로그인에 실패하였습니다.');
      router.push('/login');
    }
  }, [isSuccess, isError, router]);

  if (isLoading) {
    return (
      <div className="w-full h-full flex justify-center items-center">
        <LoaderCircleIcon className="animate-spin text-primary size-6" />
      </div>
    );
  }

  return null;
};

export default OAuthLoginSuccess;
