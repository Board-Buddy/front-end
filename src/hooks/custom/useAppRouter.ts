import { NavigateOptions } from 'next/dist/shared/lib/app-router-context.shared-runtime';
import { useRouter } from 'next/navigation';
import useIsWebView from './useIsWebView';

type NavigateMethod = 'PUSH' | 'REPLACE' | 'BACK' | 'FORWARD';
type ScreenName = 'HomeScreen' | 'ChatScreen' | 'MapScreen' | 'MyPageScreen';

const screenMap = {
  HomeScreen: '',
  ChatScreen: 'chat',
  MapScreen: 'map',
  MyPageScreen: 'my',
} as Record<ScreenName, string>;

interface NavigateParams {
  method: NavigateMethod;
  href: string;
  options?: NavigateOptions;
  screenName?: ScreenName;
  headerTitle?: string;
}

const useAppRouter = () => {
  const router = useRouter();
  const isWebView = useIsWebView();

  const navigate = ({
    method,
    href,
    options,
    screenName,
    headerTitle,
  }: NavigateParams) => {
    if (isWebView) {
      return window.ReactNativeWebView?.postMessage(
        JSON.stringify({
          type: 'ROUTER_EVENT',
          method,
          webUrl: href,
          targetScreen: screenName ? screenMap[screenName] : 'webview',
          headerTitle,
        }),
      );
    }

    switch (method) {
      case 'PUSH':
        if (!href) throw new Error('href 설정 오류');
        return router.push(href, options);

      case 'REPLACE':
        if (!href) throw new Error('href 설정 오류');
        return router.replace(href, options);

      case 'BACK':
        return router.back();

      case 'FORWARD':
        return router.forward();
    }
  };

  return { navigate };
};

export default useAppRouter;
