'use client';

import Loading from '@/components/Loading';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

const OAuthVerifiedFailure = () => {
  const router = useRouter();

  useEffect(() => {
    router.push('/register/additionalSettings');
  }, [router]);

  return <Loading />;
};

export default OAuthVerifiedFailure;
