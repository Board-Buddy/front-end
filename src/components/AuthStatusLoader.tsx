'use client';

import { ReactNode, useEffect } from 'react';
import { useUserLoginCheck } from '@/hooks/useAuth';
import Loading from './Loading';
import { postRNMessage } from '@/utils/webview';
import { MessageType } from '@/types/webview';

interface Props {
  children: ReactNode;
}

const AuthStatusLoader = ({ children }: Props) => {
  const { data, isPending } = useUserLoginCheck({ isReady: true });

  useEffect(() => {
    if (data) {
      postRNMessage(MessageType.LOGIN, data);
    } else {
      postRNMessage(MessageType.LOGOUT); // 로그인 상태가 아닌 경우 앱에 있는 유저 정보 삭제
    }
  }, [data]);

  if (isPending) return <Loading />;

  return <>{children}</>;
};

export default AuthStatusLoader;
