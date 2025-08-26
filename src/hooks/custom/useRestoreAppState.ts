import { postRNMessage, StateKey } from '@/utils/webview';
import { useEffect } from 'react';
import useIsWebView from './useIsWebView';
import { MessageType } from '@/types/webview';
import useWebViewMessageHandler from './useWebViewMessageHandler';

type RestoreStateCallback<T> = (state: T) => void;

const useRestoreAppState = <T>(
  key: StateKey,
  onRestore: RestoreStateCallback<T>,
) => {
  const isWebView = useIsWebView();

  useWebViewMessageHandler(
    MessageType.RESTORE_STATE,
    (payload) => onRestore(payload.state as T),
    key,
  );

  useEffect(() => {
    if (!isWebView) {
      return;
    }

    // 앱 상태 구독 메시지 전송 함수
    const sendRegisterState = () => {
      postRNMessage(MessageType.REGISTER_STATE, { key });
    };

    sendRegisterState();

    const handleVisibilityChange = () => {
      if (document.visibilityState === 'visible') {
        sendRegisterState();
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);

    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, [key, isWebView]);
};

export default useRestoreAppState;
