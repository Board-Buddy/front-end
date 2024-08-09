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
        className="w-full text-gray-400 text-sm h-8 rounded-xl bg-[#efefef]"
        onClick={handleClick}
      >
        로그아웃
      </Button>
    </div>
  );
};

export default LogoutButton;
