'use client';

import { useLoginPromptModal } from '@/store/modalStore';
import { useUserInfo } from './useUserInfo';
import { sendDebugLogToApp } from '@/utils/webview';

export const useLoginRequiredAction = () => {
  const userInfo = useUserInfo();
  const open = useLoginPromptModal((state) => state.open);

  const runIfLoggedIn = (action: () => void) => {
    sendDebugLogToApp(`runIfLoggedIn userInfo: ${userInfo}`);

    if (!userInfo) {
      open();
      return;
    }

    action();
  };

  return { runIfLoggedIn };
};
