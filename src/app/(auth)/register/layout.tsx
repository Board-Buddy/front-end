'use client';

import { ChevronLeft } from 'lucide-react';
import React from 'react';

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="overflow-y-scroll">
      <div className="flex items-center p-4">
        <div className="basis-1/3">
          <ChevronLeft
            className="size-6 cursor-pointer"
            onClick={() => {
              window.history.back();
            }}
          />
        </div>
        <div className="basis-1/3 text-center">
          <span className="font-bold text-gray-800">회원가입</span>
        </div>
      </div>
      {children}
    </div>
  );
}
