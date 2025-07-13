export const isWebView = () =>
  typeof window !== 'undefined' && !!window.ReactNativeWebView;
