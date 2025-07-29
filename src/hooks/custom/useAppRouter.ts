import { NavigateOptions } from 'next/dist/shared/lib/app-router-context.shared-runtime';
import { useRouter } from 'next/navigation';
import useIsWebView from './useIsWebView';

type NavigateMethod = 'PUSH' | 'REPLACE' | 'BACK' | 'FORWARD';
type ScreenName = 'HomeScreen' | 'ChatScreen' | 'MapScreen' | 'MyPageScreen';

const screenMap = {
  HomeScreen: '/',
  ChatScreen: '/chat',
  MapScreen: '/map',
  MyPageScreen: '/my',
} as Record<ScreenName, string>;

export interface NavigateArgs {
  href: string;
  options?: NavigateOptions;
  headerTitle?: string;
  screenName?: ScreenName;
}

const useAppRouter = () => {
  const router = useRouter();
  const isWebView = useIsWebView();

  const sendToWebView = (
    method: NavigateMethod,
    href?: string,
    headerTitle?: string,
    screenName?: ScreenName,
  ) =>
    window.ReactNativeWebView?.postMessage(
      JSON.stringify({
        type: 'ROUTER_EVENT',
        method,
        webUrl: href,
        targetPath: screenName ? screenMap[screenName] : '/webview',
        headerTitle,
      }),
    );

  const push = ({ href, options, headerTitle, screenName }: NavigateArgs) => {
    if (!href) {
      throw new Error('href is required for push navigation');
    }

    return isWebView
      ? sendToWebView('PUSH', href, headerTitle, screenName)
      : router.push(href, options);
  };

  const replace = ({
    href,
    options,
    headerTitle,
    screenName,
  }: NavigateArgs) => {
    if (!href) {
      throw new Error('href is required for replace navigation');
    }

    return isWebView
      ? sendToWebView('REPLACE', href, headerTitle, screenName)
      : router.replace(href, options);
  };

  const back = () => (isWebView ? sendToWebView('BACK') : router.back());

  return { push, replace, back };
};

export default useAppRouter;
