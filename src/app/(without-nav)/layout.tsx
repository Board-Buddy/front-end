import type { Metadata } from 'next';
import '../../styles/globals.css';
import { WriteFormProvider } from '@/context/WriteFormContext';

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
    <WriteFormProvider>
      <main className="overflow-y-auto">{children}</main>
    </WriteFormProvider>
  );
}
