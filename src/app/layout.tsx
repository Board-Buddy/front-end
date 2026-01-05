import type { Metadata, Viewport } from 'next';
import { Inter as FontSans } from 'next/font/google';
import { cn } from '@/utils/tailwind';
import '../styles/globals.css';
import ReactQueryProviders from '@/utils/reactQueryProvider';
import Header from '@/components/Header';
import { Toaster } from 'react-hot-toast';
import { ExistingProfileInfoContextProvider } from '@/context/ExistingProfileInfoContext';
import React from 'react';
import { WebViewProvider } from '@/context/WebViewContext';
import { getIsWebView } from '@/utils/getIsWebView';
import { MockProvider } from '@/mocks/mockProvider';
import { MSW_MOCKING } from '@/constants/env';

if (
  process.env.NEXT_RUNTIME === 'nodejs' &&
  process.env.NODE_ENV !== 'production' &&
  MSW_MOCKING === 'enabled'
) {
  const { server } = await import('@/mocks/server');

  server.listen({
    onUnhandledRequest: (request) => {
      const mockAllowedDomains = [process.env.NEXT_PUBLIC_API_SERVER_URL!];

      // 허용된 도메인 외 요청은 무시(bypass)
      if (!mockAllowedDomains.some((domain) => request.url.includes(domain))) {
        return 'bypass';
      }

      // 허용된 도메인인데 핸들러가 없으면 경고 출력
      console.warn(`[MSW] Unhandled request: ${request.method} ${request.url}`);
    },
  });
}

const fontSans = FontSans({
  subsets: ['latin'],
  variable: '--font-sans',
});

export const metadata: Metadata = {
  title: '보드버디',
  description: '보드게임 할 사람, 여기 버디 모여라!',
  metadataBase: new URL('https://m.boardbuddi.com'),
  verification: {
    google: 'X1xHGFlVn2nMh1e8HfS6YhIQUQgpwjY9T6HNnUZ8y3M',
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1.0,
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const isWebView = await getIsWebView();

  return (
    <html lang="ko">
      <body
        className={cn(
          'min-h-screen bg-gray-100 font-sans antialiased',
          fontSans.variable,
        )}
      >
        <div
          className={cn(
            'max-w-md bg-white mx-auto h-dvh max-h-dvh flex flex-col shadow-md',
          )}
        >
          <MockProvider>
            <ReactQueryProviders>
              <WebViewProvider isWebView={isWebView}>
                <ExistingProfileInfoContextProvider>
                  <Toaster />
                  <Header />
                  {children}
                </ExistingProfileInfoContextProvider>
              </WebViewProvider>
            </ReactQueryProviders>
          </MockProvider>
        </div>
      </body>
    </html>
  );
}
