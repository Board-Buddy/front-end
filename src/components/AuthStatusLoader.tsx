'use client';

import { ReactNode, useEffect } from 'react';
import { useUserLoginCheck } from '@/hooks/useAuth';
import { useSetUserInfo } from '@/hooks/custom/useSetUserInfo';

interface Props {
  children: ReactNode;
}

const AuthStatusLoader = ({ children }: Props) => {
  const { data, isPending } = useUserLoginCheck({ isReady: true });
  const setUserInfo = useSetUserInfo();

  useEffect(() => {
    if (!isPending) {
      setUserInfo(data ?? null);
    }
  }, [data, setUserInfo, isPending]);

  return <>{children}</>;
};

export default AuthStatusLoader;
