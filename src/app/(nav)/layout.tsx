import type { Metadata, Viewport } from 'next';
import NavBar from '@/components/NavBar';
import { BASE_URL } from '../layout';
import React from 'react';
import WriteButton from '@/containers/home/WriteButton';

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
  height: 'device-height',
  initialScale: 1.0,
  maximumScale: 1.0,
  userScalable: false,
};

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <main className="relative flex-1 overflow-y-auto">{children}</main>
      <div className="relative">
        <WriteButton />
        <NavBar />
      </div>
    </>
  );
}
