'use client';

import { PropsWithChildren, Suspense, use } from 'react';
import { MSW_MOCKING } from '@/constants/env';

const mockingEnabledPromise =
  typeof window !== 'undefined'
    ? import('./browser').then(async ({ browser }) => {
        if (MSW_MOCKING !== 'enabled') return;
        if (process.env.NODE_ENV === 'production') return;

        await browser.start({
          onUnhandledRequest: (request) => {
            const mockAllowedDomains = [
              process.env.NEXT_PUBLIC_API_SERVER_URL!,
            ];

            // 허용된 도메인 외 요청은 무시(bypass)
            if (
              !mockAllowedDomains.some((domain) => request.url.includes(domain))
            ) {
              return 'bypass';
            }

            // 허용된 도메인인데 핸들러가 없으면 경고 출력
            console.warn(
              `[MSW] Unhandled request: ${request.method} ${request.url}`,
            );
          },
        });
      })
    : Promise.resolve();

const MockProviderWrapper = ({ children }: PropsWithChildren) => {
  use(mockingEnabledPromise);

  return children;
};

export const MockProvider = ({ children }: PropsWithChildren) => (
  <Suspense fallback={null}>
    <MockProviderWrapper>{children}</MockProviderWrapper>
  </Suspense>
);
