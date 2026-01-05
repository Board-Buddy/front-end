import NavBar from '@/components/NavBar';
import React from 'react';
import WriteButton from '@/containers/home/WriteButton';

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <main className="relative flex flex-1 flex-col overflow-y-auto">
        {children}
      </main>
      <div className="relative">
        <WriteButton />
        <NavBar />
      </div>
    </>
  );
}
