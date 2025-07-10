import { isWebView } from '@/utils/isWebView';
import { NavigateOptions } from 'next/dist/shared/lib/app-router-context.shared-runtime';
import { useRouter } from 'next/navigation';

type NavigateMethod = 'PUSH' | 'REPLACE' | 'BACK' | 'FORWARD';

const useAppRouter = () => {
  const router = useRouter();

  const navigate = (
    method: NavigateMethod,
    href?: string,
    screenName?: string,
    data?: Record<string, unknown>,
    options?: NavigateOptions,
  ) => {
    if (isWebView()) {
      return window.ReactNativeWebView?.postMessage(
        JSON.stringify({
          type: 'ROUTER_EVENT',
          method,
          href,
          screenName,
          data,
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
