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
        className="rounded-3xl border border-gray-300 bg-white px-3 py-0 text-sm font-bold text-primary shadow-md"
        onClick={onClick}
      >
        {isPending ? (
          <LoaderCircleIcon className="mr-1 size-4 animate-spin" />
        ) : (
          <RotateCcwIcon className="mr-1 size-4" />
        )}
        현 지도에서 검색
      </Button>
    </div>
  );
};

export default ReloadButton;
