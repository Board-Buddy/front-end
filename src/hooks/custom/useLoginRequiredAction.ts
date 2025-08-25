'use client';

import { useLoginPromptModal } from '@/store/modalStore';
import { useUserInfo } from './useUserInfo';
import { useEffect, useRef } from 'react';

export const useLoginRequiredAction = () => {
  const { userInfo, isLoading } = useUserInfo();
  const open = useLoginPromptModal((state) => state.open);
  const pendingActionRef = useRef<(() => void) | null>(null);

  const runIfLoggedIn = (action: () => void) => {
    if (isLoading) {
      pendingActionRef.current = action;
      return;
    }

    if (!userInfo) {
      open();
      return;
    }

    action();
  };

  useEffect(() => {
    if (!isLoading && pendingActionRef.current) {
      if (!userInfo) {
        open();
      } else {
        pendingActionRef.current();
      }

      pendingActionRef.current = null;
    }
  }, [isLoading, userInfo, open]);

  return { runIfLoggedIn };
};
