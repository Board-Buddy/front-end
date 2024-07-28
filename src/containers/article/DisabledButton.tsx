import { Button } from '@/components/ui/button';
import { cn } from '@/utils/tailwind';

const DisabledButton = () => {
  return (
    <div className="px-4 mb-8">
      <Button
        disabled
        className={cn('w-full text-white font-bold text-md h-12 shadow-md')}
      >
        거절됨
      </Button>
    </div>
  );
};

export default DisabledButton;
