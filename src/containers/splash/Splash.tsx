'use client';

import { cn } from '@/utils/tailwind';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import About from './About';

const Splash = () => {
  const [skip, setSkip] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setSkip(true);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="relative">
      <div
        className={cn(
          'absolute bg-primary h-[100vh] flex flex-col justify-center items-center w-full transition-all opacity-100',
          skip && 'opacity-0',
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
        <p className="text-white text-lg">
          <span className="font-extrabold">보드</span>게임할사람
        </p>
        <p className="text-white text-lg">
          여기<span className="font-extrabold">버디</span> 모여라
        </p>
      </div>
      <div className={cn('opacity-0 transition-all', skip && 'opacity-100')}>
        <About />
      </div>
    </div>
  );
};

export default Splash;
