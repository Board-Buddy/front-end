export const isWebView = () => {
  if (typeof window === 'undefined') return;

  window.ReactNativeWebView?.postMessage(
    JSON.stringify({
      type: 'DEBUG',
      payload: 'ReactNativeWebView가 정상적으로 주입됨',
    }),
  );

  return typeof window !== 'undefined' && !!window.ReactNativeWebView;
};
