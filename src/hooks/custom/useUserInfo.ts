'use client';

import { useUserInfoSelector } from '@/store/userInfoStore';
import { UserInfo } from '@/types/user';
import useRestoreAppState from './useRestoreAppState';
import { useCallback, useState } from 'react';
import { sendDebugLogToApp, STATE_KEYS } from '@/utils/webview';
import useIsWebView from './useIsWebView';

export const useUserInfo = () => {
  const isWebView = useIsWebView();

  const [appUserInfo, setAppUserInfo] = useState<UserInfo | null>(null);
  const webUserInfo = useUserInfoSelector();

  const [isLoading, setIsLoading] = useState(true);

  const onRestore = useCallback(
    (state: UserInfo | null) => {
      sendDebugLogToApp(`Restored userInfo: ${JSON.stringify(state)}`);

      setAppUserInfo(state);
      setIsLoading(false);
    },
    [setIsLoading],
  );

  useRestoreAppState(STATE_KEYS.USER_INFO, onRestore);

  return isWebView
    ? { userInfo: appUserInfo, isLoading }
    : { userInfo: webUserInfo, isLoading: false };
};
