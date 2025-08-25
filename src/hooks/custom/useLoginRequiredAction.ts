'use client';

import { useLoginPromptModal } from '@/store/modalStore';
import { useUserInfo } from './useUserInfo';
import { sendDebugLogToApp } from '@/utils/webview';

export const useLoginRequiredAction = () => {
  const { userInfo, isLoading } = useUserInfo();
  const open = useLoginPromptModal((state) => state.open);

  const runIfLoggedIn = (action: () => void) => {
    // TODO: 동작 확인 후 삭제
    sendDebugLogToApp(`runIfLoggedIn userInfo: ${userInfo}`);

    if (!isLoading && !userInfo) {
      open();
      return;
    }

    action();
  };

  return { runIfLoggedIn };
};
