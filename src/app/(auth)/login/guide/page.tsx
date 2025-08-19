import Loading from '@/components/Loading';
import LoginGuide from '@/containers/login/LoginGuide';
import { Suspense } from 'react';

const page = () => {
  return (
    <Suspense fallback={<Loading />}>
      <LoginGuide />
    </Suspense>
  );
};

export default page;
