'use client';

import Loading from '@/components/Loading';
import useAppRouter from '@/hooks/custom/useAppRouter';
import { useEffect } from 'react';

const OAuthVerifiedFailure = () => {
  const router = useAppRouter();

  useEffect(() => {
    router.push({ href: '/register/additionalSettings' });
  }, [router]);

  return <Loading />;
};

export default OAuthVerifiedFailure;
