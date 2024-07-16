'use client';

import { MSW_MOCKING } from '@/constants/env';
import { useEffect, useState } from 'react';

export const MSWComponent = ({ children }: { children: React.ReactNode }) => {
  const [mswReady, setMswReady] = useState(false);

  useEffect(() => {
    async function setUpWorker() {
      if (typeof window === 'undefined') {
        console.log('window is undefined');
        return;
      }

      if (MSW_MOCKING === 'enabled') {
        const { worker } = await import('./browser');
        await worker.start();
        setMswReady(true);
      }
    }

    if (!mswReady) {
      setUpWorker();
    }
  }, [mswReady]);

  return <>{children}</>;
};
