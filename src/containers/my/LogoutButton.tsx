'use client';

import { Button } from '@/components/ui/button';
import { useLogout } from '@/hooks/useAuth';
import { cn } from '@/utils/tailwind';

const LogoutButton = () => {
  const mutation = useLogout();

  const handleClick = () => {
    mutation.mutate();
  };

  return (
    <div className="p-4">
      <Button
        className={cn(
          'w-full text-gray-400 font-bold text-md h-12 border border-gray-400 bg-white',
        )}
        onClick={handleClick}
      >
        로그아웃
      </Button>
    </div>
  );
};

export default LogoutButton;
