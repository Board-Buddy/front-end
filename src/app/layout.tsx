import type { Metadata } from 'next';
import { Inter as FontSans } from 'next/font/google';
import { cn } from '@/utils/tailwind';
import '../styles/globals.css';
import { MSWComponent } from '@/mocks/MSWComponent';
import Link from 'next/link';

const fontSans = FontSans({
  subsets: ['latin'],
  variable: '--font-sans',
});

export const metadata: Metadata = {
  title: 'Board Buddy',
  description: '보드게임 할 사람, 여기 버디 모여라!',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
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
            'max-w-md bg-white mx-auto min-h-dvh max-h-dvh flex flex-col',
          )}
        >
          <header className="px-4 mx-auto py-3">상단 헤더</header>
          <main className="overflow-y-auto flex-1 px-4">
            <MSWComponent>{children}</MSWComponent>
          </main>
          <footer>
            <ul className="flex justify-evenly items-center h-16">
              <li>
                <Link href="/home">홈</Link>
              </li>
              <li>
                <Link href="/chat">메세지</Link>
              </li>
              <li>
                <Link href="/map">카페 위치</Link>
              </li>
              <li>
                <Link href="/my">마이페이지</Link>
              </li>
            </ul>
          </footer>
        </div>
      </body>
    </html>
  );
}
