'use client';

import { useEffect } from 'react';
import { MessageType } from '@/types/webview';
import { postRNMessage, sendDebugLogToApp } from '@/utils/webview';
import { useQueryClient } from '@tanstack/react-query';
import { authQueryKeys } from '@/utils/queryKeys';
import { useSetUserInfo } from '../useAuth';

// TODO: 이것도 같이 수정하기
const useAppUserInfo = () => {
  const queryClient = useQueryClient();
  const setUserInfo = useSetUserInfo();

  useEffect(() => {
    postRNMessage(MessageType.GET_USER_INFO);

    const handleUserInfoResponse = async (e: MessageEvent) => {
      try {
        const { type, state } = JSON.parse(e.data);

        if (type === MessageType.USER_INFO) {
          sendDebugLogToApp(`userInfo: ${JSON.stringify(state)}`);

          setUserInfo(() => state);

          sendDebugLogToApp(
            `queryData: ${JSON.stringify(queryClient.getQueryData(authQueryKeys.userInfo()))}`,
          );
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
  }, [queryClient, setUserInfo]);
};

export default useAppUserInfo;
