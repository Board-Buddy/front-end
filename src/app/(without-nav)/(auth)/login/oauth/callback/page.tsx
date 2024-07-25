import LoginCallback from '@/containers/login/LoginCallback';
import { Suspense } from 'react';

const page = () => {
  return (
    <Suspense>
      <LoginCallback />
    </Suspense>
  );
};

export default page;
