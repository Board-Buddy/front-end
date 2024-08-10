'use client';

import CustomAlert from '@/components/CustomAlert';
import { OAUTH_LOGIN_MESSAGE_CODE } from '@/constants/auth';
import { LoaderCircleIcon } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

interface Props {
  messageCode: number;
}

const OAuthLoginFailure = ({ messageCode }: Props) => {
  const router = useRouter();
  const [open, setOpen] = useState(true);

  return (
    <>
      <div className="w-full h-full flex justify-center items-center">
        <LoaderCircleIcon className="animate-spin text-primary size-6" />
      </div>
      <CustomAlert
        open={open}
        setOpen={setOpen}
        title={OAUTH_LOGIN_MESSAGE_CODE[messageCode]}
        confirmText="다시 로그인"
        onConfirm={() => router.push('/login-splash')}
      />
    </>
  );
};

export default OAuthLoginFailure;
