'use client';

import { useEffect, useState } from 'react';

export const MSWComponent = ({ children }: { children: React.ReactNode }) => {
  const [mswReady, setMswReady] = useState(false);

  useEffect(() => {
    async function setUpWorker() {
      if (typeof window === 'undefined') {
        console.log('window is undefined');
        return;
      }

      if (process.env.NEXT_PUBLIC_API_MOCKING === 'enabled') {
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
