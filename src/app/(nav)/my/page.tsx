// 'use client';

import Profile from '@/containers/profile/Profile';

export const dynamic = 'force-dynamic';
export const fetchCache = 'force-no-store';

const page = () => {
  return <Profile />;
};

export default page;
