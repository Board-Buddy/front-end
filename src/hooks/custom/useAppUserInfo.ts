'use client';

import { useEffect } from 'react';
import useIsWebView from './useIsWebView';
import { MessageType } from '@/types/webview';
import { postRNMessage, sendDebugLogToApp } from '@/utils/webview';
import { useQueryClient } from '@tanstack/react-query';
import { authQueryKeys } from '@/utils/queryKeys';

const useAppUserInfo = () => {
  const isWebView = useIsWebView();
  const queryClient = useQueryClient();

  useEffect(() => {
    if (!isWebView) return;

    postRNMessage(MessageType.GET_USER_INFO);

    const handleUserInfoResponse = async (e: MessageEvent) => {
      try {
        const { type, state } = JSON.parse(e.data);

        if (type === MessageType.USER_INFO) {
          sendDebugLogToApp(`userInfo: ${JSON.stringify(state)}`);

          await queryClient.prefetchQuery({
            queryKey: authQueryKeys.userInfo(),
            queryFn: () => Promise.resolve(state),
            staleTime: Infinity,
            gcTime: Infinity,
          });
        }
      } catch (error) {
        sendDebugLogToApp(`응답 형식이 맞지 않습니다. ${error}`);
      }
    };

    window.addEventListener('message', handleUserInfoResponse); // ios
    // @ts-ignore
    document.addEventListener('message', handleUserInfoResponse); // android

    return () => {
      window.removeEventListener('message', handleUserInfoResponse);
      // @ts-ignore
      document.removeEventListener('message', handleUserInfoResponse);
    };
  }, [isWebView, queryClient]);
};

export default useAppUserInfo;
