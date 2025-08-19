'use client';

import { useUserInfoSelector } from '@/store/userInfoStore';
import { UserInfo } from '@/types/user';
import useRestoreAppState from './useRestoreAppState';
import { useCallback, useState } from 'react';
import { STATE_KEYS } from '@/utils/webview';

export const useUserInfo = () => {
  const [appUserInfo, setAppUserInfo] = useState<UserInfo | null>(null);

  const onRestore = useCallback((state: UserInfo | null) => {
    if (state) {
      setAppUserInfo(state);
    }
  }, []);

  useRestoreAppState(STATE_KEYS.USER_INFO, onRestore);

  const webUserInfo = useUserInfoSelector();

  return appUserInfo ?? webUserInfo;
};
