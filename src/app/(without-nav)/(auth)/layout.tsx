'use client';

import { ChevronLeft } from 'lucide-react';

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
