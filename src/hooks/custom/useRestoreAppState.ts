import { StateKey } from '@/utils/appState';
import { useEffect } from 'react';
import useIsWebView from './useIsWebView';

type RestoreStateCallback<T> = (state: T) => void;

const useRestoreAppState = <T>(
  key: StateKey,
  onRestore: RestoreStateCallback<T>,
) => {
  const isWebView = useIsWebView();

  useEffect(() => {
    if (!isWebView) {
      return;
    }

    // 앱 상태 구독 메시지 전송 함수
    const sendRegisterState = () => {
      window.ReactNativeWebView?.postMessage(
        JSON.stringify({
          type: 'REGISTER_STATE',
          key,
        }),
      );
    };

    // 앱 상태 복원 메시지 핸들러
    const handleRestoreState = (e: MessageEvent) => {
      const { type, state } = JSON.parse(e.data);

      if (type === 'RESTORE_STATE' && state) {
        onRestore(state);
      }
    };

    const handleVisibilityChange = () => {
      if (document.visibilityState === 'visible') {
        sendRegisterState();
      }
    };

    sendRegisterState();

    window.addEventListener('message', handleRestoreState); // ios
    // @ts-ignore
    document.addEventListener('message', handleRestoreState); // android

    document.addEventListener('visibilitychange', handleVisibilityChange);

    return () => {
      window.removeEventListener('message', handleRestoreState);
      // @ts-ignore
      document.removeEventListener('message', handleRestoreState);

      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, [key, onRestore, isWebView]);
};

export default useRestoreAppState;
