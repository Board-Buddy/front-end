'use client';

import { ReactNode, useEffect } from 'react';
import { useUserInfo } from '@/hooks/useAuth';
import { useSetUserInfo } from '@/hooks/custom/useSetUserInfo';

interface Props {
  children: ReactNode;
}

const AuthStatusLoader = ({ children }: Props) => {
  const { data, isPending } = useUserInfo();
  const setUserInfo = useSetUserInfo();

  useEffect(() => {
    if (!isPending) {
      setUserInfo(data ?? null);
    }
  }, [data, setUserInfo, isPending]);

  return <>{children}</>;
};

export default AuthStatusLoader;
