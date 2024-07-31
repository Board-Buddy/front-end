import { Button } from '@/components/ui/button';
import { cn } from '@/utils/tailwind';

const DeleteAccountButton = () => {
  return (
    <div className="px-4 mb-8">
      <Button
        className={cn(
          'w-full text-red-500 font-bold text-md h-12 border border-red-500 bg-white',
        )}
      >
        탈퇴하기
      </Button>
    </div>
  );
};

export default DeleteAccountButton;
