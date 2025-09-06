'use client';

import { ReactNode, useEffect } from 'react';
import { useUserInfo } from '@/hooks/useAuth';
import { useSetUserInfo } from '@/hooks/custom/useSetUserInfo';

interface Props {
  loggedIn: boolean;
  children: ReactNode;
}

const AuthStatusLoader = ({ loggedIn, children }: Props) => {
  const { data, isPending } = useUserInfo({ isReady: loggedIn });
  const setUserInfo = useSetUserInfo();

  useEffect(() => {
    if (!isPending) {
      setUserInfo(data ?? null);
    }
  }, [data, setUserInfo, isPending]);

  return <>{children}</>;
};

export default AuthStatusLoader;
