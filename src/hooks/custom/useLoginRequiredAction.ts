'use client';

import { useLoginPromptModal } from '@/store/modalStore';
import { useUserInfo } from './useUserInfo';

export const useLoginRequiredAction = () => {
  const userInfo = useUserInfo();
  const open = useLoginPromptModal((state) => state.open);

  const runIfLoggedIn = (action: () => void) => {
    if (!userInfo) {
      open();
      return;
    }

    action();
  };

  return { runIfLoggedIn };
};
