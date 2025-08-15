'use client';

import useAppUserInfo from '@/hooks/custom/useAppUserInfo';

const AppUserInfoLoader = () => {
  useAppUserInfo();

  return null;
};

export default AppUserInfoLoader;
