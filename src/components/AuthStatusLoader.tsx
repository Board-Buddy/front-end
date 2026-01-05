'use client';

import { ReactNode, useEffect } from 'react';
import { useUserInfo } from '@/hooks/useAuth';
import { useSetUserInfo } from '@/hooks/custom/useSetUserInfo';

interface Props {
  children: ReactNode;
}

const AuthStatusLoader = ({ children }: Props) => {
  const { data, error } = useUserInfo();
  const setUserInfo = useSetUserInfo();

  useEffect(() => {
    if (data) {
      setUserInfo(data ?? null);
    }

    if (error) {
      setUserInfo(null);
    }
  }, [data, error, setUserInfo]);

  return <>{children}</>;
};

export default AuthStatusLoader;
