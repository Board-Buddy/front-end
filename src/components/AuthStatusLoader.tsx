'use client';

import { ReactNode, useEffect } from 'react';
import { useUserLoginCheck } from '@/hooks/useAuth';
import Loading from './Loading';
import { useSetUserInfo } from '@/hooks/custom/useSetUserInfo';

interface Props {
  children: ReactNode;
}

const AuthStatusLoader = ({ children }: Props) => {
  const { data, isPending } = useUserLoginCheck({ isReady: true });
  const setUserInfo = useSetUserInfo();

  useEffect(() => {
    setUserInfo(data ?? null);
  }, [data, setUserInfo]);

  if (isPending) return <Loading />;

  return <>{children}</>;
};

export default AuthStatusLoader;
