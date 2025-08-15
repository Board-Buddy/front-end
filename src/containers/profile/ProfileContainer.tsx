'use client';

import { useUserInfo } from '@/hooks/custom/useUserInfo';
import { ReactNode } from 'react';
import LoginPrompt from '@/components/LoginPrompt';
import { usePathname } from 'next/navigation';

interface Props {
  children: ReactNode;
}

const ProfileContainer = ({ children }: Props) => {
  const userInfo = useUserInfo();
  const pathname = usePathname();

  return (
    <>
      {userInfo ? (
        children
      ) : (
        <LoginPrompt
          feature={pathname?.includes('my') ? '마이페이지' : '프로필'}
        />
      )}
    </>
  );
};

export default ProfileContainer;
