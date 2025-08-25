'use client';

import { useUserInfo } from '@/hooks/custom/useUserInfo';
import { ReactNode } from 'react';
import LoginPrompt from '@/components/LoginPrompt';
import { usePathname } from 'next/navigation';
import Loading from '@/components/Loading';

interface Props {
  children: ReactNode;
}

const ProfileContainer = ({ children }: Props) => {
  const { userInfo, isLoading } = useUserInfo();
  const pathname = usePathname();

  return (
    <>
      {isLoading ? (
        <Loading />
      ) : userInfo ? (
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
