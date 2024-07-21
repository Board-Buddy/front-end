'use client';

import { ChevronLeft } from 'lucide-react';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex flex-col p-3">
      <ChevronLeft
        className="w-6 h-6 cursor-pointer mb-6"
        onClick={() => {
          window.history.back();
        }}
      />
      <main className="min-h-screen p-2">{children}</main>
    </div>
  );
}
