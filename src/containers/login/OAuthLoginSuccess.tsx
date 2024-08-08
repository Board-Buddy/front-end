'use client';

import CustomAlert from '@/components/CustomAlert';
import { useUserLoginCheck } from '@/hooks/useAuth';
import { LoaderCircleIcon } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

const OAuthLoginSuccess = () => {
  const router = useRouter();
  const { isLoading, isError, isSuccess } = useUserLoginCheck({
    isReady: true,
  });

  const [openSuccess, setOpenSuccess] = useState(false);
  const [openError, setOpenError] = useState(false);

  useEffect(() => {
    if (isSuccess) {
      setOpenSuccess(true);
    } else if (isError) {
      setOpenError(true);
    }
  }, [isSuccess, isError, router]);

  return (
    <>
      <div className="w-full h-full flex justify-center items-center">
        {isLoading && (
          <LoaderCircleIcon className="animate-spin text-primary size-6" />
        )}
      </div>
      <CustomAlert
        open={openSuccess}
        setOpen={setOpenSuccess}
        title="로그인 성공"
        confirmText="확인"
        onConfirm={() => router.push('/home')}
      />
      <CustomAlert
        open={openError}
        setOpen={setOpenError}
        title="로그인 실패"
        confirmText="다시 로그인"
        onConfirm={() => router.push('/login')}
      />
    </>
  );
};

export default OAuthLoginSuccess;
