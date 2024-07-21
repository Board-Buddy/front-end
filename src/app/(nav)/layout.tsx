import type { Metadata } from 'next';
import '../../styles/globals.css';
import NavBar from '@/components/NavBar';

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
    <>
      <main className="overflow-y-auto flex-1 px-4 py-4">{children}</main>
      <NavBar />
    </>
  );
}
