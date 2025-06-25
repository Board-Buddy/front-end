'use client';

import { ReactNode } from 'react';
import { useUserLoginCheck } from '@/hooks/useAuth';
import Loading from './Loading';

interface Props {
  children: ReactNode;
}

const AuthGuard = ({ children }: Props) => {
  const { isPending } = useUserLoginCheck({ isReady: true });

  if (isPending) return <Loading />;

  return <>{children}</>;
};

export default AuthGuard;
