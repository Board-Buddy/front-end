'use client';

import { useUserInfoStore } from '@/store/userInfoStore';
import { UserInfo } from '@/types/user';
import { postRNMessage, STATE_KEYS } from '@/utils/webview';
import { MessageType } from '@/types/webview';
import { useCallback } from 'react';
import useIsWebView from './useIsWebView';

export const useSetUserInfo = () => {
  const isWebView = useIsWebView();

  const set = useUserInfoStore((state) => state.setUserInfo);

  const setUserInfo = useCallback(
    (userInfo: Partial<UserInfo> | null) => {
      set(userInfo);

      if (isWebView) {
        postRNMessage(MessageType.SAVE_STATE, {
          key: STATE_KEYS.USER_INFO,
          state: userInfo,
        });
      }
    },
    [set, isWebView],
  );

  return setUserInfo;
};
