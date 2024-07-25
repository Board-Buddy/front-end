'use client';

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

const OAuthVerifiedFailure = () => {
  const router = useRouter();

  useEffect(() => {
    router.push('/register/additionalSettings');
  }, [router]);

  return <div>Redirecting...</div>;
};

export default OAuthVerifiedFailure;
