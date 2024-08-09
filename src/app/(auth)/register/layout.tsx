'use client';

import { ChevronLeft } from 'lucide-react';

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="overflow-y-scroll">
      <div className="p-4 flex items-center">
        <div className="basis-1/3">
          <ChevronLeft
            className="w-6 h-6 cursor-pointer"
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
