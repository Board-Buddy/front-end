import { WriteFormProvider } from '@/context/WriteFormContext';
import React from 'react';

export default function Layout({
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
