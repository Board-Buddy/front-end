import { Button } from '@/components/ui/button';
import { cn } from '@/utils/tailwind';
import { LoaderCircleIcon, RotateCcwIcon } from 'lucide-react';

interface Props {
  show: boolean;
  onClick: () => void;
  isPending: boolean;
}

const ReloadButton = ({ show, onClick, isPending }: Props) => {
  return (
    <div
      className={cn(
        'absolute top-4 left-1/2 -ml-[68px] z-10 transition-all',
        show || isPending ? 'visible' : 'hidden',
      )}
    >
      <Button
        className="border border-gray-300 text-primary font-bold bg-white rounded-3xl px-3 py-0 text-sm shadow-md"
        onClick={onClick}
      >
        {isPending ? (
          <LoaderCircleIcon className="animate-spin size-4 mr-1" />
        ) : (
          <RotateCcwIcon className="size-4 mr-1" />
        )}
        현 지도에서 검색
      </Button>
    </div>
  );
};

export default ReloadButton;
