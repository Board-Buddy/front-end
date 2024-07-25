'use client';

import { OAUTH_LOGIN_MESSAGE_CODE } from '@/constants/auth';
import { LoaderCircleIcon } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

interface Props {
  messageCode: number;
}

const OAuthLoginFailure = ({ messageCode }: Props) => {
  const router = useRouter();

  useEffect(() => {
    alert(OAUTH_LOGIN_MESSAGE_CODE[messageCode]);
    router.push('/login');
  }, [messageCode, router]);

  return (
    <div className="w-full h-full flex justify-center items-center">
      <LoaderCircleIcon className="animate-spin text-primary size-6" />
    </div>
  );
};

export default OAuthLoginFailure;
