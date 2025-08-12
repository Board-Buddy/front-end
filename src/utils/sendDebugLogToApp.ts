export const sendDebugLogToApp = (payload: string) => {
  window.ReactNativeWebView?.postMessage(
    JSON.stringify({
      type: 'DEBUG',
      payload,
    }),
  );
};
