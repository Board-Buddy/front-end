'use client';

import { ChevronLeft } from 'lucide-react';
import { Metadata, Viewport } from 'next';

const BASE_URL = 'https://boardbuddyapp.vercel.app';

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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex flex-col p-3 min-h-dvh max-h-dvh">
      <ChevronLeft
        className="w-6 h-6 cursor-pointer mb-6"
        onClick={() => {
          window.history.back();
        }}
      />
      <div className="overflow-y-scroll p-2">{children}</div>
    </div>
  );
}
