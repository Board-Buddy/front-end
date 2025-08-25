'use client';

import { useUserInfo } from '@/hooks/custom/useUserInfo';
import { ReactNode } from 'react';
import LoginPrompt from '@/components/LoginPrompt';
import Loading from '@/components/Loading';

interface Props {
  children: ReactNode;
}

const NotificationListContainer = ({ children }: Props) => {
  const { userInfo, isLoading } = useUserInfo();

  return (
    <>
      {isLoading ? (
        <Loading />
      ) : userInfo ? (
        children
      ) : (
        <LoginPrompt feature="알림" />
      )}
    </>
  );
};

export default NotificationListContainer;
