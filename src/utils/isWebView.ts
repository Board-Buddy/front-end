export const isWebView = () => {
  if (typeof window === 'undefined') {
    console.log('window가 정의되지 않음');
    return false;
  }

  if (window && !window.ReactNativeWebView) {
    console.log('window는 존재하지만 ReactNativeWebview가 존재하지 않음');
  }

  return typeof window !== 'undefined' && !!window.ReactNativeWebView;
};
