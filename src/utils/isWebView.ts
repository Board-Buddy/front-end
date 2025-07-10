export const isWebView = () => {
  if (typeof window === 'undefined') {
    console.log('window가 정의되지 않음');
    return false;
  }

  if (window) {
    console.log('window.ReactNativeWebView: ', window.ReactNativeWebView);
  }

  return typeof window !== 'undefined' && !!window.ReactNativeWebView;
};
