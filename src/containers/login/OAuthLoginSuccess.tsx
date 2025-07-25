'use client';

import CustomAlert from '@/components/CustomAlert';
import useAppRouter from '@/hooks/custom/useAppRouter';
import { useUserLoginCheck } from '@/hooks/useAuth';
import { LoaderCircleIcon } from 'lucide-react';
import { useEffect, useState } from 'react';

const OAuthLoginSuccess = () => {
  const router = useAppRouter();
  const { isError, isSuccess } = useUserLoginCheck({
    isReady: true,
  });

  const [openError, setOpenError] = useState(false);

  useEffect(() => {
    if (isSuccess) {
      router.push({ href: '/home', screenName: 'HomeScreen' });
    } else if (isError) {
      setOpenError(true);
    }
  }, [isSuccess, isError, router]);

  return (
    <>
      <div className="flex h-screen w-full items-center justify-center">
        <LoaderCircleIcon className="size-6 animate-spin text-primary" />
      </div>
      <CustomAlert
        open={openError}
        setOpen={setOpenError}
        title="로그인 실패"
        confirmText="다시 로그인"
        onConfirm={() => router.push({ href: '/login-splash' })}
      />
    </>
  );
};

export default OAuthLoginSuccess;
