import { useEffect } from 'react';
import useIsWebView from './useIsWebView';
import { MessagePayloadMap } from '@/types/webview';
import { sendDebugLogToApp } from '@/utils/webview';

const useWebViewMessageHandler = <T extends keyof MessagePayloadMap>(
  messageType: T,
  callback: (payload: MessagePayloadMap[T]) => void,
) => {
  const isWebView = useIsWebView();

  useEffect(() => {
    if (!isWebView) return;

    const handleWebViewMessage = (e: MessageEvent) => {
      try {
        const { type, payload } = JSON.parse(e.data) as {
          type: keyof MessagePayloadMap;
          payload: unknown;
        };

        if (type === messageType) {
          callback(payload as MessagePayloadMap[T]);
        }
      } catch (error) {
        sendDebugLogToApp(
          `웹뷰 메시지 처리 중 오류 발생, type: ${messageType}, error: ${error}`,
        );
      }
    };

    window.addEventListener('message', handleWebViewMessage); // ios
    // @ts-ignore
    document.addEventListener('message', handleWebViewMessage); // android

    return () => {
      window.removeEventListener('message', handleWebViewMessage);
      // @ts-ignore
      document.removeEventListener('message', handleWebViewMessage);
    };
  }, [isWebView, messageType, callback]);
};

export default useWebViewMessageHandler;
