'use client';

import { useUserInfo } from '@/hooks/custom/useUserInfo';
import { ReactNode } from 'react';
import LoginPrompt from '@/components/LoginPrompt';

interface Props {
  children: ReactNode;
}

const ProfileContainer = ({ children }: Props) => {
  const userInfo = useUserInfo();

  return <>{userInfo ? children : <LoginPrompt feature="프로필" />}</>;
};

export default ProfileContainer;
