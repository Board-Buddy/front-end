import { Button } from '@/components/ui/button';
import { cn } from '@/utils/tailwind';

const LogoutButton = () => {
  return (
    <div className="p-4">
      <Button
        className={cn(
          'w-full text-gray-400 font-bold text-md h-12 border border-gray-400 bg-white',
        )}
      >
        로그아웃
      </Button>
    </div>
  );
};

export default LogoutButton;
