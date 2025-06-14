import { Button } from '@/components/ui/button';
import { cn } from '@/utils/tailwind';

const DisabledButton = () => {
  return (
    <div className="mb-8 px-4">
      <Button
        disabled
        className={cn('w-full text-white font-bold text-base h-12 shadow-md')}
      >
        거절됨
      </Button>
    </div>
  );
};

export default DisabledButton;
