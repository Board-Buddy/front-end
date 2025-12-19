'use client';

import { ReactNode, useEffect } from 'react';
import { useUserInfo } from '@/hooks/useAuth';
import { useSetUserInfo } from '@/hooks/custom/useSetUserInfo';

interface Props {
  children: ReactNode;
}

const AuthStatusLoader = ({ children }: Props) => {
  const { data, isSuccess } = useUserInfo();
  const setUserInfo = useSetUserInfo();

  useEffect(() => {
    if (isSuccess) {
      setUserInfo(data ?? null);
    }
  }, [data, setUserInfo, isSuccess]);

  return <>{children}</>;
};

export default AuthStatusLoader;
