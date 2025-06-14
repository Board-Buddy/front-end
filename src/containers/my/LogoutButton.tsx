'use client';

import { Button } from '@/components/ui/button';
import { useLogout } from '@/hooks/useAuth';

const LogoutButton = () => {
  const mutation = useLogout();

  const handleClick = () => {
    mutation.mutate();
  };

  return (
    <div className="basis-1/2">
      <Button
        className="h-8 w-full rounded-xl bg-bgGray text-sm text-gray-400"
        onClick={handleClick}
      >
        로그아웃
      </Button>
    </div>
  );
};

export default LogoutButton;
