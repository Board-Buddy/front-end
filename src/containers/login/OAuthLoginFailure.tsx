'use client';

import CustomAlert from '@/components/CustomAlert';
import { OAUTH_LOGIN_MESSAGE_CODE } from '@/constants/auth';
import useAppRouter from '@/hooks/custom/useAppRouter';
import { LoaderCircleIcon } from 'lucide-react';
import { useState } from 'react';

interface Props {
  messageCode: number;
}

const OAuthLoginFailure = ({ messageCode }: Props) => {
  const router = useAppRouter();
  const [open, setOpen] = useState(true);

  return (
    <>
      <div className="flex size-full items-center justify-center">
        <LoaderCircleIcon className="size-6 animate-spin text-primary" />
      </div>
      <CustomAlert
        open={open}
        setOpen={setOpen}
        title={OAUTH_LOGIN_MESSAGE_CODE[messageCode]}
        confirmText="다시 로그인"
        onConfirm={() => router.push({ href: '/login-splash' })}
      />
    </>
  );
};

export default OAuthLoginFailure;
