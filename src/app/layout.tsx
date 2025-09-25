import type { Metadata, Viewport } from 'next';
import { Inter as FontSans } from 'next/font/google';
import { cn } from '@/utils/tailwind';
import '../styles/globals.css';
import { MSWComponent } from '@/mocks/MSWComponent';
import ReactQueryProviders from '@/utils/reactQueryProvider';
import Header from '@/components/Header';
import { Toaster } from 'react-hot-toast';
import { ExistingProfileInfoContextProvider } from '@/context/ExistingProfileInfoContext';
import React from 'react';
import { WebViewProvider } from '@/context/WebViewContext';
import { getIsWebView } from '@/utils/getIsWebView';

const fontSans = FontSans({
  subsets: ['latin'],
  variable: '--font-sans',
});

export const BASE_URL = 'https://m.boardbuddi.com';

export const metadata: Metadata = {
  title: '보드버디',
  description: '보드게임 할 사람, 여기 버디 모여라!',
  icons: {
    icon: '/images/logo/boardbuddy_small_logo_orange.png',
  },
  openGraph: {
    title: '보드버디',
    url: BASE_URL,
    siteName: '보드버디',
    images: [
      {
        url: `${BASE_URL}/images/og_image.png`,
        width: 1600,
        height: 630,
      },
    ],
    locale: 'ko_KR',
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
          <MSWComponent>
            <ReactQueryProviders>
              <WebViewProvider isWebView={isWebView}>
                <ExistingProfileInfoContextProvider>
                  <Toaster />
                  <Header />
                  {children}
                </ExistingProfileInfoContextProvider>
              </WebViewProvider>
            </ReactQueryProviders>
          </MSWComponent>
        </div>
      </body>
    </html>
  );
}
