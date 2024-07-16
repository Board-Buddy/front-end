'use client';

import { useUserLoginCheck } from '@/hooks/useAuth';

const Example = () => {
  // react-query 사용 예시
  const { isPending, isError, data, error } = useUserLoginCheck();

  if (isPending) return <div>loading...</div>;

  return <div>Example</div>;
};

export default Example;
