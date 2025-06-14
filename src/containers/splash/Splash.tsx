'use client';

import { cn } from '@/utils/tailwind';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import About from './About';

const Splash = () => {
  const [showSplash, setShowSplash] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowSplash(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="relative">
      <div
        className={cn(
          'absolute bg-primary h-[100vh] flex flex-col justify-center items-center w-full transition-all',
          showSplash ? 'opacity-100' : 'opacity-0 pointer-events-none',
        )}
      >
        <Image
          src="/images/logo/splash_logo.png"
          width={80}
          height={80}
          alt="splash logo"
          priority
          className="pb-6"
        />
        <p className="text-lg text-white">
          <span className="font-extrabold">보드</span>게임할사람
        </p>
        <p className="text-lg text-white">
          여기<span className="font-extrabold">버디</span> 모여라
        </p>
      </div>
      {!showSplash && <About />}
    </div>
  );
};

export default Splash;
