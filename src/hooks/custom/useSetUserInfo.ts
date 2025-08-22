'use client';

import { useUserInfoStore } from '@/store/userInfoStore';
import { UserInfo } from '@/types/user';
import { postRNMessage, STATE_KEYS } from '@/utils/webview';
import { MessageType } from '@/types/webview';
import { useCallback } from 'react';

export const useSetUserInfo = () => {
  const set = useUserInfoStore((state) => state.setUserInfo);

  const setUserInfo = useCallback(
    (userInfo: Partial<UserInfo> | null) => {
      set(userInfo);

      postRNMessage(MessageType.SAVE_STATE, {
        key: STATE_KEYS.USER_INFO,
        state: userInfo,
      });
    },
    [set],
  );

  return setUserInfo;
};
