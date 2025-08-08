'use client';

import { useUserInfo } from '@/hooks/custom/useUserInfo';
import { ReactNode } from 'react';
import NotificationListLoginPrompt from './NotificationListLoginPrompt';

interface Props {
  children: ReactNode;
}

const NotificationListContainer = ({ children }: Props) => {
  const userInfo = useUserInfo();

  return <>{userInfo ? children : <NotificationListLoginPrompt />}</>;
};

export default NotificationListContainer;
