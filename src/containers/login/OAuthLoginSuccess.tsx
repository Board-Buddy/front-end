'use client';

import CustomAlert from '@/components/CustomAlert';
import { useUserLoginCheck } from '@/hooks/useAuth';
import { LoaderCircleIcon } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

const OAuthLoginSuccess = () => {
  const router = useRouter();
  const { isError, isSuccess } = useUserLoginCheck({
    isReady: true,
  });

  const [openError, setOpenError] = useState(false);

  useEffect(() => {
    if (isError) {
      setOpenError(true);
    }
  }, [isSuccess, isError, router]);

  return (
    <>
      <div className="w-full h-[100vh] flex justify-center items-center">
        <LoaderCircleIcon className="animate-spin text-primary size-6" />
      </div>

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
