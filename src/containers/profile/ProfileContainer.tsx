'use client';

import { useUserInfo } from '@/hooks/custom/useUserInfo';
import { ReactNode } from 'react';
import ProfileLoginPrompt from './ProfileLoginPrompt';

interface Props {
  children: ReactNode;
}

const ProfileContainer = ({ children }: Props) => {
  const userInfo = useUserInfo();

  return <>{userInfo ? children : <ProfileLoginPrompt />}</>;
};

export default ProfileContainer;
