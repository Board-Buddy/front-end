import NavBar from '@/components/NavBar';
import React, { Suspense } from 'react';
import WriteButton from '@/containers/home/WriteButton';

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <main className="relative flex-1 overflow-y-auto">{children}</main>
      <div className="relative">
        <Suspense>
          <WriteButton />
          <NavBar />
        </Suspense>
      </div>
    </>
  );
}
